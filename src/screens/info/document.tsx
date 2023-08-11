import React from 'react';
import {View, TouchableOpacity, ActivityIndicator} from 'react-native';
import {app_theme, documentStyle} from '../../assets';
import {Icon, RegularText} from '../../common/ui';
import normalize from 'react-native-normalize';
import {useSelector} from 'react-redux';
import {setDocIndex} from '../../redux/data/data-action';
import {getFileTypeIcon} from '../../utils';

const Document = ({
  type,
  title,
  source,
  index,
}: {
  type: string;
  title: string;
  source: string;
  index: number;
}) => {
  const pdfState = useSelector((state: any) => state.data.pdf);
  const docLoadingIndex = useSelector(
    (state: any) => state.data.docLoadingIndex,
  );

  return (
    <TouchableOpacity
      style={documentStyle.container}
      onPress={() => {
        setDocIndex(index);
        pdfState.setUri(source);
      }}>
      <View style={documentStyle.text}>
        <Icon
          name={getFileTypeIcon(type)}
          color={app_theme.primary_color}
          size={normalize(25)}
        />
        <RegularText
          title={title}
          style={{marginLeft: 15, textAlign: 'left'}}
        />
      </View>
      <View style={documentStyle.icon}>
        {/* {index === docLoadingIndex ? (
          <ActivityIndicator color="#000" size={normalize(30)} />
        ) : ( */}
        <Icon
          name={'file-eye-outline'}
          color={app_theme.primary_color}
          size={normalize(25)}
        />
        {/* )} */}
      </View>
    </TouchableOpacity>
  );
};

export default Document;
