import {api} from '../api/api';

const postRequest = async (path: string, body: any, headers?: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await api.post(path, body, {headers});
      resolve(response.data);
    } catch (err) {
      reject(err);
    }
  });
};
const getRequest = async (path: string, headers?: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await api.get(path, {headers});
      resolve(response.data);
    } catch (err) {
      reject(err);
    }
  });
};

const patchRequest = async (path: string, headers?: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await api.patch(path, {headers});
      resolve(response.data);
    } catch (err) {
      reject(err);
    }
  });
};

const putRequest = async (path: string, body: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await api.put(path, body);
      resolve(response.data);
    } catch (err) {
      reject(err);
    }
  });
};

export {postRequest, getRequest, patchRequest, putRequest};
