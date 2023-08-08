import React from 'react';
import {StyleProp, TouchableOpacity, ViewStyle} from 'react-native';
import {commonStyle as cs} from '../../assets';

interface Props {
  children: any;
  styles?: StyleProp<ViewStyle>;
  disabled?: boolean;
  onHandlePress?: () => void;
}

export function Card({
  children,
  styles,
  onHandlePress,
  disabled = true,
}: Props) {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onHandlePress}
      style={[cs.cardStyle, styles]}>
      {children}
    </TouchableOpacity>
  );
}
