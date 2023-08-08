import {UI_CHANGE_THEME} from './types';

enum theme {
  light,
  dark,
}
const setTheme = (value: theme) => {
  return {
    type: UI_CHANGE_THEME,
    payload: value,
  };
};

export {setTheme};
