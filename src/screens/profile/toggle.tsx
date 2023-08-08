import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {color} from '../../assets';
import {Icon} from '../../common/ui';

const Toggle = () => {
  const [iconName, setIconName] = useState('toggle-switch-off');
  return (
    <TouchableOpacity
      disabled
      style={{marginVertical: -5}}
      onPress={() =>
        setIconName((prevState) =>
          prevState === 'toggle-switch' ? 'toggle-switch-off' : 'toggle-switch',
        )
      }>
      <Icon
        name={iconName}
        size={30}
        color={iconName === 'toggle-switch' ? color.accentGreen : color.grey}
      />
    </TouchableOpacity>
  );
};

export default Toggle;
