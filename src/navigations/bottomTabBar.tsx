import React, {useContext, useEffect, useState} from 'react';
import {Platform, TouchableHighlight, View, Linking, Alert} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {checkVersion} from 'react-native-check-version';
import VersionCheck from 'react-native-version-check';
import * as screen from '../screens';
import {
  CometChatLogin,
  getChatDate,
  getLocalData,
  normalize,
  getCurrentRouteName,
  storeLocalData,
  removeLocalData,
  checkMessage,
  navigate,
} from '../utils';
import IconComponent from './iconComponent';
import {
  requestAudioPermission,
  requestCameraPermission,
} from '../utils/permissions';
import {conversation, listenForCall} from '../services/chat-service';
import {CometChat} from '@cometchat-pro/react-native-chat';
import {CallScreen} from '../components';
import {CallContext} from '../context';
import {
  createChanel,
  setLocalNotification,
} from '../services/LocalPushController';
import {color, commonStyle, app_theme} from '../assets';
import House from '../assets/images/svg/house';
import {Home} from '../screens';
import {loginSchema} from '../utils/validation';

const Tab = createBottomTabNavigator();

function BottomTabNavigator(props: any) {
  const [enabledPermission, setPermissionStatus] = useState<any>(null);

  const {
    setSessionId,
    setCall,
    setCallType,
    setCallAccepted,
    endCall,
    setActiveChat,
    setChatList,
    setUserList,
    setChatDeliveryRead,
    startSound,
    state,
  } = useContext(CallContext);
  const {conversationList, getList} = conversation();

  useEffect(() => {
    async function checkPermission() {
      isPermissionEnabled();
    }
    if (Platform.OS === 'android') {
      checkPermission();
    }
  }, [enabledPermission]);

  useEffect(() => {
    if (state?.activeChat?.length)
      storeLocalData('activeChat', state.activeChat[0].conversationId);
    else removeLocalData('activeChat');
  }, [state?.activeChat]);

  useEffect(() => {
    CometChatLogin();
    callListener();
    createChanel();
    initMessageListener();
    initUserListener();
    getList();
    storeLocalData('messageList', JSON.stringify([]));
  }, []);

  useEffect(() => {
    let messageList: any = {list: []};
    const updateMessageList = async () => {
      setUserList(conversationList.map((x: any) => x.conversationWith));
      const data: any = await getLocalData('messageList');
      messageList.list = JSON.parse(data);
      if (state?.chatList?.data) {
        checkMessage(messageList.list, {
          uid: state.chatList?.sender.uid,
          text: state.chatList?.data.text,
        });
      } else {
        conversationList.map((item: any) =>
          checkMessage(messageList.list, {
            uid: item.conversationWith.uid,
            text: item.lastMessage.data.text,
          }),
        );
      }
      storeLocalData('messageList', JSON.stringify(messageList.list));
    };
    updateMessageList();
  }, [conversationList]);

  const initUserListener = () => {
    CometChat.addUserListener(
      'MEDICAID_USER_LISTENER',
      new CometChat.UserListener({
        onUserOnline: (onlineUser: CometChat.User) => {
          /* when someuser/friend comes online, user will be received here */
          setUserList(onlineUser);
        },
        onUserOffline: (offlineUser: CometChat.User) => {
          /* when someuser/friend went offline, user will be received here */
          setUserList(offlineUser);
        },
      }),
    );
  };

  const initMessageListener = async () => {
    const user: any = await getLocalData('user');
    const userId = JSON.parse(user).data.id;
    CometChat.addMessageListener(
      userId,
      new CometChat.MessageListener({
        onTextMessageReceived: async (textMessage: CometChat.TextMessage) => {
          chatHandler(textMessage, userId);
        },
        onMediaMessageReceived: (mediaMessage: CometChat.MediaMessage) => {
          chatHandler(mediaMessage, userId);
        },
        onMessagesDelivered: (messageReceipt: CometChat.MessageReceipt) => {
          setChatDeliveryRead(messageReceipt);
        },
        onMessagesRead: (messageReceipt: CometChat.MessageReceipt) => {
          setChatDeliveryRead(messageReceipt);
        },
      }),
    );
  };

  const chatHandler = async (
    chat: CometChat.TextMessage | CometChat.MediaMessage,
    userId: any,
  ) => {
    let messageList: any = {list: []};
    if (chat.getReceiverId() == userId) {
      setUserList(chat.getSender());
      const activeChat = await getLocalData('activeChat');
      const data = await getLocalData('messageList');
      messageList.list = JSON.parse(data);
      const message = {
        uid: chat.getSender().getUid(),
        text: chat.getType() === 'text' ? chat.getText() : '',
      };
      const isRepeat = await checkMessage(messageList.list, message, false);

      if (
        getCurrentRouteName().toLowerCase() !== 'messages' &&
        (getCurrentRouteName() === 'message'
          ? activeChat !== chat.getConversationId()
          : true) &&
        !isRepeat
      ) {
        setLocalNotification({
          message:
            chat.getType() === 'text'
              ? chat.getText()
              : `${chat.getSender().getName()} has sent you a file`,
          title: `${chat.getSender().getName()}`,
          subText: `${getChatDate(chat.getSentAt(), 'hh:mm')}`,
          userInfo: chat.getSender(),
        });
      }
      setChatList(chat);
      setActiveChat(chat);
    }
  };

  const isPermissionEnabled = async () => {
    const cameraPermission = await requestCameraPermission();
    const audioPermission = await requestAudioPermission();
    cameraPermission
      ? audioPermission
        ? setPermissionStatus(true)
        : setPermissionStatus(false)
      : setPermissionStatus(false);
  };

  const callListener = async () => {
    const user: any = await getLocalData('user');
    const userId = JSON.parse(user).data.id;
    listenForCall(
      `${userId}${new Date().getTime()}`,
      (incomingCall: CometChat.Call) => {
        setCall(incomingCall);
        setSessionId(incomingCall.getSessionId());
        setCallType('incoming');
        setActiveChat(incomingCall);
        setChatList(incomingCall);
        if (!state.callRingInterval) startSound();
      },
      cancelledCall => {
        setActiveChat(cancelledCall);
        setChatList(cancelledCall);
        endCall();
      },
      acceptCall => {
        setCallAccepted(true);
      },
      rejectCall => {
        setActiveChat(rejectCall);
        setChatList(rejectCall);
        endCall();
      },
    );
  };

  const getTabIcon = (route: string, focused: boolean) => {
    switch (route) {
      case 'Milestone':
        return <IconComponent icon="image-filter-hdr" focused={focused} />;
      case 'Home':
        return <IconComponent icon="home" focused={focused} />;
      case 'ID Card':
        return <IconComponent icon="smart-card" focused={focused} />;
      case 'Information':
        return <IconComponent icon="hand-heart" focused={focused} />;
      case 'Communication':
        return <IconComponent icon="cellphone-iphone" focused={focused} />;
    }
  };

  const goToStore = async () => {
    const url = await VersionCheck.getStoreUrl();
    Linking.openURL(url);
  };

  useEffect(() => {
    console.log('bottomtab');

    checkUpdate();
  }, []);

  const checkUpdate = async () => {
    try {
      const version = await checkVersion();
      console.log('version', version);

      if (version.needsUpdate) {
        Alert.alert(
          'New Update Available',
          'New version of app is available',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'UPDATE', onPress: () => goToStore()},
          ],
          {cancelable: false},
        );
      }
    } catch (e) {
      console.log('errror checking version');
    }
  };
  return (
    <>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({route}) => ({
          tabBarIcon: ({focused}) => {
            return (
              <View
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {getTabIcon(route.name, focused)}
              </View>
            );
          },
        })}
        tabBarOptions={{
          showLabel: false,
          keyboardHidesTabBar: true,
          style: {
            justifyContent: 'center',
            alignItems: 'center',
            borderTopColor: 'transparent',
            paddingHorizontal: normalize(10),
            shadowColor: '#1F1F1F14',
            shadowOffset: {width: 0, height: -normalize(3)},
            shadowOpacity: 1,
            ...Platform.select({
              android: {
                marginTop: 2,
                elevation: 2,
                shadowOpacity: 0.5,
                shadowOffset: {width: 0, height: -normalize(5)},
              },
            }),
            // backgroundColor: 'white'
          },
        }}>
        <Tab.Screen name="ID Card" component={screen.IdCard} />
        <Tab.Screen name="Information" component={screen.Information} />
        <Tab.Screen name="Home" component={screen.Home} />
        <Tab.Screen name="Milestone" component={screen.Milestone} />
        <Tab.Screen name="Communication" component={screen.Communication} />
      </Tab.Navigator>
      <TouchableHighlight
        activeOpacity={1}
        underlayColor="white"
        onPress={() => navigate('Home')}
        style={commonStyle.homeContainer}>
        <House
          fill={
            getCurrentRouteName() === 'Home'
              ? app_theme.primary_color
              : color.grey
          }
        />
      </TouchableHighlight>
      <CallScreen />
    </>
  );
}

export default BottomTabNavigator;
