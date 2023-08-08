import {
  checkMultiple,
  PERMISSIONS,
  requestMultiple,
} from 'react-native-permissions';
import {PermissionsAndroid} from 'react-native';

export const checkPermission = () => {
  return new Promise((resolve, reject) => {
    checkMultiple([
      PERMISSIONS.ANDROID.CAMERA,
      PERMISSIONS.ANDROID.RECORD_AUDIO,
    ]).then((statuses) => {
      if (
        !statuses[PERMISSIONS.ANDROID.CAMERA] &&
        !statuses[PERMISSIONS.ANDROID.RECORD_AUDIO]
      ) {
        reject(false);
      } else {
        resolve(true);
      }
    });
  });
};

export const askPermissions = () => {
  return new Promise((resolve, reject) => {
    requestMultiple([
      PERMISSIONS.ANDROID.CAMERA,
      PERMISSIONS.ANDROID.RECORD_AUDIO,
    ]).then((statuses) => {
      if (
        !statuses[PERMISSIONS.ANDROID.CAMERA] &&
        !statuses[PERMISSIONS.ANDROID.RECORD_AUDIO]
      ) {
        reject(false);
      } else {
        resolve(true);
      }
    });
  });
};

export const requestCameraPermission = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        resolve(true);
      } else {
        console.log('Camera permission denied');
        reject(false);
      }
    } catch (err) {
      console.warn(err);
    }
  });
};

export const requestAudioPermission = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        resolve(true);
      } else {
        console.log('Microphone permission denied');
        reject(false);
      }
    } catch (err) {
      console.warn(err);
    }
  });
};
