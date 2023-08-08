import {store} from '../store';

export const setDocIndex = (index: number) => {
  store.dispatch({
    type: 'SET_DOC_INDEX',
    payload: {
      docLoadingIndex: index,
    },
  });
};
