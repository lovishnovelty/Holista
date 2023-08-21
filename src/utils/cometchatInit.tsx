import {CometChat} from '@cometchat-pro/react-native-chat';
import moment from 'moment';
import keys from '../../keys';
import {getLocalData} from './medicaid-utils';

export const CometchatInit = () => {
  CometChatConnectListener();
  var connectionStatus = CometChat.getConnectionStatus();
  if (connectionStatus === 'disconnected') {
    const appSetting = new CometChat.AppSettingsBuilder()
      .subscribePresenceForAllUsers()
      .setRegion(keys.REGION)
      .build();
    CometChat.init(keys.APP_ID, appSetting)
      .then(() => {
        console.log('Initialization completed successfully.....');
        CometChatLogin();
      })
      .catch(error => {
        console.log('Initialization failed with error:', error);
      });
  }
  return;
};

export const CometChatLogin = () => {
  CometChat.getLoggedinUser()
    .then(async user => {
      if (!user) {
        const loggedInUser: any = await getLocalData('user');
        const loginUser: any = JSON.parse(loggedInUser);
        if (loginUser && loginUser.data) {
          CometChat.login(loginUser.data.id, keys.AUTH_KEY).then(
            async User => {
              console.log('Login Successful:', {User});
            },
            async error => {
              console.log('Cometchat login error', error);
            },
          );
        }
      }
    })
    .catch(e => console.log('Error while getting logged In', e));
};

export const CometChatConnectListener = () => {
  CometChat.addConnectionListener(
    'MEDICAID_CONNECTION_LISTENER',
    new CometChat.ConnectionListener({
      onConnected: async () => {
        console.log('ConnectionListener => On Connected');
      },
      inConnecting: () => {
        console.log('ConnectionListener => In connecting');
      },
      onDisconnected: async () => {
        console.log('ConnectionListener => On Disconnected');
      },
    }),
  );
};

export const CometChatLogout = () => {
  CometChat.logout().then(
    () => {},
    //Logout completed successfully
    error => {
      //Logout failed with exception
      console.log('Logout failed with exception:', {error});
    },
  );
};

export const getChatTime = (chatDate: any, prevDate?: any) => {
  if (!prevDate) {
    return moment(chatDate * 1000).format('MMM Do, YYYY');
  } else {
    if (
      moment(moment(chatDate * 1000).format('l')).diff(
        moment(moment(prevDate * 1000).format('l')),
        'days',
      ) > 0
    ) {
      return moment(chatDate * 1000).format('MMM Do, YYYY');
    } else {
      return '';
    }
  }
};
