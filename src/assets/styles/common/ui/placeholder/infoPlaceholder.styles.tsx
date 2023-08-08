import {StyleSheet} from 'react-native';
import {normalize} from '../../../../../utils';

export const infoPlaceHolderStyle = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginHorizontal: normalize(20),
    marginVertical: normalize(20),
  },
  documentContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: normalize(15),
  },
  document: {
    width: normalize(25),
    height: normalize(30),
    borderRadius: normalize(4),
    marginRight: normalize(15),
  },
  leftContainer: {
    width: `${Math.round(Math.random() * 20) + 40}%`,
    height: normalize(15),
    borderRadius: normalize(4),
  },
  right: {
    width: normalize(25),
    height: normalize(30),
    borderRadius: normalize(4),
    marginRight: 5,
    alignSelf: 'flex-end',
  },
});
