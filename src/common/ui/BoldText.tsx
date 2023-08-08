import React from 'react';
import {Text} from 'react-native';
import normalize from 'react-native-normalize';
import {color, font} from '../../assets';
import {boldTextStyle as bs} from '../../assets';

const BoldText = (props: any) => {
  return <Text style={[bs.default, props.style]}>{props.title}</Text>;
};

export {BoldText};
