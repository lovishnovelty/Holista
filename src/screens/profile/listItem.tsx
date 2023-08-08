import React from 'react';
import {View} from 'react-native';
import {app_theme, listItemStyle} from '../../assets';
import {Icon, RegularText} from '../../common/ui';
import Toggle from './toggle';

const ListItem = ({
  icon,
  keyname,
  value,
}: {
  icon: string;
  keyname: string;
  value?: string;
}) => {
  return (
    <View style={listItemStyle.container}>
      <Icon name={icon} size={18} color={app_theme.primary_color} />
      <View style={listItemStyle.key}>
        <RegularText title={keyname} style={{textAlign: 'left'}} />
      </View>
      <View style={listItemStyle.value}>
        {icon === 'message-text' && <Toggle />}
        {value && <RegularText title={value} style={{textAlign: 'left'}} />}
      </View>
    </View>
  );
};

export default ListItem;
