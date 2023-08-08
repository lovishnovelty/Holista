import React from 'react';
import {View} from 'react-native';
import AppLogo from '../../assets/images/svg/Logo.svg';
import {Wrapper} from '../../common/ui';

const Loading = () => {
  return (
    <Wrapper horizontalMargin={0}>
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <AppLogo />
      </View>
    </Wrapper>
  );
};

export {Loading};
