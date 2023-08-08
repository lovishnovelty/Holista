import {normalize} from '../../utils/helper';
import {color, font, theme, app_theme} from '../theme';
import {StyleSheet, Platform} from 'react-native';

export const commonStyle = StyleSheet.create({
  input: {flexDirection: 'column', width: '100%'},
  buttonWrapper: {
    flexDirection: 'row',
    zIndex: -10,
    elevation: 0,
    shadowOpacity: 0,
  },
  defaultStyle: {
    ...Platform.select({
      ios: {
        padding: normalize(theme.size.xxxs),
      },
      android: {
        padding: normalize(theme.size.xxs),
      },
    }),
    backgroundColor: app_theme.primary_color,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: normalize(theme.size.xxxs),
    width: '100%',
    height: normalize(theme.size.xll),
  },
  buttonText: {
    color: color.white,
    fontSize: normalize(theme.size.md),
    fontFamily: font.RobotoRegular,
    paddingVertical: normalize(theme.size.xxxs),
  },
  inputStyle: {
    backgroundColor: color.backgroundGrey,
    width: '100%',
    height: normalize(theme.size.xll),
    borderWidth: 1,
    borderColor: color.borderGrey,
    borderRadius: normalize(8),
    paddingLeft: normalize(theme.size.base),
    fontSize: normalize(theme.size.md),
  },
  cardStyle: {
    borderRadius: normalize(8),
    marginVertical: normalize(6),
    flex: 1,
    height: normalize(120),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.backgroundGrey,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: normalize(15),
    height: normalize(50),
    color: color.navheader,
    paddingHorizontal: normalize(theme.size.lg),
    zIndex: 10,
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: normalize(50),
  },
  headerLeftIconWrapper: {
    flex: 1.5,
  },
  headerRightIconWrapper: {
    flexDirection: 'row',
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleWrapper: {
    flex: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleText: {fontSize: normalize(18), textAlign: 'center'},
  default: {
    shadowColor: color.navShadow,
    shadowOffset: {width: 0, height: normalize(theme.size.xxxs)},
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 14,
    backgroundColor: color.navheader,
  },
  backArrow: {
    alignSelf: 'center',
    position: 'absolute',
    left: 10,
  },
  logout: {
    alignSelf: 'center',
    position: 'absolute',
    right: normalize(theme.size.lg),
  },

  tabContainer: {
    alignItems: 'center',
  },
  homeContainer: {
    position: 'absolute',
    bottom: normalize(14),
    height: normalize(60),
    width: normalize(60),
    borderRadius: normalize(60),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: color.navShadow,
    shadowOffset: {width: 0, height: normalize(theme.size.xxxs)},
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 4,
    right: '42%',
    backgroundColor: color.white,
  },
  profile: {
    marginLeft: normalize(10),
  },
  error: {
    marginTop: normalize(10),
    color: color.red,
    alignSelf: 'flex-start',
  },
  topTab: {
    backgroundColor: app_theme.primary_color,
    height: 3,
    borderRadius: normalize(3),
  },
  alignCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alignRow: {
    flexDirection: 'row',
  },
  ml10: {marginLeft: normalize(theme.size.xxs)},
  bggrey: {backgroundColor: color.greyLightest},
  icon: {
    fontSize: normalize(theme.size.xs),
    paddingBottom: normalize(theme.size.xxxs),
  },
  text: {
    textAlign: 'center',
    fontSize: normalize(14),
    color: app_theme.primary_color,
    fontFamily: font.RobotoRegular,
  },
  pressable: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {alignItems: 'center'},
  justifyContentCenter: {justifyContent: 'center'},
  centerHeaderWrapper: {justifyContent: 'flex-start', paddingLeft: 0},
  centerHeaderTitleWrapper: {width: '100%', marginLeft: '-10%', zIndex: 0},
});
