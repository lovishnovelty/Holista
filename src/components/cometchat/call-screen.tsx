import {CometChat} from '@cometchat-pro/react-native-chat';
import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Modal from 'react-native-modal';
import {SafeAreaView} from 'react-native-safe-area-context';
import {color, theme} from '../../assets';
import {Icon} from '../../common/ui';
import {CallContext} from '../../context';
import {
  acceptIncomingCall,
  cancelInitiatedCall,
  rejectIncomingCall,
} from '../../services/chat-service';
import {normalize} from '../../utils';

const CallScreen = () => {
  const {
    state,
    endCall,
    setSessionId,
    setCall,
    setCallAccepted,
    setActiveChat,
    setChatList,
    setIsAudio,
  } = useContext(CallContext);

  const [audioMode, setAudioMode] = useState<boolean>(false);
  const [videoMode, setVideoMode] = useState<boolean>(true);
  const [muteAudio, setMuteAudio] = useState<boolean>(false);

  const onEndCall = () => {
    cancelInitiatedCall(state.sessionId).then(
      (call: CometChat.Call) => {
        setActiveChat(call);
        setChatList(call);
        endCall();
      },
      (error: CometChat.ErrorModel) => {
        console.log('Call rejection failed with error:', error);
      },
    );
  };

  const onRejectCall = () => {
    rejectIncomingCall(state.sessionId).then(
      (call: CometChat.Call) => {
        setActiveChat(call);
        setChatList(call);
        endCall();
      },
      (error: CometChat.ErrorModel) => {
        console.log('Call rejection failed with error:', error);
      },
    );
  };

  const onAcceptCall = () => {
    acceptIncomingCall(state.sessionId).then(
      (call: CometChat.Call) => {
        console.log('aceepted', call);
        setIsAudio(call.getType().toLowerCase() === 'audio');
        setSessionId(call.getSessionId());
        setCall(call);
        setCallAccepted(true);
      },
      (error) => {
        console.log('Call acceptance failed with error', error);
      },
    );
  };

  let callListener = new CometChat.OngoingCallListener({
    onUserJoined: (user: CometChat.User) => {
      console.log('User joined call:', user);
    },
    onUserLeft: (user: CometChat.User) => {
      console.log('User left call:', user);
    },
    onCallEnded: (call: CometChat.Call) => {
      setActiveChat(call);
      setChatList(call);
      endCall();
    },
    onError: (error: CometChat.ErrorModel) => {
      console.log('Call Error: ', error);
    },
  });

  var callSettings = new CometChat.CallSettingsBuilder()
    .setSessionID(state.sessionId)
    .enableDefaultLayout(false)
    .showEndCallButton(false)
    .showSwitchCameraButton(false)
    .showMuteAudioButton(false)
    .showPauseVideoButton(false)
    .setIsAudioOnlyCall(state.isAudio)
    .setCallEventListener(callListener)
    .build();

  return (
    <Modal
      isVisible={state.callType && state.sessionId && state.call ? true : false}
      style={style.modalWrapper}>
      <SafeAreaView style={{flex: 1}}>
        {state.callType && state.sessionId && state.call ? (
          <View style={style.modalContent}>
            {state.callAccepted ? (
              <>
                <CometChat.CallingComponent callsettings={callSettings} />
                <View style={style.callButtonWrapper}>
                  {!state.isAudio && (
                    <TouchableOpacity
                      style={style.callButton}
                      onPress={() => {
                        let callController = CometChat.CallController.getInstance();
                        callController.pauseVideo(videoMode);
                        setVideoMode(!videoMode);
                      }}>
                      <Icon
                        name={videoMode ? 'video' : 'video-off'}
                        color={color.white}
                      />
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    style={style.callButton}
                    onPress={() => {
                      let callController = CometChat.CallController.getInstance();
                      callController.muteAudio(!muteAudio);
                      setMuteAudio(!muteAudio);
                    }}>
                    <Icon
                      name={muteAudio ? 'microphone-off' : 'microphone'}
                      color="white"
                    />
                  </TouchableOpacity>
                  {!state.isAudio && (
                    <TouchableOpacity
                      style={style.callButton}
                      onPress={() => {
                        let callController = CometChat.CallController.getInstance();
                        callController.switchCamera();
                      }}>
                      <Icon name="camera-party-mode" color="white" />
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    style={[style.callButton, {backgroundColor: '#BD4E44'}]}
                    onPress={() => {
                      CometChat.endCall(state.sessionId).then(
                        (call) => {
                          endCall();
                          setMuteAudio(false);
                          setAudioMode(false);
                          setActiveChat(call);
                          setChatList(call);
                        },
                        (error) => {
                          console.log('error', error);
                        },
                      );
                    }}>
                    <Icon name="close" color="white" />
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <View style={style.wrapper}>
                <View style={style.iconWrapper}>
                  <Icon name="account" color="#67d590" size={50} />
                </View>
                <Text style={style.callerInfo}>
                  {state.callType === 'incoming'
                    ? `Incoming ${state.call.getType()} call from ${state.call
                        .getCallInitiator()
                        .getName()}`
                    : `Calling ${state.call.getCallReceiver().getName()}`}
                </Text>
                {state.callType !== 'incoming' && (
                  <Text style={style.ringingText}>Ringing...</Text>
                )}
                <View style={style.actionButtonWrapper}>
                  {state.callType === 'incoming' && (
                    <TouchableOpacity
                      onPress={onAcceptCall}
                      style={style.actionButton}>
                      <View style={[style.actionIcon, style.acceptIcon]}>
                        <Icon name="phone" color={color.white} size={20} />
                      </View>
                      <Text style={style.actionLabel}>Accept</Text>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    onPress={
                      state.callType === 'incoming' ? onRejectCall : onEndCall
                    }
                    style={style.actionButton}>
                    <View style={style.actionIcon}>
                      <Icon name="close" color={color.white} size={20} />
                    </View>
                    <Text style={style.actionLabel}>
                      {state.callType === 'incoming' ? 'Decline' : 'Cancel'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        ) : (
          <></>
        )}
      </SafeAreaView>
    </Modal>
  );
};

const style = StyleSheet.create({
  modalWrapper: {
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
    flex: 1,
    zIndex: 99,
  },
  wrapper: {
    backgroundColor: 'black',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapper: {
    borderWidth: 3,
    borderColor: 'white',
    padding: normalize(10),
    borderRadius: normalize(50),
  },
  callerInfo: {
    color: 'white',
    marginVertical: normalize(20),
    fontWeight: 'bold',
    fontSize: normalize(theme.size.base),
  },
  actionButtonWrapper: {
    marginVertical: normalize(25),
    flexDirection: 'row',
  },
  actionButton: {
    marginHorizontal: normalize(20),
    alignItems: 'center',
  },
  actionIcon: {
    backgroundColor: '#BD4E44',
    width: normalize(60),
    height: normalize(60),
    borderRadius: normalize(60),
    alignItems: 'center',
    justifyContent: 'center',
  },
  acceptIcon: {
    backgroundColor: '#67d590',
  },
  actionLabel: {
    color: 'white',
    fontSize: normalize(theme.size.xs),
    fontWeight: 'bold',
    marginVertical: normalize(10),
  },
  ringingText: {
    color: 'white',
  },
  callButtonWrapper: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    justifyContent: 'center',
  },
  callButton: {
    backgroundColor: 'grey',
    width: normalize(50),
    height: normalize(50),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: normalize(50),
    margin: normalize(5),
    marginBottom: normalize(20),
  },
  endButton: {
    backgroundColor: '#BD4E44',
    position: 'absolute',
    bottom: 35,
    right: 10,
    padding: normalize(15),
    borderRadius: normalize(5),
  },
});

export {CallScreen};
