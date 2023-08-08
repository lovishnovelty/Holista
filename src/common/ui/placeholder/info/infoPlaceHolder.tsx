import React from 'react';
import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {infoPlaceHolderStyle} from '../../../../assets';

const InfoPlaceHolder = ({type}: {type: string}) => {
  return (
    <SkeletonPlaceholder>
      <View style={infoPlaceHolderStyle.container}>
        {[...Array(10)].map((item, index) => (
          <View key={index} style={infoPlaceHolderStyle.documentContainer}>
            <View
              style={
                type === 'document'
                  ? infoPlaceHolderStyle.document
                  : {display: 'none'}
              }
            />
            <View style={{flex: 18}}>
              <View style={infoPlaceHolderStyle.leftContainer} />
            </View>
            <View
              style={
                type === 'document'
                  ? infoPlaceHolderStyle.right
                  : {display: 'none'}
              }
            />
          </View>
        ))}
      </View>
    </SkeletonPlaceholder>
  );
};

export {InfoPlaceHolder};
