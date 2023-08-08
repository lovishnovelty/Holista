import {StyleSheet} from 'react-native';
import {normalize} from '../../utils';
import {color} from '../theme';

export const globalStyle = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: color.white,
  },
  wrapper: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: normalize(40),
  },
});
