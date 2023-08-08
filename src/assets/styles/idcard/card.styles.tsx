import {Dimensions, StyleSheet} from 'react-native';
import {normalize} from '../../../utils';
import {color, theme} from '../../theme';

export const cardStyle = StyleSheet.create({
  container: {
    borderWidth: 1,
    padding: normalize(theme.size.xxs),
    borderColor: color.greyLightest,
    marginTop: normalize(theme.size.lg),
    borderRadius: normalize(5),
  },
  text: {
    fontSize: normalize(12),
    textAlign: 'right',
  },

  title: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: normalize(2.5),
  },
  c1: {
    flex: 4,
  },
  c2: {
    borderLeftWidth: 1,
    borderColor: color.greyLightest,
    flex: 5,
  },
  tableHeader: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: color.greyLightest,
  },
  bothSideBorder: {
    borderBottomWidth: 1,
    borderColor: color.greyLightest,
  },
  tableAlign: {
    marginVertical: normalize(theme.size.lg),
    marginHorizontal: -normalize(theme.size.xxs),
  },
  listAlign: {
    paddingLeft: normalize(20),
  },
  nodataWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: Dimensions.get('window').height - normalize(170),
  },
  benefitPlanTxt: {
    fontSize: normalize(theme.size.xs),
    textAlign: 'left',
  },
  memberNameTxt: {
    fontSize: normalize(theme.size.xs),
    textAlign: 'left',
  },
  dobTxt: {
    fontSize: normalize(theme.size.xs),
    textAlign: 'left',
  },
  episodeTxt: {
    fontSize: normalize(theme.size.xs),
    textAlign: 'left',
    marginBottom: normalize(theme.size.xxxs),
    marginTop: normalize(theme.size.xxxs),
    marginLeft: normalize(theme.size.xxs),
  },
  groupNameTxt: {
    fontSize: normalize(theme.size.xs),
    textAlign: 'left',
  },
  commonTxtStyle: {
    fontSize: normalize(theme.size.xs),
    textAlign: 'left',
    marginBottom: normalize(theme.size.xxxs),
    marginTop: normalize(theme.size.xxxs),
    marginLeft: normalize(theme.size.xxs),
  },
  link: {
    fontSize: normalize(theme.size.xs),
    textAlign: 'left',
    textDecorationLine: 'underline',
    color: '#67acd5',
    fontWeight: 'bold',
  },
  linkWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: normalize(10),
  },
  txtMsg: {
    fontSize: normalize(12),
    fontWeight: 'bold',
  },
  adminTxtStyle: {
    paddingBottom: normalize(8),
    marginTop: normalize(-16),
    opacity: 0.6,
    fontStyle: 'italic',
    textAlign: 'center',
    fontSize: normalize(12),
  },
});
