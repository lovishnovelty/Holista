import React from 'react';
import {TextInput} from 'react-native';
import {commonStyle as cs, otpStyle as os} from '../../assets';
import {color} from '../../assets/theme';
import {InputInterface} from '../../interface';

const Box = React.forwardRef(({value, ...props}: InputInterface, ref: any) => {
  return (
    <>
      <TextInput ref={ref} {...props} value={value} style={os.boxStyle} />
    </>
  );
});

export {Box};
