import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {View} from 'react-native';
import {app_theme, commonStyle, taskStyle as ts} from '../../assets';
import {
  Button,
  GoBack,
  NavHeader,
  PressableText,
  RegularText,
  Wrapper,
} from '../../common/ui';
import {usePost} from '../../hooks';
import {goBack, showToast} from '../../utils';
import {useDispatch} from 'react-redux';
import {setDocIndex} from '../../redux/data/data-action';

const Task = (props: any) => {
  const questionData = useSelector((state: any) => state.data.globalQues);
  const [showButton, setSubmitButton] = useState(false);
  const dispatch = useDispatch();
  const pdfState = useSelector((state: any) => state.data.pdf);
  const docLoadingIndex = useSelector(
    (state: any) => state.data.docLoadingIndex,
  );

  const {
    id,
    name,
    isAcknowledgedRequired,
    taskTodoLink,
    status,
    episodeId,
    onClick,
    onBackClick,
    fromQuestionaire,
    currentIndex,
    totalQuestions,
    handleBack,
  } = props.data ?? props.route.params.item;

  useEffect(() => {
    if (!taskTodoLink && !isAcknowledgedRequired) {
      if (status !== 'COMPLETED') {
        onPressSubmit();
      }
    }
  }, []);

  const {doRequest} = usePost();

  const TASK_UPDATE_MESSAGE = 'Task updated successfully';

  const onPress = async () => {
    taskTodoLink && pdfState.setUri(taskTodoLink);
    taskTodoLink && setDocIndex(-2);
    const url = '/api/episodes/task/status-update';
    const body = {
      id,
      type: 'todo',
      messageTitle: null,
      episodeId,
    };
    if (!status && !isAcknowledgedRequired) {
      try {
        const result = await doRequest(url, body);
        if (result) {
          props.route.params.loadTask(props.route.params.ids.milestoneId);
          dispatch({type: 'FETCH'});
          // snackBarBottom(TASK_UPDATE_MESSAGE, 'success', true);
          // goBack();
        }
      } catch (error) {
        showToast({
          type: 'error',
          text1: 'Something went wrong',
        });
      }
    }
  };

  const onPressSubmit = async () => {
    if (fromQuestionaire) {
      setSubmitButton(true);
      return;
    }
    const url = '/api/episodes/task/status-update';
    const body = {
      id,
      type: 'todo',
      messageTitle: null,
      episodeId,
    };
    let milestoneId = props.route.params?.ids?.milestoneId
      ? props.route.params.ids.milestoneId
      : props.route.params?.item?.milestoneId;

    if (!status) {
      try {
        const result = await doRequest(url, body);
        if (result) {
          props.route.params?.loadTask &&
            props.route.params.loadTask(milestoneId);
          dispatch({type: 'FETCH'});
        }
        showToast({
          type: 'success',
          text1: TASK_UPDATE_MESSAGE,
        });
        goBack();
      } catch (error) {
        showToast({
          type: 'error',
          text1: '',
        });
      }
    }
  };
  const showSubmitButton = () => {
    let flag = true;
    if (!fromQuestionaire) {
      flag = false;
    } else if (onClick && fromQuestionaire) {
      flag = !isAcknowledgedRequired || status == 'COMPLETED' ? true : false;
    }
    return flag;
  };

  const buttonTitle = () => {
    let title = 'Submit';
    if (fromQuestionaire && totalQuestions > currentIndex) {
      title = 'Next';
    }
    return title;
  };

  return (
    <Wrapper horizontalMargin={0}>
      {!props.data && (
        <NavHeader
          title="Task"
          style={commonStyle.justifyContentCenter}
          handleBack={handleBack}
        />
      )}
      <View style={ts.container}>
        <View style={ts.info}>
          <RegularText title={name} style={ts.msg} />
          {taskTodoLink && (
            <PressableText
              title="View Information"
              style={ts.main}
              icon
              iconName="arrow-right"
              color={app_theme.primary_color}
              size={20}
              spacing={2}
              onPress={onPress}
              loading={docLoadingIndex === -2}
            />
          )}
        </View>
        <View style={ts.button}>
          {!showButton &&
            isAcknowledgedRequired &&
            status?.toUpperCase() !== 'COMPLETED' && (
              <Button title="Acknowledge" onPress={onPressSubmit} />
            )}
          {(showSubmitButton() || showButton) && (
            <Button title={buttonTitle()} onPress={onClick} />
          )}
        </View>
        {onBackClick && <GoBack onPress={() => onBackClick(questionData)} />}
      </View>
    </Wrapper>
  );
};

export {Task};
