import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {app_theme, questionnaireStyle} from '../../assets';
import {Icon} from './icon';

const GoBack = ({onPress}: {onPress: any}) => {
  return (
    <TouchableOpacity onPress={onPress} style={questionnaireStyle.back}>
      <Icon name="keyboard-backspace" color={app_theme.primary_color} />
      <Text> Go back</Text>
    </TouchableOpacity>
  );
};

export {GoBack};
