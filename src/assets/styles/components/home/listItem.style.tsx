import {StyleSheet} from 'react-native';
import {normalize} from '../../../../utils';
import {color} from '../../../theme';

const listStyle = StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginHorizontal: normalize(10),
    backgroundColor: color.fadeGreen,
    paddingTop: normalize(10),
    paddingBottom: normalize(10),
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: normalize(3),
    marginTop: normalize(6),
  },
  default: {
    marginLeft: normalize(13),
    marginTop: normalize(2),
    textAlign: 'left',
  },
});

export {listStyle};
