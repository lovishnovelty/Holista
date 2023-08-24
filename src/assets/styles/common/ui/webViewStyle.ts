import {StyleSheet} from 'react-native';
import {Dimensions, StatusBar, Platform} from 'react-native';

export const SizeConfig = {
  screenHeight: Dimensions.get('window').height,
  screenWidth: Dimensions.get('window').width,
  statusBarHeight:
    Platform.OS === 'ios'
      ? 20
      : StatusBar.currentHeight
      ? StatusBar.currentHeight
      : 21,
};

export const customWebViewStyles = StyleSheet.create({
  loader: {
    position: 'absolute',
    top: SizeConfig.screenHeight * 0.18,
    right: 0,
    left: 0,
  },
});
