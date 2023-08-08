import ReactNativeBiometrics from 'react-native-biometrics';
import {displayName} from '../../app.json';

export const isBiometricAvailable = () => {
  return new Promise((resolve) => {
    ReactNativeBiometrics.isSensorAvailable().then((resultObject) => {
      const {available, biometryType} = resultObject;
      if (available && biometryType === ReactNativeBiometrics.TouchID) {
        resolve(biometryType);
      } else if (available && biometryType === ReactNativeBiometrics.FaceID) {
        resolve(biometryType);
      } else if (
        available &&
        biometryType === ReactNativeBiometrics.Biometrics
      ) {
        resolve(biometryType);
      } else {
        resolve(false);
      }
    });
  });
};

export const biometricPrompt = () => {
  return new Promise((resolve, reject) => {
    try {
      ReactNativeBiometrics.createSignature({
        promptMessage: `${displayName} Biometric Login`,
        payload: 'Medicaid',
      })
        .then((resultObject) => {
          const {success} = resultObject;
          if (success) {
            resolve(true);
          } else {
            reject(false);
          }
        })
        .catch((error) => {
          reject(false);
        });
    } catch (e) {}
  });
};

export const isKeyExist = () => {
  return new Promise((resolve, reject) => {
    try {
      ReactNativeBiometrics.biometricKeysExist().then((resultObject) => {
        const {keysExist} = resultObject;
        if (keysExist) {
          resolve(keysExist);
        } else {
          resolve(false);
        }
      });
    } catch (e) {
      reject('error generating keys');
    }
  });
};

export const createSecureKeys = () => {
  return new Promise((resolve, reject) => {
    try {
      ReactNativeBiometrics.createKeys().then((resultObject) => {
        const {publicKey} = resultObject;
        resolve(true);
      });
    } catch (e) {}
  });
};

export const deleteKeys = () => {
  return new Promise((resolve, reject) => {
    try {
      ReactNativeBiometrics.deleteKeys()
        .then((resultObject) => {
          const {keysDeleted} = resultObject;
          if (keysDeleted) {
            resolve(keysDeleted);
          } else {
            reject(false);
          }
        })
        .catch((error) => {
          reject(false);
        });
    } catch (e) {}
  });
};
