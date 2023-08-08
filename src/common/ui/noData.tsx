import React from 'react';
import {View} from 'react-native';
import {normalize} from '../../utils/helper';
import {Icon} from './icon';
import {RegularText} from './regularText';
import {commonStyle} from '../../assets/styles/common.style';

const NoData = ({
  title,
  icon = 'database-remove',
}: {
  title: string;
  icon: string;
}) => {
  return (
    <View style={commonStyle.alignCenter}>
      <Icon name={icon} size={normalize(70)} />
      <RegularText title={`No ${title} available`} />
    </View>
  );
};

export {NoData};
