import React, {useEffect} from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import {commonStyle, questionStyle, theme} from '../../assets';
import {Button, GoBack, NavHeader, RegularText} from '../../common/ui';
import {normalize, showToast} from '../../utils';
import {postRequest} from '../../services/request';

const MessagePage = (props: any) => {
  const questionData = useSelector((state: any) => state.data.globalQues);
  const {
    messages,
    onClick,
    loading,
    onBackClick,
    status,
    ids,
    getLatestMilestone,
  } = props.data ?? props.route.params;

  useEffect(() => {
    if (status !== 'COMPLETED') {
      updateMessageStatus();
    }
  }, []);

  const updateMessageStatus = async () => {
    const body = {
      episodeId: ids.episodeId,
      id: ids.taskId,
      messageTitle: messages,
      milestoneId: ids.milestoneId,
      type: 'message',
    };
    try {
      await postRequest('/api/episodes/task/status-update', body);
      setTimeout(() => {
        showToast({
          type: 'success',
          text1: 'Message updated successfully',
        });
      }, 1000);
      getLatestMilestone();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {!props.data && (
        <NavHeader title="Message" style={commonStyle.centerHeaderWrapper} />
      )}
      <View style={questionStyle.messageContainer}>
        <RegularText
          title={messages}
          style={{fontSize: normalize(theme.size.xxl)}}
        />
        {onClick && (
          <Button spinner={loading} title="Submit" onPress={onClick} />
        )}
      </View>
      {onBackClick && <GoBack onPress={() => onBackClick(questionData)} />}
    </>
  );
};

export {MessagePage};
