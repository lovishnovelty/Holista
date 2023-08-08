import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {app_theme, registerStyle} from '../../assets';
import {navigate, normalize} from '../../utils';
import {RegularText} from './regularText';

const FooterText = ({type}: {type: string}) => {
  const data =
    type === 'login'
      ? {screen: 'Login', text: 'Already have an account?', title: 'Login'}
      : type === 'enroll'
      ? {screen: 'Login', text: 'Already Setup?', title: 'Login'}
      : {
          screen: 'Register',
          text: "Haven't enrolled yet?",
          title: 'Enroll now',
        };

  return (
    <TouchableOpacity onPress={() => navigate(data.screen)}>
      <View style={registerStyle.footer}>
        <RegularText title={data.text} />
        <View style={{marginHorizontal: normalize(4)}} />
        <RegularText
          title={data.title}
          style={{
            color: app_theme.primary_color,
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

export {FooterText};
