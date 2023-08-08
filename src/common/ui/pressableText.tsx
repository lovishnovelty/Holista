import React from 'react';
import {Text, View, TouchableOpacity, ActivityIndicator} from 'react-native';

import {color, commonStyle as cs} from '../../assets';
import {normalize} from '../../utils';
import {Icon} from './icon';

const PressableText = (props: any) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[cs.pressable, props.style]}>
      <Text style={[cs.text, props.textStyle]}>{props.title}</Text>
      <View style={{marginHorizontal: normalize(props.spacing ?? 0)}} />
      {props.icon && (
        <Icon name={props.iconName} color={props.color} size={props.size} />
      )}
      {props.loading && (
        <ActivityIndicator color={color.black} size={normalize(props.size)} />
      )}
    </TouchableOpacity>
  );
};

export {PressableText};
