import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {color, commonStyle, questionStyle, theme} from '../../assets';
import {
  Button,
  CustomCheckBox,
  RadioButton,
  NavHeader,
  RegularText,
  Wrapper,
  GoBack,
} from '../../common/ui';
import Textarea from 'react-native-textarea';
import {postRequest} from '../../services/request';
import {goBack, navigate, normalize, ROUTES, showToast} from '../../utils';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import {
  getOptions,
  checkForOptions,
  checkUuid,
} from '../../utils/milestone-utils';

const QuestionnaireQuestion = (props: any) => {
  const [checkedList, setCheckedList] = useState<Array<any>>([]);
  const auth = useSelector((state: any) => state.auth);
  const [selected, setSelected] = useState(null);
  const [type, setType] = useState('');
  const [loading, setLoading] = useState(false);
  const {
    loadTask,
    ids,
    question: ques,
    currentTask,
    itemData,
  } = props.question ?? props.route.params;
  const initialQues = itemData?.filter(
    item => item.questions?.id === ques.id ?? false,
  );
  useEffect(() => {
    dispatch({
      type: 'SET_QUESTION',
      payload: {globalQues: {question: initialQues, index: 0}},
    });
  }, []);

  const [inputText, setInputText] = useState(null);
  const [question, setQuestion] = useState(ques);
  const [answers, setAnswers] = useState<any>([]);
  const dispatch = useDispatch();
  const [questionUuid, setQuestionUuid] = useState([
    {
      task: '',
      taskMsg: '',
      taskTodo: '',
      question: '',
      qnrs: '',
    },
  ]);
  let body: any;
  const questionData = useSelector((state: any) => state.data.globalQues);

  useEffect(() => {
    setQuestion(ques);
  }, [ques]);

  if (question?.questionType) {
    question.questionTypes = {...question?.questionType};
  }

  useEffect(() => {
    setInputText(null);
    setSelected(null);
    setCheckedList([]);
    question?.questionTypes?.code === 'TEXTFIELD'
      ? setType('input')
      : setType('choice');
    question?.ansOpt?.map(item => {
      if (item.answer?.length > 0) {
        setInputText(item.answer);
      } else {
        question?.questionTypes?.code === 'RADIO'
          ? setSelected(item.answerOptionId[0] ?? item.answerOptionId)
          : setCheckedList(prev => [
              ...prev,
              item.answerOptionId[0] ?? item.answerOptionId,
            ]);
        const list = question?.ansOpt?.map(
          (ans: any, index: number) => ans?.answerOptionId,
        );
        if (list?.length > 0) {
          const uuid = checkForOptions(
            question?.questionOptions,
            null,
            null,
            list,
          );
          props.setUuid ? props.setUuid(uuid) : setQuestionUuid(uuid);
        }
      }
    });
    ques?.status !== 'COMPLETED' && setCheckedList([]);
  }, [question]);

  const submitQuestion = (body: any) => {
    setLoading(true);
    postRequest('/api/episodes/question-answer', body)
      .then(data => {
        setLoading(false);
        showToast({
          type: 'success',
          text1: 'Question completed successfully',
        });
        if (currentTask) {
          navigate('Home');
          loadTask();
        } else {
          navigate('Milestone');
          loadTask(ids.milestoneId);
        }
      })
      .catch(err => setLoading(false));
  };

  const navigateToDependent = (
    messages: any,
    localIndex: number,
    length: number,
    body: any,
    localquestionUuid: any,
    setQuestionUuid: any,
    back?: boolean,
  ) => {
    const newData = {...messages[0], questionUuid: localquestionUuid};

    if (back) {
      dispatch({
        type: 'REMOVE_QUESTION',
        payload: {globalQues: {question: newData}},
      });
    } else {
      dispatch({
        type: 'ADD_QUESTION',
        payload: {globalQues: {question: newData, index: localIndex + 1}},
      });
    }
    const type = messages[0]?.type;

    const filteredUuid = questionUuid.filter(
      (item: any) => item.id !== localquestionUuid?.id,
    );
    switch (type) {
      case 'taskMessages':
        navigate(ROUTES[newData.type], {
          messages: newData.messages,
          status: newData.status,
          ids: {
            ...ids,
            taskId: newData.id,
          },
          onClick: () => {
            goBack();
            setQuestionUuid([...filteredUuid, {...questionUuid, taskMsg: ''}]);
            onSubmit({...localquestionUuid, taskMsg: ''}, localIndex, length);
          },
          loading: props.loading ?? loading,
          onBackClick: (questionData: any) => {
            const data = questionData.questions[questionData.index - 1];

            goBack();
            navigateToDependent(
              [data],
              data?.questionUuid?.id - 1,
              data?.questionUuid?.id,
              body,
              data?.questionUuid,
              setQuestionUuid,
              true,
            );
          },
        });
        break;

      case 'taskTodos':
        navigate(ROUTES[newData.type], {
          item: {
            ...newData,
            fromQuestionaire: true,
            onClick: () => {
              goBack();
              setQuestionUuid([
                ...filteredUuid,
                {...localquestionUuid, taskTodo: ''},
              ]);
              onSubmit(
                {...localquestionUuid, taskTodo: ''},
                localIndex,
                length,
              );
            },

            onBackClick: (questionData: any) => {
              goBack();
              const data = questionData.questions[questionData.index - 1];
              navigateToDependent(
                [data],
                data?.questionUuid?.id - 1,
                data?.questionUuid?.id,
                body,
                data?.questionUuid,
                setQuestionUuid,
                true,
              );
            },
          },
        });
        break;

      case 'taskQuestions':
        setQuestion(newData.questions);
        break;

      case 'taskQnrs':
        goBack();
        navigate(ROUTES[newData.type], {
          loadTask,
          ids,
          question: newData.qnrs,
          currentTask,
          itemData,
          body,
          type: 'question',
          onBackClick: () => {
            goBack();
          },
        });
        break;
      default:
        break;
    }
  };

  const onSubmit = (
    localquestionUuid: any,
    localIndex: number,
    length: number,
  ) => {
    const ans = {
      ...ids,
      taskType: 'question',
      questionName: question.question,
      isDependent: false,
      questionId: question.id,
      questionType: question?.questionTypes.code,
      answer: inputText,
      answerOptionId: selected ? [selected] : checkedList,
    };
    const ansData = [...answers].concat(ans);
    setAnswers([...ansData]);
    body = {
      ...ids,
      type: 'question',
      taskName: question.question,
      answers: [...ansData],
    };
    let filteredData = itemData?.filter(
      (item: any) =>
        item?.isDependent && checkUuid([localquestionUuid], item?.uuid),
    );
    if (localquestionUuid.taskMsg) {
      const messages = filteredData.filter(
        (item: any) => item.type === 'taskMessages',
      );

      if (+auth.userData.data.id === +messages[0]?.messageTo) {
        navigateToDependent(
          messages,
          localIndex,
          length,
          body,
          localquestionUuid,
          setQuestionUuid,
          false,
        );
      } else {
        onSubmit({...localquestionUuid, taskMsg: ''}, localIndex, length);
      }
    } else if (localquestionUuid.taskTodo) {
      const messages = filteredData.filter(item => item.type === 'taskTodos');
      if (+auth.userData.data.id === +messages[0]?.assignedTo) {
        navigateToDependent(
          messages,
          localIndex,
          length,
          body,
          localquestionUuid,
          setQuestionUuid,
        );
      } else {
        onSubmit({...localquestionUuid, taskTodo: ''}, localIndex, length);
      }
    } else if (localquestionUuid.task) {
      const messages = filteredData.filter(
        (item: any) => item.type === 'taskQuestions',
      );
      navigateToDependent(
        messages,
        localIndex,
        length,
        body,
        localquestionUuid,
        setQuestionUuid,
      );
    } else if (localquestionUuid.qnrs) {
      const messages = filteredData.filter(
        (item: any) => item.type === 'taskQnrs',
      );
      if (messages.length) {
        navigateToDependent(
          messages,
          localIndex,
          length,
          body,
          localquestionUuid,
          setQuestionUuid,
        );
      } else {
        submitQuestion(body);
      }
    } else {
      if (localIndex + 1 === length) {
        submitQuestion(body);
      }
    }
  };

  const handleCheckBoxClick = (val: any) => {
    let list = checkedList.filter(item => item);
    list = list.includes(val.value)
      ? [...list.filter(value => value !== val.value)]
      : [...list, val.value];
    setCheckedList(list);
    checkForOptions(
      question?.questionOptions,
      null,
      (uuid: any) =>
        props.setUuid ? props.setUuid(uuid) : setQuestionUuid(uuid),
      list,
    );
  };

  return (
    <Wrapper horizontalMargin={0}>
      {props.type !== 'qnrs' && (
        <NavHeader title="Questions" style={commonStyle.centerHeaderWrapper} />
      )}
      <KeyboardAwareScrollView
        scrollEnabled={true}
        enableOnAndroid={true}
        enableAutomaticScroll={true}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode={'none'}
        contentContainerStyle={{flexGrow: 1}}>
        <View style={questionStyle.container}>
          <View style={questionStyle.textContainer}>
            <RegularText
              title={question.question}
              style={{fontSize: normalize(theme.size.xxl)}}
            />
            <RegularText
              title={question.questionHelp}
              style={{fontSize: normalize(theme.size.sm)}}
            />
          </View>
          {question?.questionTypes?.code === 'RADIO' ? (
            <RadioButton
              options={getOptions(question?.questionOptions)}
              onValueChange={(val, uuid) => {
                setSelected(val);
                props.setUuid
                  ? props.setUuid([{...uuid}])
                  : setQuestionUuid([{...uuid}]);
              }}
              selected={selected}
            />
          ) : question?.questionTypes?.code === 'CHECKBOX' ? (
            getOptions(question?.questionOptions).map((val, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    handleCheckBoxClick(val);
                  }}
                  style={questionStyle.checkboxContainer}>
                  <CustomCheckBox
                    onValueChange={() => handleCheckBoxClick(val)}
                    isSelected={checkedList.includes(val.value)}
                  />
                  <Text style={questionStyle.label}>{val.label}</Text>
                </TouchableOpacity>
              );
            })
          ) : (
            <Textarea
              defaultValue={inputText}
              onChangeText={setInputText}
              maxLength={200}
              placeholder={'Answer'}
              placeholderTextColor={color.textArea}
              style={questionStyle.textarea}
              containerStyle={questionStyle.textareaContainer}
            />
          )}
          <View style={questionStyle.submitContainer}>
            <Button
              title={props.type !== 'qnrs' ? 'Submit' : props.buttonTitle}
              onPress={() => {
                inputText || selected || checkedList[0]
                  ? props.type !== 'qnrs'
                    ? questionUuid.map((uuid, index) =>
                        onSubmit(uuid, index, questionUuid.length),
                      )
                    : props.onNext({
                        ...ids,
                        answer: inputText,
                        answerOptionId: selected ? [selected] : checkedList,
                        isDependent: false,
                        questionName: question.question,
                        questionType: question?.questionTypes?.code,
                        taskType: 'questionnaire',
                        questionId: question.id,
                      })
                  : showToast({
                      type: 'error',
                      text1: `${
                        type === 'input'
                          ? 'Please fill the input box'
                          : 'Please select an option'
                      }`,
                    });
              }}
              spinner={props.loading ?? loading}
            />
          </View>
          {questionData?.index > 0 && (
            <GoBack
              onPress={() => {
                const data = questionData.questions[questionData.index - 1];
                navigateToDependent(
                  [data],
                  data?.questionUuid?.id - 1,
                  data?.questionUuid?.id,
                  body,
                  data?.questionUuid,
                  setQuestionUuid,
                  true,
                );
              }}
            />
          )}
        </View>
      </KeyboardAwareScrollView>
    </Wrapper>
  );
};

export {QuestionnaireQuestion};
