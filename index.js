/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {CometchatInit, navigate} from './src/utils';
import PushNotification from 'react-native-push-notification';
CometchatInit();

PushNotification.configure({
  // (required) Called when a remote or local notification is opened or received
  onNotification: function (notification) {
    if (notification.data?.uid) {
      if (notification.data?.collapse_key) {
        setTimeout(() => {
          navigate('message', {
            uid: notification.data.uid,
            name: notification.data.name,
          });
        }, 1000);
      } else {
        navigate('message', {
          uid: notification.data.uid,
          name: notification.data.name,
        });
      }
    }
  },

  popInitialNotification: true,
  requestPermissions: true,
});

AppRegistry.registerComponent(appName, () => App);
