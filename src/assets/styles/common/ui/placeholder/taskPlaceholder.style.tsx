import {StyleSheet} from 'react-native';
import {normalize} from '../../../../../utils';
import {color} from '../../../../theme';

const taskPlaceholderStyle = StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '100%',
    borderWidth: 1,
    marginBottom: normalize(10),
    borderColor: color.fade,
    borderRadius: normalize(5),
    paddingHorizontal: normalize(10),
    paddingVertical: normalize(12.5),
  },
  smallLine: {
    height: normalize(10),
    borderRadius: normalize(4),
    width: '60%',
    marginTop: normalize(6),
  },
  body: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  circle: {
    width: normalize(35),
    height: normalize(35),
    borderRadius: normalize(35),
  },
  bigLine: {
    width: normalize(260),
    height: normalize(10),
    borderRadius: normalize(4),
  },
});

export {taskPlaceholderStyle};
