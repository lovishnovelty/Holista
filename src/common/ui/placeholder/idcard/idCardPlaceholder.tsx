import React from 'react';
import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {idCardPlaceholderStyle} from '../../../../assets';

const IdCardPlaceHolder = () => {
  return (
    <SkeletonPlaceholder>
      <View style={idCardPlaceholderStyle.container}>
        <View style={idCardPlaceholderStyle.titleContainer}>
          <View style={idCardPlaceholderStyle.title1} />
          <View style={idCardPlaceholderStyle.title2} />
        </View>
        {[...Array(9)].map((item, index) => (
          <View key={index} style={idCardPlaceholderStyle.container1}>
            <View style={idCardPlaceholderStyle.key1} />
            <View style={idCardPlaceholderStyle.value1} />
          </View>
        ))}
        {[...Array(2)].map((item, index) => (
          <View key={index} style={idCardPlaceholderStyle.container2}>
            <View style={idCardPlaceholderStyle.key2} />
            <View style={idCardPlaceholderStyle.value2} />
          </View>
        ))}
      </View>
    </SkeletonPlaceholder>
  );
};

export {IdCardPlaceHolder};
