import {UI_CHANGE_THEME} from './types';

enum theme {
  light,
  dark,
}

const INITIAL_STATE = {
  theme: theme.light,
};

const uiReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case UI_CHANGE_THEME:
      return {...state, theme: action.payload};
    default:
      return state;
  }
};
export {uiReducer};
