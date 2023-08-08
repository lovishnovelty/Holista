import React from 'react';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import {normalize} from '../../utils/helper';
import {color} from '../../assets/theme';

const defaultSize = normalize(24);
const defaultColor = color.grey;

interface IconPropType {
  name: string;
  size?: any;
  color?: string | undefined;
}

export const Icon = ({name, size, color}: IconPropType) => {
  return (
    <IconM
      name={name}
      size={size ?? defaultSize}
      color={color ?? defaultColor}
    />
  );
};
