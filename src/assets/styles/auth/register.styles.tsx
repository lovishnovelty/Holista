import {StyleSheet} from 'react-native';
import {normalize} from '../../../utils/helper';
import {font} from '../../theme';

const registerStyle = StyleSheet.create({
  body: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: normalize(30),
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: normalize(20),
  },
  enroll: {fontFamily: font.RobotoLight, fontSize: normalize(20)},
});

export {registerStyle};
