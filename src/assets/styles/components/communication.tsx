import {StyleSheet, Platform, Dimensions} from 'react-native';
import {normalize} from '../../../utils';
import {color} from '../../theme';

const communicationStyle = StyleSheet.create({
  main: {flex: 1, backgroundColor: '#FAFAFA'},
  body: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  tabViewWrapper: {
    margin: normalize(15),
  },
  tabBar: {
    flexDirection: 'row',
    // borderBottomWidth: 1,
    backgroundColor: 'white',
    justifyContent: 'space-around',
    // borderBottomColor: '#00000029',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    // marginBottom: normalize(5)
  },
  tabItem: {
    borderBottomColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    padding: normalize(15),
  },
  tabText: {
    paddingHorizontal: normalize(5),
  },
  activeTab: {
    borderBottomWidth: 3,
    marginTop: 3,
    borderBottomColor: '#67ABD5',
  },
  tabDetailContainer: {
    marginHorizontal: normalize(-15),
    // borderTopWidth: 1,
    height: '100%',
  },
  telemedicineWrapper: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: normalize(70),
  },
  telemedicineText: {
    justifyContent: 'center',
    paddingHorizontal: normalize(30),
  },
  joinCallWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomColor: '#EDEDED',
    borderBottomWidth: 1,
  },
  inputWrapper: {
    flex: 2,
    marginHorizontal: normalize(15),
  },
  input: {
    backgroundColor: '#F6F9FC',
    borderColor: '#DBE7F4',
    borderWidth: 1,
    borderRadius: normalize(5),
    paddingHorizontal: normalize(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonWrapper: {
    backgroundColor: '#3D9584',
    marginHorizontal: normalize(15),
    borderRadius: normalize(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#3D9584',
  },
  buttonText: {
    fontWeight: 'normal',
    fontSize: normalize(16),
  },
  orText: {
    position: 'absolute',
    left: Dimensions.get('window').width / 2 - 50,
    bottom: normalize(-10),
    backgroundColor: 'white',
    fontSize: normalize(16),
    paddingHorizontal: normalize(30),
  },
  messageWrapper: {
    // backgroundColor: '#FAFAFA',
    marginTop: normalize(5),
    flexDirection: 'row',
    paddingVertical: normalize(15),
    marginHorizontal: normalize(15),
    borderBottomWidth: 1,
    borderBottomColor: color.borderBottom,
  },
  messageImageWrapper: {
    paddingRight: normalize(15),
  },
  messageImage: {
    width: normalize(40),
    height: normalize(40),
  },
  messageTextWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: normalize(10),
  },
  messageText: {
    color: '#777777',
    fontSize: normalize(12),
  },
  textBold: {
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    backgroundColor: '#FAFAFA',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
    // flex: 1,
    maxHeight: normalize(50),
  },
  headerRightIcon: {
    marginHorizontal: normalize(5),
  },
  headerTitle: {
    fontSize: normalize(18),
    flex: 4,
    textAlign: 'center',
  },
  chatContainer: {
    justifyContent: 'flex-end',
    flexDirection: 'column-reverse',
  },
  chatWrapper: {
    flexDirection: 'row',
    marginHorizontal: normalize(10),
  },
  chatBox: {
    paddingHorizontal: normalize(10),
    paddingVertical: normalize(5),
    maxWidth: normalize(280),
    borderRadius: normalize(10),
  },
  receivedChatBox: {
    backgroundColor: '#67ABD5',
    borderTopStartRadius: 0,
  },
  sentChatBox: {
    backgroundColor: '#F6F9FC',
    borderBottomEndRadius: 0,
  },
  chatText: {
    fontSize: normalize(14),
  },
  receivedChatText: {
    color: 'white',
  },
  sentChatText: {
    color: '#222222',
  },
  chatTimeText: {
    color: '#666666',
    fontSize: normalize(12),
    fontStyle: 'italic',
    marginBottom: normalize(10),
    marginTop: normalize(2),
    marginRight: normalize(5),
  },
  sentChatTimeText: {
    alignSelf: 'flex-end',
  },
  chatFooterWrapper: {
    flexDirection: 'row',
    backgroundColor: '#FAFAFA',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    paddingVertical: normalize(10),
    // position: 'absolute',
    // bottom: 0,
  },
  typeMessageWrapper: {
    flex: 4,
    paddingLeft: normalize(10),
  },
  footerActionWrapper: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: normalize(5),
  },
  fileChatWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: normalize(30),
    paddingHorizontal: normalize(2),
  },
  fileText: {
    paddingHorizontal: normalize(5),
  },
  receivedFileText: {
    color: 'white',
  },
  sentFileText: {
    color: 'black',
  },
  chatDateWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: color.fade,
    borderBottomWidth: 1,
    margin: normalize(15),
    paddingBottom: normalize(5),
  },
});

export {communicationStyle};
