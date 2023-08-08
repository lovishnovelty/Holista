import {DarkTheme, DefaultTheme} from '@react-navigation/native';
import {useDarkMode} from 'react-native-dynamic';
import {Platform} from 'react-native';
import {normalize} from '../utils';

const color = {
  online: '#7BD64D',
  offline: '#C9C9C9',
  fadeRed: '#F8E7E7',
  borderRed: '#D43030',
  borderBottom: '#EAEAEA',
  buttonBackground: '#67ACD5',
  fade: '#EBEBEB',
  pressableText: '#666666',
  textSmall: '#777777',
  textBig: '#222222',
  red: '#ff0000',
  black: '#000000',
  lightBlack: '#777777',
  fadeBlack: '#F7F7F7',
  // darkLight: '#666666',
  darkBlack: '#333333',
  // greyDarkest: '#242424',
  greyDarker: '#616161',
  greyDark: '#757575',
  // greyer: '#707070',
  grey: '#9e9e9e',
  accentGreen: '#38D430',
  greyLight: '#F5F5F5',
  backgroundGrey: '#F6F9FC',
  borderGrey: '#DBE7F4',
  cream: '#f7f4e1',
  greyLightest: '#EDEDED',
  white: '#fff',
  // fadedWhite: '#FDFDFD',
  border: '#E2E3E6',
  green: '#0c872d',
  // darkGreen: '#3394A2',
  // lightGreen: '#8BE394',
  fadeGreen: '#E8F8E7',
  // darkBlue: '#0e4f6e',
  // primaryGreen: '#3C9584',
  // secondaryBlue: '#0677A7',
  placeholder: '#9B9B9B',
  navheader: '#FAFAFA',
  navShadow: '#1F1F1F14',
  arrow: '#5A5A5A',
  textArea: '#c7c7c7',
  transparent: 'rgba(52, 52, 52, 0.8)',
};

const app_theme = {
  background_color: '#F6F9FC',
  primary_color: '#3C9584',
  shadow: '#0000001A',
  primary_text_color: '#3D3D3D',
  secondary_text_color: '#707070',
  card_bg: '#F8F8F8',
  warning: '#ff1900',
};

const theme = {
  size: {
    xxxs: 5,
    xxs: 10,
    xs: 12,
    sm: 14,
    base: 16,
    md: 18,
    lg: 20,
    xl: 22,
    xxl: 24,
    xll: 50,
  },
  spacing: {
    normal: 1,
    wide: 2,
    tight: 0.5,
    wider: 6,
  },
};

const font = {
  RobotoRegular: Platform.OS === 'ios' ? 'Roboto-Regular' : 'roboto.regular',
  RobotoLight: Platform.OS === 'ios' ? 'Roboto-Light' : 'roboto.light',
  RobotoBold: Platform.OS === 'ios' ? 'Roboto-Bold' : 'roboto.bold',
  HeeboBold: 'Heebo-Bold',
};

export const ligthTheme = {
  ...DefaultTheme,
};

export const darkTheme = {
  ...DarkTheme,
};

export const themeProvider = () => {
  return false ? darkTheme : ligthTheme;
};

export const isDarkMode = () => {
  return useDarkMode();
};

export {color, app_theme, theme, font};
