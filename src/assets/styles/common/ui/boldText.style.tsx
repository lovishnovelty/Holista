import {StyleSheet} from 'react-native';
import {normalize} from '../../../../utils';
import {color, font, theme} from '../../../theme';

const boldTextStyle = StyleSheet.create({
  default: {
    textAlign: 'center',
    fontSize: normalize(theme.size.sm),
    color: color.textBig,
    fontFamily: font.RobotoBold,
    fontWeight: '700',
  },
});

export {boldTextStyle};
