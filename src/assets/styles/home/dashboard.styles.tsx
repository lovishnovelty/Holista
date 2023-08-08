import {StyleSheet} from 'react-native';
import {normalize} from '../../../utils';
import {color, theme} from '../../theme';

const dashboardStyle = StyleSheet.create({
  wrapper: {
    height: normalize(750),
  },
  container: {
    marginHorizontal: normalize(theme.size.lg),
    flex: 1,
  },
  message: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: normalize(theme.size.xs),
    marginTop: normalize(22),
  },
  points: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: normalize(10),
  },
  task: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: normalize(10),
  },
  taskItem: {
    backgroundColor: color.fadeGreen,
    borderRadius: normalize(8),
    borderLeftWidth: normalize(theme.size.xxxs),
    borderLeftColor: color.accentGreen,
  },
  cardWrapper: {
    borderWidth: 10,
  },

  provider: {
    backgroundColor: color.backgroundGrey,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: normalize(30),
    height: normalize(150),
    borderRadius: normalize(8),
  },
  footer: {
    flex: 1,
    width: '100%',
    marginTop: normalize(22),
    marginBottom: normalize(40),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  current: {
    width: '100%',
    flex: 1,
  },
  currentTaskWrapper: {
    width: '100%',
  },
  disclamier: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    backgroundColor: color.buttonBackground,
    paddingHorizontal: normalize(10),
    paddingVertical: normalize(8),
    borderRadius: normalize(6),
    marginBottom: normalize(10),
  },
  learnMore: {
    paddingVertical: normalize(5),
    backgroundColor: color.white,
    color: color.buttonBackground,
    borderRadius: normalize(2),
  },
  navigationWrapper: {
    marginTop: normalize(20),
    width: '100%',
    flexDirection: 'column',
  },
  blockNavigationWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  blockNavigation: {flex: 0, width: '49%'},

  footerQuestionText: {
    marginBottom: normalize(theme.size.xs),
    textAlign: 'left',
    fontSize: normalize(16),
  },
  footerSubText: {
    fontSize: normalize(theme.size.xs),
    textAlign: 'left',
  },
  modalContentWrapper: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  modalText: {
    textAlign: 'center',
    color: 'black',
  },
  chatWrapper: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  chatNowBtn: {
    padding: 0,
    width: normalize(103),
    height: normalize(33),
    margin: normalize(5),
  },
  chatNowTxt: {
    fontSize: normalize(14),
  },
});

export {dashboardStyle};
