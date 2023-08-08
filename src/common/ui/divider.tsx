import React from 'react';

import { Divider } from 'react-native-elements';
import { color } from '../../assets'

export const CustomDivider = (props: any) => {
  return (
    <Divider style={[{ backgroundColor: color.grey }, props.style]} />
  )
}

