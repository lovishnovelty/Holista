import {StyleSheet} from 'react-native';
import {normalize} from '../../../utils';
import {color, theme} from '../../theme';

export const profileStyle = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: color.white,
  },
  align: {marginHorizontal: normalize(20)},
  gap: {paddingVertical: normalize(15)},
  titleText: {
    textAlign: 'left',
    marginBottom: normalize(theme.size.lg),
    marginTop: normalize(theme.size.lg),
    fontSize: normalize(theme.size.base),
  },
});
