import {normalize} from '../../../utils/helper';
import {color, font, theme} from '../theme';
import {StyleSheet, Platform} from 'react-native';

export const taskStyle = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: normalize(20),
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  msg: {
    fontSize: normalize(24),
  },
  info: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  button: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: normalize(20),
  },
  main: {
    marginTop: normalize(34),
  },
});
