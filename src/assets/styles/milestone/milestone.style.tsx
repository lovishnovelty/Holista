import {StyleSheet, Platform} from 'react-native';
import {normalize} from '../../../utils';
import {color, theme} from '../../theme';

const Input_Placeholder_Padding = normalize(theme.size.xxs);

const milestoneStyle = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginTop: normalize(10),
  },
  container: {
    marginTop: normalize(theme.size.xxs),
  },
  search: {
    marginHorizontal: normalize(theme.size.lg),
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  buttons: {
    marginHorizontal: normalize(20),
    marginTop: normalize(theme.size.lg),
    paddingVertical: normalize(10),
    flexDirection: 'row',
    shadowColor: color.navShadow,
    ...Platform.select({
      ios: {
        shadowOffset: {width: 0, height: normalize(theme.size.xxs)},
      },
      android: {
        borderTopWidth: 0,
      },
    }),
    shadowOpacity: 0.5,
    shadowRadius: 4,
    backgroundColor: color.navheader,
  },
  buttonItem: {
    backgroundColor: color.fade,
    paddingVertical: normalize(7),
    paddingHorizontal: normalize(theme.size.md),
    borderRadius: normalize(theme.size.lg),
  },
  body: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginHorizontal: normalize(theme.size.lg),
  },
  started: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  list: {
    marginTop: normalize(34),
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  listItem: {
    width: '100%',
    marginTop: normalize(13),
    backgroundColor: color.fadeGreen,
    borderRadius: normalize(8),
    borderLeftWidth: normalize(theme.size.xxxs),
    borderLeftColor: color.accentGreen,
    alignItems: 'center',
  },
  taskList: {
    backgroundColor: color.fadeGreen,
    borderRadius: normalize(8),
    borderLeftWidth: normalize(theme.size.xxxs),
    borderLeftColor: color.accentGreen,
  },
  statusGap: {
    marginHorizontal: normalize(5),
  },
  gap: {
    marginTop: normalize(19),
    marginBottom: normalize(19),
    borderWidth: 0.5,
    width: '100%',
    borderColor: color.border,
  },
  touchable: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleStyle: {
    color: color.pressableText,
    fontSize: normalize(15),
    textAlign: 'center',
  },
  expand: {
    width: '100%',
  },
  arrow: {
    width: '100%',
    alignItems: 'flex-start',
    paddingVertical: normalize(10),
    marginVertical: -normalize(10),
  },
  main: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  status: {
    backgroundColor: color.borderGrey,
    borderRadius: normalize(30),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: normalize(10),
  },
  nameView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
  },
  name: {
    marginLeft: normalize(9.8),
    textAlign: 'left',
    paddingRight: normalize(35),
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {position: 'absolute', left: '90%'},
  empty: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});

export {milestoneStyle};
