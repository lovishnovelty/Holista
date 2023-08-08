import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';

import {commonStyle, commonStyle as cs} from '../../assets';
import {color} from '../../assets/theme';
import {normalize} from '../../utils/helper';
interface buttonTypes {
  title: string;
  onPress: () => any;
  buttonStyle?: StyleProp<ViewStyle>;
  buttonTextStyle?: StyleProp<TextStyle>;
  buttonWrapper?: StyleProp<ViewStyle>;
  spinner?: boolean;
  disable?: boolean;
  top?: number;
}

const Button = ({
  title,
  onPress,
  buttonStyle,
  buttonTextStyle,
  buttonWrapper,
  spinner,
  disable,
  top = 0,
}: buttonTypes) => {
  return (
    <TouchableOpacity
      disabled={disable}
      onPress={onPress}
      style={[cs.buttonWrapper, buttonWrapper, {marginTop: normalize(top)}]}>
      <View style={[cs.defaultStyle, buttonStyle]}>
        <Text style={[cs.buttonText, buttonTextStyle]}>{title}</Text>
        {spinner && (
          <ActivityIndicator
            style={commonStyle.ml10}
            size="small"
            color={color.white}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

Button.defaultProps = {
  disable: false,
};

export {Button};
