import React from 'react';
import {Image} from 'react-native';
import {commonStyle as cs} from '../../assets';
import {normalize} from '../../utils';

const ImageInput = (props: any) => {
  return (
    <Image
      source={{uri: props.uri}}
      style={[
        cs.imageStyle,
        {
          width: normalize(props.width ?? 100),
          height: normalize(props.height ?? 50),
        },
      ]}
    />
  );
};

export {ImageInput};
