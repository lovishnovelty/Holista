import React from 'react';
import {Text, View} from 'react-native';
import {color, commonStyle, theme, app_theme} from '../assets';
import {normalize} from '../utils';
import Info from '../assets/images/svg/info';
import Mission from '../assets/images/svg/mission';
import IdCard from '../assets/images/svg/id-card';
import Communication from '../assets/images/svg/communicationIcon.svg';

const IconComponent = ({
  icon,
  text,
  focused,
}: {
  icon: string;
  text?: string;
  focused: boolean;
}) => {
  const iconColor = focused ? app_theme.primary_color : color.grey;
  const textColor = focused ? color.darkBlack : color.grey;

  return icon === 'home' ? (
    <View></View>
  ) : (
    <View style={commonStyle.tabContainer}>
      {icon === 'smart-card' && (
        <IdCard
          fill_a={focused ? app_theme.primary_color : color.grey}
          fill_b={focused ? color.buttonBackground : color.grey}
          fill_c={focused ? color.accentGreen : color.grey}
          height={normalize(theme.size.lg)}
        />
      )}
      {icon === 'hand-heart' && (
        <Info
          fill_a={focused ? app_theme.primary_color : color.grey}
          fill_b={focused ? color.buttonBackground : color.grey}
          fill_c={focused ? color.accentGreen : color.grey}
          height={normalize(theme.size.lg)}
        />
      )}
      {icon === 'cellphone-iphone' && (
        <Communication
          fill_a={focused ? app_theme.primary_color : color.grey}
          fill_c={focused ? color.accentGreen : color.grey}
          height={normalize(theme.size.lg)}
        />
      )}
      {icon === 'image-filter-hdr' && (
        <Mission
          fill_a={focused ? app_theme.primary_color : color.grey}
          fill_b={focused ? color.buttonBackground : color.grey}
          fill_c={focused ? color.accentGreen : color.grey}
          height={normalize(theme.size.lg)}
        />
      )}
      {text && (
        <Text
          style={[
            commonStyle.icon,
            {
              color: textColor,
            },
          ]}>
          {text}
        </Text>
      )}
    </View>
  );
};

export default IconComponent;
