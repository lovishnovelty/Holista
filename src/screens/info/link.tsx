import React from 'react';
import {View, TouchableOpacity, Linking} from 'react-native';
import {documentStyle} from '../../assets';
import {RegularText} from '../../common/ui';
import {hideLoader} from '../../utils';

const Link = ({title, link}: {title: string; link: string}) => {
  return (
    <TouchableOpacity
      style={documentStyle.container}
      onPress={async () => {
        await Linking.openURL(link), hideLoader();
      }}>
      <RegularText title={title} style={{textAlign: 'left'}} />
    </TouchableOpacity>
  );
};

export default Link;
