import React from 'react';
import {View} from 'react-native';
import {color} from '../../../assets';
import {RegularText} from '../../../common/ui';
import {normalize} from '../../../utils';

const CardItem = ({item}: any) => {
  return (
    <View
      style={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {item.icon}
      <RegularText
        title={item.label}
        style={{color: color.textBig, marginTop: normalize(19.4)}}
      />
    </View>
  );
};

export {CardItem};
