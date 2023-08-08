import {StyleSheet} from 'react-native';
import {normalize} from '../../../../utils';
import {color, theme, app_theme} from '../../../theme';

const Input_Placeholder_Padding = normalize(20);

const otpStyle = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  codeView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: normalize(30),
  },
  boxStyle: {
    borderWidth: 1,
    borderColor: color.borderGrey,
    backgroundColor: color.backgroundGrey,
    borderRadius: normalize(8),
    fontSize: normalize(theme.size.base),
    color: color.black,
    width: normalize(45),
    height: normalize(48),
    textAlign: 'center',
    margin: normalize(5),
  },
  buttonStyle: {
    backgroundColor: app_theme.primary_color,
    width: '100%',
    paddingVertical: normalize(10),
    borderRadius: normalize(5),
  },
});

export {otpStyle};
