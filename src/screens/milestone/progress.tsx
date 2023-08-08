import React from 'react';
import {View, Text} from 'react-native';
import {color, questionnaireStyle as qs} from '../../assets';

const Progress = ({
  totalQuestions,
  completedQuestions,
}: {
  totalQuestions: number;
  completedQuestions: number;
}) => {
  return (
    <View style={qs.progressContainer}>
      {[...Array(totalQuestions)].map((item, index) => (
        <View
          key={index}
          style={[
            qs.progressItem,
            {
              backgroundColor:
                completedQuestions > index
                  ? color.accentGreen
                  : color.borderBottom,
            },
          ]}></View>
      ))}
    </View>
  );
};

export default Progress;
