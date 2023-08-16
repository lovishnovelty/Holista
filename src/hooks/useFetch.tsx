import {useState} from 'react';
import {api} from '../api/api';
import {loginSchema} from '../utils/validation';

const useFetch = () => {
  const [data, setData] = useState<any>({
    loading: true,
    result: null,
    error: null,
  });

  const doRequest = async (path: string) => {
    try {
      setData({loading: true, result: null, error: null});
      const result = await api.get(path);

      setData({loading: false, result: result.data.data, error: null});
      return result.data.data;
    } catch (error) {
      console.log(error, 'errinfo');

      setData({loading: false, result: null, error: error});
    }
  };

  return {
    loading: data.loading,
    result: data.result,
    error: data.error,
    doRequest,
  };
};

export {useFetch};
