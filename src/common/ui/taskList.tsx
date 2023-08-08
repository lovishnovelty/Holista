import React from 'react';
import {View} from 'react-native';
import {color, app_theme, listStyle as ls} from '../../assets';
import {RegularText} from './regularText';
import IconGreen from '../../assets/images/svg/filePrimaryIcon.svg';
import {normalize} from '../../utils';
import {Icon} from './icon';

const TaskList = (props: any) => {
  const mapIcon: any = (item: any) => {
    return {
      taskTodos: (
        <IconGreen
          fill={
            props.status?.toUpperCase() === 'DUE'
              ? color.borderRed
              : app_theme.primary_color
          }
        />
      ),
      taskQuestions: (
        <Icon
          name="help-circle"
          color={
            props.status?.toUpperCase() === 'DUE'
              ? color.borderRed
              : app_theme.primary_color
          }
          size={20}
        />
      ),
      taskQnrs: (
        <Icon
          name="frequently-asked-questions"
          color={
            props.status?.toUpperCase() === 'DUE'
              ? color.borderRed
              : app_theme.primary_color
          }
          size={20}
        />
      ),
      taskMessages: (
        <Icon
          name="comment-text"
          color={
            props.status?.toUpperCase() === 'DUE'
              ? color.borderRed
              : app_theme.primary_color
          }
          size={20}
        />
      ),
    };
  };
  return (
    <View
      style={[
        ls.wrapper,
        props.style,
        !props.status && {height: normalize(60)},
      ]}>
      {props.status && (
        <RegularText
          title={props.status?.toUpperCase()}
          style={{
            fontWeight: 'bold',
            fontSize: normalize(12),
            textTransform: 'capitalize',
            color:
              props.status?.toUpperCase() === 'COMPLETED'
                ? color.accentGreen
                : props.status?.toUpperCase() === 'DUE'
                ? color.borderRed
                : color.black,
          }}
        />
      )}
      <View style={[ls.container, !props.status && {marginTop: 0}]}>
        {mapIcon(props.type)[props.type]}
        <RegularText
          line={2}
          title={props.title}
          style={[ls.default, props.textStyle]}
        />
      </View>
    </View>
  );
};

export {TaskList};
