/* eslint-disable react-hooks/exhaustive-deps */
import React, {Fragment, useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {CometChat} from '@cometchat-pro/react-native-chat';
import {useRoute} from '@react-navigation/native';

import withTheme from '../../../hoc/withTheme';
import {
  Button,
  Icon,
  Input,
  NavHeader,
  Wrapper as SafeAreaView,
} from '../../../common/ui';
import {color, communicationStyle as cs} from '../../../assets';
import {
  capitalizeFirstLetter,
  getChatDate,
  getChatTime,
  getFileTypeIcon,
  normalize,
  secondsToTime,
  snackBarBottom,
} from '../../../utils';
import {
  getMessagesByUid,
  initiateCall,
  sendMessage,
} from '../../../services/chat-service';
import {CallContext} from '../../../context';
import {useSelector} from 'react-redux';
import {setDocIndex} from '../../../redux/data/data-action';

const MessageScreen = () => {
  const [message, setMessage] = useState<string>();
  const [scrollView, setScrollView] = useState<any>([]);
  const [receiverID, setReceiverId] = useState<any>('');
  const messageParams = useRoute<any>().params ?? {};

  const {
    setSessionId,
    setCall,
    setCallType,
    setIsAudio,
    setChatList,
    setActiveChat,
    startSound,
    state,
  } = useContext(CallContext);

  const receiverType = CometChat.RECEIVER_TYPE.USER;

  const {messageList, loading, getList} = getMessagesByUid();
  const send = sendMessage();
  const pdfState = useSelector((state: any) => state.data.pdf);
  const docLoadingIndex = useSelector(
    (state: any) => state.data.docLoadingIndex,
  );

  useEffect(() => {
    if (messageParams.uid) {
      setActiveChat([]);
      setReceiverId(messageParams.uid);
      getList(messageParams.uid);
    }
  }, [messageParams]);

  const startCall = (isAudio?: boolean) => {
    const user = state.userList.find((x: any) => +x.uid === +receiverID);
    if (user?.status === 'online') {
      setIsAudio(isAudio ? true : false);
      initiateCall(receiverID, isAudio ? 'AUDIO' : 'VIDEO').then(
        (outGoingCall: CometChat.Call) => {
          console.log(outGoingCall, 'outGoingCall');
          setSessionId(outGoingCall.getSessionId());
          setCallType('outgoing');
          setCall(outGoingCall);
          setActiveChat(outGoingCall);
          if (!state.callRingInterval) startSound('outgoing');
        },
        error => {
          console.log('Call initialization failed with exception:', error);
        },
      );
    } else
      snackBarBottom(`${user?.name ?? 'User'} is not available`, 'error', true);
  };

  useEffect(() => {
    if (send.sentMessage) {
      setActiveChat(send.sentMessage);
      setChatList(send.sentMessage);
    }
  }, [send.sentMessage]);

  useEffect(() => {
    if (messageList.length) {
      setActiveChat(messageList.filter((x: any) => x.action !== 'ongoing'));
    }
  }, [messageList]);

  useEffect(() => {
    readMessage();
  }, [state.activeChat]);

  const readMessage = async () => {
    state.activeChat.map(async (x: any) => {
      if (!x?.readAt && x?.receiver?.uid !== receiverID) {
        await CometChat.markAsRead(x?.id, x?.sender?.uid, receiverType);
      }
    });
  };

  const renderItem = (message: any, index: number) => {
    return (
      <Fragment key={index}>
        {getChatTime(
          message?.sentAt,
          index === 0 ? null : state.activeChat[index - 1]?.sentAt,
        ) ? (
          <View style={cs.chatDateWrapper}>
            <Text>
              {getChatTime(
                message?.sentAt,
                index === 0 ? null : state.activeChat[index - 1]?.sentAt,
              )}
            </Text>
          </View>
        ) : (
          <></>
        )}
        <View
          style={[
            cs.chatWrapper,
            receiverID !== message?.sender?.uid
              ? {justifyContent: 'flex-end'}
              : {},
            index + 1 === state.activeChat?.length
              ? {marginBottom: normalize(20)}
              : {},
          ]}>
          {receiverID === message?.sender?.uid && (
            <View style={cs.messageImageWrapper}>
              <Image
                source={require('../../../assets/images/defaultProfilePic.png')}
                style={cs.messageImage}
              />
              {/* )} */}
            </View>
          )}
          <View
            style={
              receiverID !== message?.sender?.uid
                ? {paddingRight: normalize(20)}
                : {
                    marginTop:
                      Platform.OS === 'ios' ? normalize(10) : normalize(6),
                  }
            }>
            <View
              style={[
                cs.chatBox,
                receiverID === message?.sender?.uid
                  ? cs.receivedChatBox
                  : cs.sentChatBox,
              ]}>
              <Text
                style={[
                  cs.chatText,
                  receiverID === message?.sender?.uid
                    ? cs.receivedChatText
                    : cs.sentChatText,
                ]}>
                {message.type === 'text' && message?.data?.text?.trim()}
                {message.type === 'text' &&
                  message.data.attachments &&
                  message.data.attachments.length &&
                  '\n'}
                {(message.type === 'audio' || message.type === 'video') && (
                  <>
                    {`${capitalizeFirstLetter(message.type)} call ${
                      message.action
                    }`}
                    {message.action?.toLowerCase() === 'ended' && (
                      <Text style={{fontWeight: 'bold'}}>
                        {` ${secondsToTime(
                          message.data?.entities?.on?.entity?.duration,
                        )}`}
                      </Text>
                    )}
                  </>
                )}
                {(message.type === 'file' ||
                  (message.type === 'text' &&
                    message.data.attachments &&
                    message.data.attachments.length)) && (
                  <TouchableOpacity
                    onPress={() => {
                      setDocIndex(index);
                      pdfState.setUri(message?.data?.attachments[0]?.url);
                    }}
                    style={cs.fileChatWrapper}>
                    {docLoadingIndex === index ? (
                      <ActivityIndicator
                        color={
                          receiverID === message?.sender?.uid
                            ? 'white'
                            : 'black'
                        }
                        size={normalize(25)}
                      />
                    ) : (
                      <Icon
                        name={getFileTypeIcon(
                          message.data.attachments[0].extension,
                        )}
                        color={
                          receiverID === message?.sender?.uid
                            ? 'white'
                            : 'black'
                        }
                        size={20}
                      />
                    )}
                    <Text
                      style={[
                        cs.fileText,
                        receiverID === message?.sender?.uid
                          ? cs.receivedFileText
                          : cs.sentFileText,
                      ]}>
                      {message.data?.attachments[0]?.name}
                    </Text>
                  </TouchableOpacity>
                )}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={[
                  cs.chatTimeText,
                  receiverID !== message?.sender?.uid
                    ? cs.sentChatTimeText
                    : {},
                ]}>
                {getChatDate(message?.sentAt, 'hh:mm a')}
              </Text>
              {receiverID !== message?.sender?.uid && (
                <Icon
                  name={
                    message?.deliveredAt || message?.readAt
                      ? 'check-all'
                      : 'check'
                  }
                  size={15}
                  color={message?.readAt ? color.green : color.grey}
                />
              )}
            </View>
          </View>
        </View>
      </Fragment>
    );
  };

  const sendMessageHandler = () => {
    if (message) {
      const textMessage = new CometChat.TextMessage(
        receiverID,
        message,
        receiverType,
      );
      send.sendMessage(textMessage);
      setMessage('');
    }
  };

  const renderChatFooter = () => {
    return (
      <>
        {send.loading && <ActivityIndicator />}
        <View style={cs.chatFooterWrapper}>
          <View style={cs.typeMessageWrapper}>
            <Input
              value={message}
              placeholder="Type Message"
              onChangeText={setMessage}
            />
          </View>
          <View style={cs.footerActionWrapper}>
            <Button title="Send" onPress={sendMessageHandler} />
          </View>
        </View>
      </>
    );
  };

  return (
    <SafeAreaView style={{marginHorizontal: 0}}>
      <NavHeader
        title={messageParams?.name ?? 'Unknown'}
        rightIcon="video"
        rightIconSize={30}
        rightIconColor="#3C9584"
        rightIconPress={() => startCall(false)}
        secondRightIcon="phone"
        secondRightIconSize={30}
        secondRightIconColor="#3C9584"
        secondRightIconPress={() => startCall(true)}
        userStatus={
          state.userList.find((x: any) => +x.uid === +receiverID)?.status ??
          'offline'
        }
      />
      <KeyboardAwareScrollView
        resetScrollToCoords={{x: 0, y: 0}}
        contentContainerStyle={{flex: 1, justifyContent: 'flex-end'}}
        scrollEnabled={false}
        keyboardDismissMode="none"
        extraScrollHeight={normalize(20)}
        keyboardShouldPersistTaps="handled">
        <View style={{flex: 1}}>
          {loading && (
            <ActivityIndicator color="#3C9584" style={{flex: 1}} size="large" />
          )}
          {!loading && state.activeChat?.length ? (
            <ScrollView
              ref={ref => {
                setScrollView(ref);
              }}
              contentContainerStyle={{
                paddingTop: normalize(20),
              }}
              onContentSizeChange={() =>
                scrollView.scrollToEnd({animated: false})
              }>
              {state.activeChat.map((conversation: any, index: number) => {
                return renderItem(conversation, index);
              })}
            </ScrollView>
          ) : (
            <></>
          )}
        </View>
        <View>{renderChatFooter()}</View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const Message = withTheme(MessageScreen);
export {Message};
