import PushNotification from 'react-native-push-notification';

const chanelId = 'cometchat_notification';

export const setLocalNotification = async (notification: {
  message: string;
  subText: string;
  title: string;
  bigText?: string;
  userInfo: any;
}) => {
  PushNotification.localNotification({
    autoCancel: true,
    bigText: notification.message,
    subText: notification.subText,
    title: notification.title,
    message: notification.message,
    vibrate: true,
    vibration: 300,
    playSound: true,
    soundName: 'default',
    channelId: chanelId,
    userInfo: notification.userInfo,
  });
};

export const checkPermission = () => {
  PushNotification.checkPermissions((permission: any) => {
    console.log('Perssmion push noticcation ', permission);
  });
};

export const createChanel = () => {
  PushNotification.channelExists(chanelId, function (exists) {
    if (!exists) {
      PushNotification.createChannel(
        {
          channelId: chanelId, // (required)
          channelName: 'Cometchat chanel', // (required)
          channelDescription: 'For cometchat notification', // (optional) default: undefined.
          playSound: true, // (optional) default: true
          importance: 4, // (optional) default: 4. Int value of the Android notification importance
          vibrate: true,
          soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
        },
        (created) => {
          return created;
        }, // (optional) callback returns whether the channel was created, false means it already existed.
      );
    }
  });
};

export const deleteChannel = () => {
  PushNotification.deleteChannel(chanelId);
};
