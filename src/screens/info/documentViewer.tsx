import React, {useEffect, useState} from 'react';
import {Linking, Platform} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {hideLoader, showToast} from '../../utils';
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
      console.log(uri, 'uroiiii');
      const date = new Date();

      const uniqueString = Math.floor(date.getTime() + date.getSeconds() / 2);
      const directoryPath =
        Platform.OS === 'android'
          ? RNFS.DownloadDirectoryPath
          : RNFS.DocumentDirectoryPath;
      const extension = uri.split('.')[uri.split('.').length - 1];
      const localFile = `${directoryPath}/${uri.replace(
        /\.[^/.]+$/,
        '',
      )}-${uniqueString}.${extension}`;
      const options = {
        fromUrl: encodeURI(uri),
        toFile: localFile,
        progress: data => {
          // You can use this callback to track the download progress
          const progress = data.bytesWritten / data.contentLength;
          console.log(`Download Progress: ${progress}`);
        },
      };
      if (extension === 'pdf') {
        console.log('log');
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
            .then(success => {
              setDocIndex(-1);
            })
            .catch(async error => {
              const errorMsg =
                String(error) === 'Error: No app associated with this mime type'
                  ? 'No app associated with this file type.'
                  : 'Network Error';
              setDocIndex(-1);
              showToast({
                type: 'error',
                text1: errorMsg,
              });
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
