import axios from 'axios';
import {getAcessToken, removeToken} from '../utils';
import {BASE_URI} from './uri';
import {store} from '../redux/store';

export const api = axios.create({
  baseURL: BASE_URI,
});

api.interceptors.request.use(
  async (config) => {
    config.headers['requestsource'] = 'localhost';
    config.headers['content-type'] = 'application/json';
    config.headers['ownerid'] = '3!@/fX7';
    const token = await getAcessToken();
    config.headers['Authorization'] = token;
    return config;
  },
  (err) => {
    return Promise.reject(err);
  },
);

api.interceptors.request.use(async (req) => {
  return req;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 ||
      (error.response?.status === 403 &&
        error.response?.data.errorType === 'JsonWebTokenError') ||
      error?.message.includes('401') ||
      error?.message.includes('403')
    ) {
      removeToken();
      store.dispatch({type: 'SIGN_OUT'});
    }
    return Promise.reject(error);
  },
);
