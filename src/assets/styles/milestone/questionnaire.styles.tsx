import {StyleSheet} from 'react-native';
import {normalize} from '../../../utils';

export const questionnaireStyle = StyleSheet.create({
  progressContainer: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: normalize(20),
    marginTop: normalize(10),
  },
  progressItem: {
    borderRadius: normalize(5),
    height: normalize(6),
    flexGrow: 1,
    marginHorizontal: normalize(5),
  },

  progressText: {
    fontSize: normalize(24),
    marginTop: normalize(20),
    fontWeight: 'bold',
  },
  button: {justifyContent: 'flex-start'},
  back: {
    marginVertical: normalize(20),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
