import React from 'react';
import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {profilePlaceholderStyle} from '../../../../assets';

const ProfilePlaceHolder = () => {
  return (
    <SkeletonPlaceholder>
      <View style={profilePlaceholderStyle.container}>
        <View style={profilePlaceholderStyle.container1} />
        {[...Array(10)].map((item, index) => (
          <View key={index} style={profilePlaceholderStyle.container2}>
            <View style={{flex: 4}}>
              <View style={profilePlaceholderStyle.key} />
            </View>
            <View style={{flex: 6}}>
              <View style={profilePlaceholderStyle.value} />
            </View>
          </View>
        ))}
      </View>
    </SkeletonPlaceholder>
  );
};

export {ProfilePlaceHolder};
