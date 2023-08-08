import {StyleSheet} from 'react-native';
import {normalize} from '../../../../utils';
import {color, font} from '../../../theme';

const regularTextStyle = StyleSheet.create({
  default: {
    textAlign: 'center',
    fontSize: normalize(14),
    color: color.textBig,
    fontFamily: font.RobotoRegular,
  },
});

export {regularTextStyle};
