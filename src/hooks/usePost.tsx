import {useState} from 'react';
import {api} from '../api/api';

const usePost = () => {
  const [data, setData] = useState<any>({
    loading: false,
    result: null,
    error: null,
  });

  const doRequest = async (
    path: string,
    body: any,
    onSuccess?: (data: {error: string; success: boolean}) => any,
  ) => {
    return new Promise(async (resolve, reject) => {
      try {
        setData({loading: true});
        const result = await api.post(path, body);
        setData({loading: false, result: result.data.data, error: null});
        resolve(result.data.data);
      } catch (err) {
        const error = err?.response?.data?.message || '';
        onSuccess!({error, success: false});
        setData({loading: false, result: null, error});
        reject(err?.response?.data?.message || '');
      }
    });
  };
  return {
    loading: data.loading,
    result: data.result,
    error: data.error,
    doRequest,
  };
};

export {usePost};
