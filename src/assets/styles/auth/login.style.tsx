import {StyleSheet} from 'react-native';
import {normalize} from '../../../utils/helper';
import {color, theme, app_theme, font} from '../../theme';

const Input_Placeholder_Padding = normalize(theme.size.xxs);

const loginStyle = StyleSheet.create({
  toggleIcon: {
    position: 'absolute',
    right: normalize(10),
    top: normalize(16),
  },
  error: {alignSelf: 'flex-start', color: color.red},
  wrapper: {
    flex: 1,
    backgroundColor: app_theme.primary_color,
  },
  container: {
    flex: 1,
    marginHorizontal: normalize(24),
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
  },
  defaultTextStyle: {
    color: color.black,
  },
  header_title: {
    fontSize: normalize(40),
    fontWeight: 'bold',
    marginHorizontal: normalize(theme.size.xxs),
  },
  login_svg_style: {
    position: 'absolute',
    top: 0,
    left: -1,
    right: 0,
    bottom: 0,
  },
  body: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  body_header: {
    fontSize: normalize(24),
    fontWeight: 'bold',
  },
  biometric: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: normalize(15),
  },
  footerHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: normalize(40),
    marginBottom: normalize(theme.size.xxs),
  },
  signIn: {
    backgroundColor: app_theme.primary_color,
    width: '100%',
    paddingVertical: normalize(theme.size.xxs),
    borderRadius: normalize(theme.size.xxxs),
  },
  activateAccountBtn: {
    backgroundColor: color.white,
    marginTop: '10%',
  },
  touchIdTxt: {
    color: color.white,
    marginTop: normalize(theme.size.xxs),
  },
  activeAccountTxt: {
    color: '#183963',
    fontSize: normalize(theme.size.base),
    fontWeight: 'bold',
  },
  inputStyle: {
    backgroundColor: color.white,
    paddingHorizontal: Input_Placeholder_Padding,
    borderRadius: normalize(theme.size.xxxs),
    fontSize: normalize(theme.size.md),
  },
  rememberMeSection: {
    marginTop: normalize(32),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rememberView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rememberMeSection_title: {
    fontSize: normalize(14),
  },

  footer_divider: {
    width: '20%',
    height: normalize(4),
    backgroundColor: color.white,
  },
  fotter_title: {
    paddingHorizontal: normalize(18),
    fontSize: normalize(15),
  },
  member: {fontFamily: font.RobotoLight, fontSize: normalize(24)},
  password: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});

export {loginStyle};
