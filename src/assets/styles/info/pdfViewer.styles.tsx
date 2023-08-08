import {StyleSheet} from 'react-native';
import {normalize} from '../../../utils';
import {theme} from '../../theme';

export const pdfViewerStyle = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    position: 'absolute',
    top: normalize(2),
    right: normalize(2),
    zIndex: 10,
  },
});
