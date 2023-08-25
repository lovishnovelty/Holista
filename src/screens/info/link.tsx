import React from 'react';
import {View, TouchableOpacity, Linking} from 'react-native';
import {app_theme, documentStyle} from '../../assets';
import {Icon, RegularText} from '../../common/ui';
import {hideLoader, normalize} from '../../utils';

const Link = ({title, link}: {title: string; link: string}) => {
  return (
    <TouchableOpacity
      style={[documentStyle.container]}
      onPress={async () => {
        await Linking.openURL(link), hideLoader();
      }}>
      <View
        style={[
          {
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'space-between',
            // justifyContent: '',
          },
        ]}>
        <View
          style={{
            flex: 9,
          }}>
          <RegularText
            title={title}
            style={{
              textAlign: 'left',
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
          }}>
          <Icon
            name={'open-in-new'}
            color={app_theme.primary_color}
            size={normalize(25)}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Link;
