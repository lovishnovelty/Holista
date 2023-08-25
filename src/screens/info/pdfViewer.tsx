import React, {useState} from 'react';
import {Modal, View, TouchableOpacity, Platform} from 'react-native';
import Pdf from 'react-native-pdf';

import {color, documentStyle, pdfViewerStyle} from '../../assets';
import {Icon} from '../../common/ui';
import {setDocIndex} from '../../redux/data/data-action';
import {normalize} from '../../utils';

const PdfViewer = ({
  visible,
  setVisible,
  uri,
  setUri,
}: {
  visible: boolean;
  setVisible: Function;
  uri: string;
  setUri: Function;
}) => {
  const [loading, setLoading] = useState(true);

  const onClose = () => {
    setVisible(false);
    setLoading(true);
    setUri('');
  };

  return (
    <View style={pdfViewerStyle.container}>
      {visible && (
        <Modal
          onRequestClose={onClose}
          animationType={'slide'}
          transparent={true}
          visible={visible}>
          {!loading && (
            <TouchableOpacity style={pdfViewerStyle.icon} onPress={onClose}>
              <View style={Platform.OS === 'ios' && {marginTop: normalize(40)}}>
                <Icon name="close-circle" size={30} color={color.greyDarker} />
              </View>
            </TouchableOpacity>
          )}
          <Pdf
            trustAllCerts={false}
            onError={error => {}}
            activityIndicator={<></>}
            source={{
              uri: uri,
              cache: true,
            }}
            onLoadComplete={() => {
              setDocIndex(-1);
              setLoading(false);
            }}
            style={documentStyle.pdf}
          />
        </Modal>
      )}
    </View>
  );
};

export default PdfViewer;
