import React from 'react';
import {StyleProp, View, ViewStyle, SafeAreaView} from 'react-native';
import {wrapperStyle} from '../../assets';
import {normalize} from '../../utils';

const Wrapper = ({
  horizontalMargin = 20,
  style,
  children,
}: {
  horizontalMargin?: number;
  style?: StyleProp<ViewStyle>;
  children: any;
}) => {
  return (
    <SafeAreaView style={wrapperStyle.container}>
      <View
        style={[
          {
            marginHorizontal: normalize(horizontalMargin),
          },
          wrapperStyle.child,
          style,
        ]}>
        {children}
      </View>
    </SafeAreaView>
  );
};

export {Wrapper};
