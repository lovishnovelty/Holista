import {StyleSheet} from 'react-native';
import {normalize} from '../../../utils';
import {theme} from '../../theme';

export const questionStyle = StyleSheet.create({
  container: {marginHorizontal: normalize(20), flex: 1},
  textContainer: {
    height: '45%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: normalize(theme.size.xxs),
    textAlign: 'center',
  },
  label: {
    marginLeft: normalize(theme.size.xxs),
    fontSize: normalize(theme.size.md),
  },
  submitContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    marginBottom: normalize(40),
    marginTop: normalize(20),
  },
  textareaContainer: {
    height: normalize(120),
    padding: normalize(5),
    backgroundColor: '#f7f7f7',
  },
  textarea: {
    textAlignVertical: 'top',
    height: normalize(170),
    fontSize: normalize(theme.size.md),
    color: '#333',
  },
  messageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: normalize(20),
    marginVertical: normalize(100),
  },
});
