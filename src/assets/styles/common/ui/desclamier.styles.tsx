import {StyleSheet, Platform} from 'react-native';
import {normalize} from '../../../../utils';
import {color} from '../../../theme';

const desclamierStyle = StyleSheet.create({
  main: {
    flex: 1,
    zIndex: 200,
    marginLeft: 0,
    marginBottom: 0,
    width: '100%',
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: color.fadeBlack,
    borderTopRightRadius: normalize(10),
    borderTopLeftRadius: normalize(10),
  },
  header: {
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  font: {fontSize: normalize(24)},
  scrollView: {
    flex: 0.8,
    backgroundColor: color.white,
    padding: normalize(15),
    flexDirection: 'column',
  },
  text: {
    textAlign: 'justify',
    lineHeight: normalize(20),
    marginBottom: normalize(10),
  },
  checkBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: normalize(40),
  },
  buttonWrapper: {
    flex: 0.2,
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: normalize(20),
    justifyContent: 'center',
  },
  button: {
    borderRadius: normalize(10),
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
      },
    }),
  },
  buttonDisable: {
    backgroundColor: color.fade,
    color: color.black,
  },
});

export {desclamierStyle};
