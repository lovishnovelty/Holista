import React from 'react';
import {TouchableOpacity} from 'react-native';
import {milestoneStyle} from '../../assets';
import {TaskList} from '../../common/ui';
import {getBorderColor, getColor} from '../../utils';

const MilestoneItem = ({item, onPress}: {item: any; onPress: () => any}) => {
  return (
    <TouchableOpacity
      style={[
        milestoneStyle.listItem,
        {
          backgroundColor: getColor(item.status),
          borderLeftColor: getBorderColor(item.status),
        },
      ]}
      onPress={onPress}>
      <TaskList
        status={item.status}
        textStyle={{
          width: '90%',
          textAlign: 'left',
        }}
        title={
          item?.name ??
          item?.messages ??
          item?.questions?.question ??
          item?.qnrs?.name
        }
        type={item.type}
        style={{
          backgroundColor: getColor(item.status),
          borderLeftColor: getBorderColor(item.status),
        }}
      />
    </TouchableOpacity>
  );
};

export {MilestoneItem};
