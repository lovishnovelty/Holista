import React, {useEffect, useState} from 'react';
import {Linking} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {hideLoader, snackBarBottom} from '../../utils';
import PdfViewer from './pdfViewer';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import {setDocIndex} from '../../redux/data/data-action';

const DocumentViewer = () => {
  const [visible, setVisible] = useState(false);
  const auth = useSelector((state: any) => state.auth);
  const [uri, setUri] = useState('');
  const dispatch = useDispatch();

  const openLink = async (url: any) => await Linking.openURL(url);

  useEffect(() => {
    if (uri !== '') {
      const extension = uri.split('.')[uri.split('.').length - 1];
      const localFile = `${RNFS.DocumentDirectoryPath}/temporaryfile.${extension}`;
      const options = {
        fromUrl: uri,
        toFile: localFile,
      };
      if (extension === 'pdf') {
        setVisible(true);
        hideLoader();
        setUri(uri);
      } else if (
        extension === 'xlsx' ||
        extension === 'txt' ||
        extension === 'jpeg' ||
        extension === 'jpg' ||
        extension === 'png' ||
        extension === 'xls' ||
        extension === 'docx'
      ) {
        RNFS.downloadFile(options).promise.then(async () => {
          FileViewer.open(localFile)
            .then((success) => {
              setDocIndex(-1);
            })
            .catch((error) => {
              const errorMsg =
                String(error) === 'Error: No app associated with this mime type'
                  ? 'No app associated with this file type.'
                  : 'Network Error';

              setDocIndex(-1);
              snackBarBottom(errorMsg, 'error', true);
            });
          setUri('');
        });
      } else {
        openLink(uri);
        setDocIndex(-1);
        setUri('');
      }
    }
  }, [uri]);

  useEffect(() => {
    dispatch({
      type: 'SET_PDF',
      payload: {
        pdf: {setUri},
      },
    });
  }, [auth.userToken]);

  return (
    <PdfViewer
      visible={visible}
      setVisible={setVisible}
      uri={uri}
      setUri={setUri}
    />
  );
};

export {DocumentViewer};
