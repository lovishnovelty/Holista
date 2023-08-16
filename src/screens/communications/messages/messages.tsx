import React, {useEffect, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from 'react-native';
import withTheme from '../../../hoc/withTheme';
import {app_theme, color, communicationStyle as cs} from '../../../assets';
import {
  capitalizeFirstLetter,
  getChatDate,
  navigate,
  normalize,
} from '../../../utils';
import {conversation} from '../../../services/chat-service';
import {CallContext} from '../../../context';
import {Icon, NoData} from '../../../common/ui';
// import {useFocusEffect} from '@react-navigation/native';

const MessagesScreen = () => {
  const {loading, conversationList, getList} = conversation();
  const {setChatList, state} = useContext(CallContext);
  // const [count, setCount] = useState(0);

  // useFocusEffect(
  //   useCallback(() => {
  //     if (!state.chatList?.length) {
  //       console.log('&&&');
  //       //control inifinite call (getList())
  //       getList();
  //       // setCount(count + 1);
  //     }
  //   }, [state.chatList.length]),
  // );

  useEffect(() => {
    if (!state.chatList?.length) {
      getList();
    }
  }, [state.chatList.length]);

  useEffect(() => {
    setChatList(conversationList);
  }, [conversationList]);

  const openChat = (user: any) => {
    navigate('message', {uid: user.uid, name: user.name});
  };

  return (
    <View style={cs.main}>
      {loading && (
        <>
          <View style={cs.body}>
            <ActivityIndicator
              style={{marginLeft: normalize(10)}}
              size="large"
              color={app_theme.primary_color}
            />
          </View>
        </>
      )}
      {!loading && state.chatList?.length > 0 && (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={() => {
                getList();
              }}
            />
          }>
          {state.chatList.map((x: any, i: number) => {
            return (
              <TouchableOpacity
                style={cs.messageWrapper}
                key={i}
                onPress={() => openChat(x.conversationWith)}>
                <View style={cs.messageImageWrapper}>
                  <Image
                    source={require('../../../assets/images/defaultProfilePic.png')}
                    style={cs.messageImage}
                  />
                </View>
                <View style={{flex: 1}}>
                  <View style={cs.messageTextWrapper}>
                    <Text style={cs.textBold}>
                      {x.conversationWith.name}{' '}
                      <Icon
                        name="circle"
                        color={
                          state?.userList?.find(
                            (user: any) =>
                              +user.uid === +x.conversationWith.uid,
                          )?.status === 'online'
                            ? color.online
                            : color.offline
                        }
                        size={10}
                      />
                    </Text>
                    <Text style={cs.messageText}>
                      {getChatDate(x?.lastMessage?.sentAt)}
                    </Text>
                  </View>
                  <Text style={[cs.messageText, cs.textBold]}>
                    {x.lastMessage.type !== 'text'
                      ? x.lastMessage.type === 'file'
                        ? x.lastMessage.data.attachments[0].name
                        : `${capitalizeFirstLetter(
                            x.lastMessage.type,
                          )} call was ${x.lastMessage.action}`
                      : x.lastMessage?.data?.text?.trim()}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}
      {!loading && state.chatList?.length === 0 && (
        <NoData title="Messages" icon="android-messages" />
      )}
    </View>
  );
};

const Messages = withTheme(MessagesScreen);
export {Messages};
