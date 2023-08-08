import React from 'react';
import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {color, theme} from '../../../../assets';
import {normalize} from '../../../../utils';

const ListPlaceHolder = () => {
  return (
    <SkeletonPlaceholder>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'flex-start',
          marginLeft: normalize(theme.size.xxs),
        }}>
        <View
          style={{
            width: normalize(80),
            height: normalize(theme.size.xxs),
            borderRadius: normalize(4),
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            marginTop: normalize(theme.size.xxxs),
          }}>
          <View
            style={{
              width: normalize(theme.size.lg),
              height: normalize(theme.size.lg),
              borderRadius: normalize(theme.size.lg),
              backgroundColor: color.red,
            }}
          />
          <View
            style={{
              marginTop: normalize(6),
              width: normalize(120),
              height: normalize(theme.size.xxs),
              borderRadius: normalize(4),
              marginLeft: normalize(theme.size.xxs),
            }}
          />
        </View>
      </View>
    </SkeletonPlaceholder>
  );
};

export {ListPlaceHolder};
