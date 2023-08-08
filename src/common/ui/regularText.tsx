import React from 'react';
import {Text} from 'react-native';
import {regularTextStyle as rs} from '../../assets';

const RegularText = (props: any) => {
  return (
    <Text numberOfLines={props.line} style={[rs.default, props.style]}>
      {props.title}
    </Text>
  );
};

export {RegularText};
