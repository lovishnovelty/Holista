import {CometChat} from '@cometchat-pro/react-native-chat';
import Sound from 'react-native-sound';
import createDataContext from '../createDataContext';

const incomingSound = new Sound(require('../../assets/sound/messenger.mp3'));
const outgoingSound = new Sound(
  require('../../assets/sound/outgoing_ringtone.mp3'),
);

const authReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'CALL_TYPE':
      return {...state, callType: action.payload};
    case 'CALL':
      return {...state, call: action.payload};
    case 'CALL_SESSION_ID':
      return {...state, sessionId: action.payload};
    case 'IS_AUDIO':
      return {...state, isAudio: action.payload};
    case 'CALL_ACCEPTED':
      clearInterval(state.callRingInterval);
      incomingSound.stop();
      outgoingSound.stop();
      return {...state, callAccepted: action.payload, callRingInterval: null};
    case 'ACTIVE_CHAT':
      return {...state, activeChat: getActiveChat(action.payload, state)};
    case 'CHAT_LIST':
      return {...state, chatList: getChatList(action.payload, state)};
    case 'USER_LIST':
      return {...state, userList: getUserList(action.payload, state)};
    case 'CHAT_DELIVERY_READ':
      return {...state, activeChat: getChatDeliveryRead(action.payload, state)};
    case 'CALL_RING_INTERVAL':
      return {...state, callRingInterval: action.payload};
    case 'RESET_STATE':
      clearInterval(state.callRingInterval);
      incomingSound.stop();
      outgoingSound.stop();
      return {
        ...state,
        sessionId: null,
        call: null,
        callType: null,
        isAudio: true,
        callAccepted: false,
        callRingInterval: null,
      };
    default:
      return state;
  }
};

const setSessionId = (dispatch: any) => {
  return (sessionId: string) => {
    dispatch({type: 'CALL_SESSION_ID', payload: sessionId});
  };
};

const setCall = (dispatch: any) => {
  return (call: CometChat.Call) => {
    dispatch({type: 'CALL', payload: call});
  };
};

const setCallType = (dispatch: any) => {
  return (callType: string) => {
    dispatch({type: 'CALL_TYPE', payload: callType});
  };
};

const setIsAudio = (dispatch: any) => {
  return (isAudio: boolean) => {
    dispatch({type: 'IS_AUDIO', payload: isAudio});
  };
};

const setCallAccepted = (dispatch: any) => {
  return (callAccepted: boolean) => {
    dispatch({type: 'CALL_ACCEPTED', payload: callAccepted});
  };
};

const endCall = (dispatch: any) => {
  return () => {
    dispatch({type: 'RESET_STATE'});
  };
};

const setActiveChat = (dispatch: any) => {
  return (activeChat: any) => {
    dispatch({type: 'ACTIVE_CHAT', payload: activeChat});
  };
};

const setChatList = (dispatch: any) => {
  return (chatList: []) => {
    dispatch({type: 'CHAT_LIST', payload: chatList});
  };
};

const setUserList = (dispatch: any) => {
  return (chatList: []) => {
    dispatch({type: 'USER_LIST', payload: chatList});
  };
};

const setChatDeliveryRead = (dispatch: any) => {
  return (messageReceipt: []) => {
    dispatch({type: 'CHAT_DELIVERY_READ', payload: messageReceipt});
  };
};

const startSound = (dispatch: any) => {
  return (type: 'incoming' | 'outgoing' = 'incoming') => {
    const sound = type === 'incoming' ? incomingSound : outgoingSound;

    dispatch({
      type: 'CALL_RING_INTERVAL',
      payload: setInterval(function () {
        sound.play();
      }, 1000),
    });
  };
};

const getChatList = (chatList: any, state: any) => {
  if (!Array.isArray(chatList)) {
    if (state.chatList?.length) {
      if (
        chatList?.sender &&
        state.chatList.find(
          (x: any) => x.conversationWith.uid === chatList.sender.uid,
        )
      ) {
        chatList = state.chatList.map((x: any) => {
          if (x.conversationWith.uid === chatList.sender.uid) {
            x.lastMessage = chatList;
          }
          return x;
        });
      } else {
        // const conversation = await getConversationByMessage(chatList);
        // chatList = [...state.chatList, conversation];
      }
    } else {
      // chatList = [chatList];
    }
  }
  return chatList;
};

const getActiveChat = (textMessage: any, state: any) => {
  if (!Array.isArray(textMessage)) {
    // is a single textMessage
    if (
      state.activeChat?.length && // activeChat already exists
      state.activeChat?.find(
        (x: any) => x.conversationId === textMessage.conversationId, // activeChat and textMessage belongs to same conversation
      ) &&
      !state.activeChat?.find((x: any) => x.id === textMessage.id) // the textMessage doesn't exist in the chat
    ) {
      textMessage = [...state.activeChat, textMessage];
    } else {
      textMessage = state.activeChat;
    }
  }
  return textMessage;
};

const getUserList = (user: any, state: any) => {
  if (!Array.isArray(user)) {
    if (state.userList?.length) {
      const oldUser = state.userList.find((x: any) => +x.uid === +user.uid);
      if (oldUser) {
        user = state.userList.map((x: any) => {
          if (+x.uid === +user.uid) {
            x = user;
          }
          return x;
        });
      } else {
        user = [...state.userList, user];
      }
    } else {
      user = [user];
    }
  }
  return user;
};

const getChatDeliveryRead = (
  messageReceipt: CometChat.MessageReceipt,
  state: any,
) => {
  const messageId = messageReceipt.getMessageId();
  const receiptType = messageReceipt.getReceiptType();
  const chat = state.activeChat.map((x: any) => {
    if (x.id === messageId) {
      switch (receiptType) {
        case messageReceipt.RECEIPT_TYPE.DELIVERY_RECEIPT:
          x.deliveredAt = messageReceipt.getDeliveredAt();
          break;
        case messageReceipt.RECEIPT_TYPE.READ_RECEIPT:
          x.readAt = messageReceipt.getReadAt();
          break;
      }
    }
    return x;
  });
  return chat;
};

const {Context, Provider} = createDataContext(
  authReducer,
  {
    setSessionId,
    setCall,
    setCallType,
    setIsAudio,
    setCallAccepted,
    endCall,
    setActiveChat,
    setChatList,
    setUserList,
    setChatDeliveryRead,
    startSound,
  },
  {
    sessionId: null,
    call: null,
    callType: null,
    isAudio: true,
    callAccepted: false,
    activeChat: [],
    chatList: [],
    userList: [],
    callRingInterval: null,
  },
  {},
);

export {Context as CallContext, Provider as CallProvider};
