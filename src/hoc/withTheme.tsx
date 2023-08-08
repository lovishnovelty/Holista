// import React from 'react';
import React from 'react';
import {useDarkMode} from 'react-native-dynamic';
import {ligthTheme, darkTheme} from '../assets';

//lightTheme = 0 ,darkTheme=1
const withTheme = (Component: any) => (props: any) => {
  const isDarkMode = useDarkMode();
  return <Component {...props} theme={isDarkMode ? darkTheme : ligthTheme} />;
};

export default withTheme;
