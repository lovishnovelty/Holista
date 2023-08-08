import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAcessToken = async () => {
  try {
    const token = await AsyncStorage.getItem('access_token');
    return token;
  } catch (err) {
    return '';
  }
};

export const getRefreshToken = async () => {
  try {
    const token = await AsyncStorage.getItem('refresh_token');
    return token;
  } catch (err) {
    throw new Error(err);
  }
};

export const setToken = async (access_token: string, refresh_token: string) => {
  try {
    await AsyncStorage.setItem('access_token', access_token);
    await AsyncStorage.setItem('refresh_token', refresh_token);
  } catch (err) {
    console.log('the error while setting token is ', err);
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('access_token');
    await AsyncStorage.removeItem('refresh_token');
  } catch (err) {
    console.log('the error while setting token is ', err);
  }
};
