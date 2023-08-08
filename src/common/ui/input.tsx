import React from 'react';
import {TextInput, View} from 'react-native';
import {commonStyle as cs} from '../../assets';
import {color} from '../../assets/theme';
import {InputInterface} from '../../interface';
import {RegularText} from './regularText';

const Input = React.forwardRef(
  (
    {
      placeholder,
      secureTextEntry,
      inputStyle,
      onChangeText,
      keyboardType,
      textContentType,
      returnType,
      autoCapitalize,
      inputRef,
      autoFocus,
      onSubmitEditing,
      value,
      error,
      touched,
      maxLength,
      ...props
    }: InputInterface,
    ref: any,
  ) => {
    return (
      <View style={cs.input}>
        <TextInput
          ref={ref}
          {...props}
          autoFocus={autoFocus}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry ?? false}
          style={[cs.inputStyle, inputStyle]}
          autoCorrect={false}
          placeholderTextColor={color.lightBlack}
          value={value}
          onSubmitEditing={onSubmitEditing}
          keyboardType={keyboardType}
          textContentType={textContentType}
          underlineColorAndroid="transparent"
          returnKeyType={returnType}
          onChangeText={onChangeText}
          autoCapitalize={autoCapitalize}
          maxLength={maxLength}
        />
        {error && <RegularText title={error} style={cs.error} />}
      </View>
    );
  },
);

export {Input};
