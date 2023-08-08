import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {color, commonStyle} from '../../assets';

const Loader = () => {
  return (
    <View style={[commonStyle.alignCenter, commonStyle.alignRow]}>
      <ActivityIndicator size="large" color={color.black} />
    </View>
  );
};

export {Loader};
