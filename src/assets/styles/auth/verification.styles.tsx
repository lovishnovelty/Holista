import {StyleSheet} from 'react-native';
import {normalize} from '../../../utils';
import {color, theme, app_theme, font} from '../../theme';

const Input_Placeholder_Padding = normalize(10);
const verificationStyle = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: app_theme.primary_color,
    marginHorizontal: normalize(20),
    flexDirection: 'column',
  },
  imageView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputStyle: {
    backgroundColor: color.white,
    paddingHorizontal: Input_Placeholder_Padding,
    borderRadius: normalize(5),
    fontSize: normalize(theme.size.md),
  },
  password: {
    fontFamily: font.RobotoLight,
    fontSize: normalize(20),
    marginHorizontal: normalize(2),
  },
  main: {
    flex: 1,
    marginTop: normalize(30),
    flexDirection: 'column',
    zIndex: 100,
  },
});

export {verificationStyle};
