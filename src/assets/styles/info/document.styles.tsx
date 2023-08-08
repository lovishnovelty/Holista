import {Dimensions, StyleSheet} from 'react-native';
import {normalize} from '../../../utils';
import {color} from '../../theme';

export const documentStyle = StyleSheet.create({
  documentsContainer: {
    flex: 1,
    backgroundColor: color.white,
  },
  container: {
    flexDirection: 'row',
    marginHorizontal: normalize(18),
    paddingVertical: normalize(18),
    borderBottomWidth: 2,
    borderBottomColor: color.greyLightest,
  },
  text: {flex: 9, flexDirection: 'row', alignItems: 'center'},
  icon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'flex-end',
    marginLeft: normalize(30),
  },
  pdf: {
    position: 'absolute',
    flex: 1,
    zIndex: 4,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  center: {flexGrow: 1, justifyContent: 'flex-start', flexDirection: 'column'},
});
