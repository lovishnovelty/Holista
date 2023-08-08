import {StyleSheet} from 'react-native';
import {normalize} from '../../../../../utils';
import {theme} from '../../../../theme';

export const idCardPlaceholderStyle = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginLeft: normalize(theme.size.xxs),
    marginTop: normalize(30),
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: normalize(theme.size.lg),
  },
  title1: {
    width: normalize(80),
    height: normalize(theme.size.lg),
    borderRadius: normalize(4),
  },
  title2: {
    width: normalize(80),
    height: normalize(theme.size.xxs),
    borderRadius: normalize(4),
  },
  container1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: normalize(theme.size.xxs),
  },
  container2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: normalize(25),
    marginTop: normalize(theme.size.xxs),
  },
  key1: {
    width: normalize(Math.round(Math.random() * 50) + 40),
    height: normalize(theme.size.xxs),
    borderRadius: normalize(4),
  },
  value1: {
    width: normalize(Math.round(Math.random() * 60) + 40),
    height: normalize(theme.size.xxs),
    borderRadius: normalize(4),
  },
  key2: {
    width: normalize(Math.round(Math.random() * 50) + theme.size.xxs),
    height: normalize(theme.size.xxs),
    borderRadius: normalize(4),
  },
  value2: {
    width: normalize(Math.round(Math.random() * 60) + theme.size.xxs),
    height: normalize(theme.size.xxs),
    borderRadius: normalize(4),
  },
});
