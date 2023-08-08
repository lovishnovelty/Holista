/* eslint-disable react-hooks/rules-of-hooks */
import {CometChat} from '@cometchat-pro/react-native-chat';
import {useState} from 'react';

const sendMessage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [sentMessage, setSentMessage] = useState<any>({});

  const send = (message: CometChat.TextMessage) => {
    setLoading(true);
    try {
      CometChat.sendMessage(message).then(
        (message) => {
          setSentMessage(message);
          setLoading(false);
          // Do something with message
        },
        (error) => {
          console.log('Message sending failed with error:', error);
          // Handle any error
        },
      );
    } catch (error) {
      setLoading(false);
      console.log('Error fetching conversation list.', error);
    }
  };

  return {
    sentMessage: sentMessage,
    loading: loading,
    sendMessage: send,
  };
};

const conversation = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [conversationList, setConversationList] = useState<any>([]);

  const conversationsRequest = new CometChat.ConversationsRequestBuilder()
    .setLimit(50)
    .build();

  const getList = () => {
    try {
      conversationsRequest.fetchNext().then(
        (conversationList) => {
          setConversationList(conversationList);
          setLoading(false);
        },
        (error) => {
          setLoading(false);
          console.log('Conversations list fetching failed with error:', error);
        },
      );
    } catch (error) {
      setLoading(false);
      console.log('Error fetching conversation list.', error);
    }
  };

  return {
    conversationList: conversationList,
    setConversationList: setConversationList,
    loading: loading,
    getList: getList,
  };
};

const getMessagesByUid = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [messageList, setMessageList] = useState<any>([]);

  const getList = (uid: string) => {
    try {
      const messagesRequest = new CometChat.MessagesRequestBuilder()
        .setLimit(100)
        .setTimestamp(new Date().getTime())
        .setUID(uid)
        .build();

      messagesRequest.fetchPrevious().then(
        (messages) => {
          setMessageList(messages);
          setLoading(false);
        },
        (error) => {
          console.log('Message fetching failed with error:', error);
          setLoading(false);
        },
      );
    } catch (error) {
      setLoading(false);
      console.log('Error fetching conversation list.', error);
    }
  };

  return {
    messageList: messageList,
    loading: loading,
    getList: getList,
    setLoading: setLoading,
  };
};

const initiateCall = (
  receiverID: string,
  type: 'VIDEO' | 'AUDIO' | undefined,
) => {
  const call = new CometChat.Call(
    receiverID,
    type === 'VIDEO' ? CometChat.CALL_TYPE.VIDEO : CometChat.CALL_TYPE.AUDIO,
    CometChat.RECEIVER_TYPE.USER,
  );
  return CometChat.initiateCall(call);
};

const listenForCall = (
  listnerId: string,
  incomingCall: (call: any) => void,
  cancelledCall: (call: any) => void,
  acceptedCall: (accept: any) => void,
  rejectedCall: (reject: any) => void,
) => {
  CometChat.addCallListener(
    listnerId,
    new CometChat.CallListener({
      onIncomingCallReceived: incomingCall,
      onOutgoingCallAccepted: acceptedCall,
      onOutgoingCallRejected: rejectedCall,
      onIncomingCallCancelled: cancelledCall,
    }),
  );
};

const cancelInitiatedCall = (sessionId: string) => {
  return CometChat.cancelCall(sessionId);
};

const acceptIncomingCall = (sessionId: string) => {
  return CometChat.acceptCall(sessionId);
};

const rejectIncomingCall = (sessionId: string) => {
  return CometChat.rejectCall(sessionId, CometChat.CALL_STATUS.REJECTED);
};

const getConversationByMessage = (message: CometChat.TextMessage) => {
  CometChat.CometChatHelper.getConversationFromMessage(message).then(
    (conversation) => {
      console.log('Conversation Object', conversation);
      return conversation;
    },
    (error) => {
      console.log('Error while converting message object', error);
    },
  );
};

export {
  sendMessage,
  conversation,
  getMessagesByUid,
  initiateCall,
  listenForCall,
  cancelInitiatedCall,
  acceptIncomingCall,
  rejectIncomingCall,
  getConversationByMessage,
};
