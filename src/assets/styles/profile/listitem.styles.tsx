import {StyleSheet} from 'react-native';
import {normalize} from '../../../utils';
import {color} from '../../theme';

export const listItemStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: normalize(12),
    borderBottomWidth: 1,
    borderBottomColor: color.greyLightest,
    alignItems: 'center',
  },
  key: {
    flex: 2,
    paddingLeft: normalize(10),
  },
  value: {flex: 6},
});
