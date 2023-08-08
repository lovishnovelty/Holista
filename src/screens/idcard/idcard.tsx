import React from 'react';
import {ScrollView} from 'react-native';
import {withTheme} from 'react-native-elements';
import {commonStyle, idCardStyle as ic} from '../../assets';
import {Wrapper} from '../../common/ui';
import {NavHeader} from '../../common/ui/navHeader';
import Card from './card';

const IdcardScreen = () => {
  return (
    <Wrapper horizontalMargin={0}>
      <NavHeader
        title="Member ID Card"
        style={commonStyle.justifyContentCenter}
        hideLeftIcon
      />
      <ScrollView style={ic.container} showsVerticalScrollIndicator={false}>
        <Card />
      </ScrollView>
    </Wrapper>
  );
};

const IdCard = withTheme(IdcardScreen);

export {IdCard};
