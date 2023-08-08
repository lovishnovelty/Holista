import {StyleSheet} from 'react-native';
import {normalize} from '../../../utils/helper';
import {font} from '../../theme';

const confirmationStyle = StyleSheet.create({
  contentContainer: {flexGrow: 1},
  main: {flex: 1, marginTop: normalize(30)},
  text: {fontFamily: font.RobotoLight, fontSize: normalize(20)},
});

export {confirmationStyle};
