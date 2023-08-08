import {useState} from 'react';

export const useAsyncState = (initialState: any) => {
  const [state, setState] = useState(initialState);
  const setter = (value: any) => {
    return new Promise((resolve) => {
      setState(value);
      resolve(value);
    });
  };
  return [state, setter];
};
