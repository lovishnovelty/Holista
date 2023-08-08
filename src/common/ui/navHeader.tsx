import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';

import {color, commonStyle as cs} from '../../assets';
import {Icon} from './icon';
import {RegularText} from './regularText';
import Logo from '../../assets/images/svg/Logo.svg';
import {normalize} from '../../utils';
import {goBack} from '../../utils/navigationRef';

interface HeaderPropTypes {
  noshadow?: boolean;
  style?: StyleProp<ViewStyle>;
  title?: string;
  titleStyle?: StyleProp<TextStyle>;
  subtitle?: string;
  subtitleStyle?: StyleProp<TextStyle>;
  logo?: boolean;
  hideLeftIcon?: boolean;
  rightIconPress?: () => void;
  rightIcon?: string;
  rightIconSize?: number;
  rightIconColor?: string;
  secondRightIconPress?: () => void;
  secondRightIcon?: string;
  secondRightIconSize?: number;
  secondRightIconColor?: string;
  leftIconStyle?: StyleProp<ViewStyle>;
  userStatus?: 'online' | 'offline' | undefined;
  handleBack?: () => any;
}

const NavHeader = (props: HeaderPropTypes) => {
  const {
    noshadow,
    style,
    titleStyle,
    subtitleStyle,
    logo,
    hideLeftIcon,
    title,
    subtitle,
    rightIcon,
    secondRightIcon,
    leftIconStyle,
    userStatus,
    handleBack,
  } = props;
  return (
    <View style={[cs.headerWrapper, noshadow ? {} : cs.default, style]}>
      <View style={[cs.headerLeftIconWrapper, leftIconStyle]}>
        {logo ? (
          <View style={{paddingLeft: normalize(20)}}>
            <Logo width="26" height="42" />
          </View>
        ) : !hideLeftIcon ? (
          <TouchableOpacity onPress={handleBack ? handleBack() : goBack}>
            <Icon name="chevron-left" size={40} color={color.black} />
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </View>

      <View style={cs.headerTitleWrapper}>
        {title ? (
          <RegularText
            title={title}
            style={[
              cs.headerTitleText,
              userStatus ? {paddingHorizontal: normalize(5)} : {},
              titleStyle,
            ]}
          />
        ) : (
          <></>
        )}
        {subtitle ? (
          <RegularText title={props.subtitle} style={subtitleStyle} />
        ) : (
          <></>
        )}
        {userStatus ? (
          <Icon
            name="circle"
            color={userStatus === 'online' ? color.online : color.offline}
            size={10}
          />
        ) : (
          <></>
        )}
      </View>

      <View style={cs.headerRightIconWrapper}>
        {rightIcon ? (
          <TouchableOpacity
            onPress={props.rightIconPress}
            style={{paddingHorizontal: normalize(5)}}>
            <Icon
              name={rightIcon}
              size={props.rightIconSize ?? 40}
              color={props.rightIconColor ?? color.black}
            />
          </TouchableOpacity>
        ) : (
          <></>
        )}
        {secondRightIcon ? (
          <TouchableOpacity
            onPress={props.secondRightIconPress}
            style={{paddingHorizontal: normalize(5)}}>
            <Icon
              name={secondRightIcon}
              size={props.secondRightIconSize ?? 40}
              color={props.secondRightIconColor ?? color.black}
            />
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </View>
    </View>
  );
};

export {NavHeader};
