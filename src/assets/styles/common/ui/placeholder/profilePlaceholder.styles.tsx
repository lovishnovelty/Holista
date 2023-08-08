import {StyleSheet} from 'react-native';
import {normalize} from '../../../../../utils';
import {theme} from '../../../../theme';

export const profilePlaceholderStyle = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginHorizontal: normalize(theme.size.lg),
    marginTop: normalize(theme.size.lg),
  },
  container1: {
    width: normalize(80),
    height: normalize(theme.size.lg),
    borderRadius: normalize(theme.size.xxxs),
    marginBottom: normalize(40),
  },
  container2: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: normalize(theme.size.base),
  },
  key: {
    width: '70%',
    height: normalize(theme.size.base),
    borderRadius: normalize(theme.size.xxxs),
  },
  value: {
    width: '90%',
    height: normalize(theme.size.base),
    borderRadius: normalize(theme.size.xxxs),
  },
});
