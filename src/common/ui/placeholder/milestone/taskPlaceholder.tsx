import React from 'react';
import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {taskPlaceholderStyle as ts} from '../../../../assets';
import {normalize} from '../../../../utils';

const TaskPlaceHolder = ({length, space}: {length: number; space: number}) => {
  const list = Array(length).fill('');

  return (
    <>
      {list.map((item, index) => (
        <View key={index} style={{width: '100%'}}>
          <SkeletonPlaceholder>
            <View style={ts.wrapper}>
              <View style={ts.body}>
                <View style={ts.circle} />
                <View style={{marginLeft: normalize(10)}}>
                  <View style={ts.bigLine} />
                  <View style={ts.smallLine} />
                </View>
              </View>
            </View>
          </SkeletonPlaceholder>
        </View>
      ))}
    </>
  );
};

export {TaskPlaceHolder};
