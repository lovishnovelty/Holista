import React from 'react';
import CheckBox from 'react-native-check-box';
import {checkBoxStyle, color, theme, app_theme} from '../../assets';
import RadioForm, {
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import {normalize} from 'react-native-elements';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {regularTextStyle as rs} from '../../assets';

interface CheckBoxProp {
  disabled?: boolean;
  isSelected: boolean;
  style?: any;
  type?: string;
  onValueChange: (val: boolean) => any;
  rightText: string;
  rightTextStyle: any;
}

const CustomCheckBox = ({
  isSelected,
  onValueChange,
  disabled = false,
  rightText,
  rightTextStyle,
}: CheckBoxProp) => {
  return (
    <CheckBox
      disabled={disabled}
      isChecked={isSelected}
      checkBoxColor={color.border}
      rightText={rightText}
      onClick={() => {
        onValueChange(!isSelected);
      }}
      rightTextStyle={[rs.default, rightTextStyle]}
      checkedCheckBoxColor={app_theme.primary_color}
    />
  );
};

const RadioButton = ({
  size = 16,
  selected,
  onValueChange,
  options,
}: {
  size?: number;
  selected: any;
  onValueChange: (val: number, uuid: any) => any;
  options: any;
}) => {
  return (
    <RadioForm formHorizontal={false} animation={true}>
      {options.map((obj: any, i: number) => (
        <TouchableOpacity
          onPress={() => {
            onValueChange(obj.value, obj.uuid);
          }}
          key={i}
          style={checkBoxStyle.checkBoxContainer}>
          <RadioButtonInput
            obj={obj}
            index={i}
            isSelected={selected === obj.value}
            borderWidth={3}
            buttonInnerColor={color.accentGreen}
            buttonOuterColor={color.borderGrey}
            buttonSize={size}
            onPress={() => onValueChange(obj.value, obj.uuid)}
            buttonOuterSize={size * 1.5}
            buttonStyle={{}}
            buttonWrapStyle={style.buttonWrapper}
          />
          <RadioButtonLabel
            obj={obj}
            index={i}
            onPress={() => onValueChange(obj.value, obj.uuid)}
            labelHorizontal={false}
            labelStyle={{
              fontSize: normalize(theme.size.md),
              color: color.darkBlack,
            }}
            labelWrapStyle={style.labelWrapper}
          />
        </TouchableOpacity>
      ))}
    </RadioForm>
  );
};

const SelectButton = ({
  name,
  color,
  size,
}: {
  name: string;
  color?: string;
  size?: number;
}) => {
  return <></>;
};

const style = StyleSheet.create({
  labelWrapper: {
    marginLeft: normalize(theme.size.xxs),
    flex: 11,
  },
  buttonWrapper: {
    marginLeft: normalize(theme.size.xxs),
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export {CustomCheckBox, SelectButton, RadioButton};
