import {StyleSheet} from 'react-native';
import {normalize} from '../../../../utils';
import {color} from '../../../theme';

const checkBoxStyle = StyleSheet.create({
  checkBoxContainer: {
    flexDirection: 'row',
    paddingVertical: normalize(10),
    marginBottom: normalize(20),
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    backgroundColor: color.navheader,
  },
});

export {checkBoxStyle};
