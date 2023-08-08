import React from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {color, font, theme} from '../../assets';
import {normalize} from '../../utils';

const DropDown = (props: any) => {
  return (
    <DropDownPicker
      items={props.options}
      defaultValue={props.select}
      labelStyle={{
        color: color.placeholder,
      }}
      placeholder={props.placeholder}
      containerStyle={{
        height: normalize(props.height ?? 48),
      }}
      globalTextStyle={{
        fontSize: normalize(theme.size.md),
        fontFamily: font.RobotoRegular,
      }}
      style={{
        backgroundColor: color.backgroundGrey,
      }}
      arrowSize={normalize(20)}
      selectedLabelStyle={{color: 'black'}}
      itemStyle={{
        justifyContent: 'flex-start',
      }}
      dropDownStyle={{
        backgroundColor: color.backgroundGrey,
      }}
      onChangeItem={props.onChange}
    />
  );
};

export {DropDown};
