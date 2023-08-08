import React from 'react';
import {View} from 'react-native';
import {globalStyle as gs} from '../../assets';
import Logo from '../../assets/images/svg/Logo.svg';

const Header = (props: any) => {
  return (
    <>
      <View style={gs.header}>
        <Logo width="26" height="42" />
      </View>
      <View style={{height: `${props.top}%`}} />
    </>
  );
};

export {Header};
