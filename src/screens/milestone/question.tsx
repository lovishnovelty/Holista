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
import {goBack, navigate, normalize, ROUTES, snackBarBottom} from '../../utils';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import {useAsyncState} from '../../hooks';
import {getOptions, checkForOptions} from '../../utils/milestone-utils';
import {Task} from '../task/task';
import {MessagePage} from './messagePage';

const Question = (props: any) => {
  const [checkedList, setCheckedList] = useState<Array<any>>([]);
  // const auth = useSelector((state: any) => state.auth);
  const [selected, setSelected] = useState(null);
  const [type, setType] = useState('');
  const [activeQuestion, setActiveQuestion] = useState<any>({
    questionType: 'taskQuestion',
    question: [],
  });
  const [btnTitle, setBtnTitle] = useState('Submit');
  const [questionList, setQuestionList] = useAsyncState([]);
  const [index, setIndex] = useAsyncState(0);
  const [loading, setLoading] = useState(false);
  const {loadTask, ids, question: ques, currentTask, itemData} =
    props.question ?? props.route.params;

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
  // const questionData = useSelector((state: any) => state.data.globalQues);
  const initialQues = itemData?.filter(
    (item) => item.questions?.id === ques.id ?? false,
  );
  useEffect(() => {
    setActiveQuestion({
      ...activeQuestion,
      question: [...initialQues],
    });
    setQuestionList(initialQues);

    dispatch({
      type: 'SET_QUESTION',
      payload: {globalQues: {question: initialQues, index: 0}},
    });
    return () => {
      setQuestionList([]);
      setIndex(0);
      setAnswers([]);
    };
  }, []);

  useEffect(() => {
    if (index > 0) {
      if (questionList[index]?.questions?.ansOpt.length > 0) {
        let selectedOptionIds = questionList[index]?.questions?.ansOpt.map(
          (selectedOption: any) => selectedOption.answerOptionId,
        );
        setCheckedList(selectedOptionIds ?? []);
      }
    } else if (
      questionList[index] &&
      questionList[index]?.type == 'taskQuestions'
    ) {
      const questionAns = answers.find((x) => {
        return x.questionId == questionList[index]?.questions.id;
      });
      const checkedList = questionAns ? questionAns.answerOptionId : [];
      setCheckedList(checkedList);
    }
  }, [index]);

  useEffect(() => {
    setQuestion(ques);
  }, [ques]);

  if (question?.questionType) {
    question.questionTypes = {...question?.questionType};
  }

  const persistQuestionAnswerOnBack = (currentIndex?: number) => {
    answers.forEach((ans: any) => {
      const answer = ans.answerOptionId;
      if (ans.questionId == questionList[currentIndex ?? index].questions.id) {
        setCheckedList(answer ?? []);
      }
    });
  };

  useEffect(() => {
    setIndex(0);
    setInputText(null);
    setSelected(null);
    setCheckedList([]);
    question?.questionTypes?.code === 'TEXTFIELD'
      ? setType('input')
      : setType('choice');
    question?.ansOpt?.map((item) => {
      if (item.answer?.length > 0) {
        setInputText(item.answer);
      } else {
        question?.questionTypes?.code === 'RADIO'
          ? setSelected(item.answerOptionId[0] ?? item.answerOptionId)
          : setCheckedList((prev) => [
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
    question?.status !== 'COMPLETED' && setCheckedList([]);
  }, [question]);

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

  const submitQuestion = (body: any) => {
    setLoading(true);
    postRequest('/api/episodes/question-answer', body)
      .then((data) => {
        setLoading(false);
        snackBarBottom('Question completed successfully', 'success', true);
        if (currentTask) {
          navigate('Home');
          loadTask();
        } else {
          navigate('Milestone');
          loadTask(ids.milestoneId);
        }
      })
      .catch((err) => setLoading(false));
  };

  const getDependentQuestion = (dependentTaksId: any) => {
    return itemData.find((x: any) => x.uuid == dependentTaksId);
  };

  const dependentTaskId = (option: any) => {
    if (option.taskQuesUuid) {
      return option.taskQuesUuid;
    } else if (option.taskTodoUuid) {
      return option.taskTodoUuid;
    } else if (option.taskMessageUuid) {
      return option.taskMessageUuid;
    } else if (option.taskQnrsUuid) {
      return option.taskQnrsUuid;
    }
  };

  const findDepedentQuestion = (callback: (flag: boolean) => any) => {
    let questionsToRemove: any = [];
    let hasDependent = false;
    const uncheckedOptions = questionList[index][
      'questions'
    ]?.questionOptions.filter((x: any) => {
      return !checkedList.includes(x.id);
    });
    if (uncheckedOptions.length > 0) {
      uncheckedOptions.forEach((option: any) => {
        const id = dependentTaskId(option);
        const question = getDependentQuestion(id);
        question && questionsToRemove.push(question);
      });
    }
    // console.log('checkedList', checkedList, questionsToRemove);
    if (questionList[index].type == 'taskQuestions') {
      checkedList.forEach((x: number) => {
        questionList[index]['questions']?.questionOptions.forEach((y: any) => {
          if (x == y.id) {
            const id = dependentTaskId(y);
            const dependentQuestion = getDependentQuestion(id);
            if (id && dependentQuestion) {
              hasDependent = true;
              const depQuestionIndex = questionList.findIndex(
                (x: any) => x.id == dependentQuestion?.id,
              );
              if (depQuestionIndex < 0) {
                questionList.push(getDependentQuestion(id));
              }
            }
          }
        });
      });
      if (hasDependent) {
        setCheckedList([]);
        const updatedQuestions = removeDuplicateQuestions(questionsToRemove);
        setQuestionList([...updatedQuestions]).then((res: any) => {
          setIndex(index + 1).then((latestIndex: number) => {
            latestIndex + 1 == questionList.length
              ? setBtnTitle('Submit')
              : setBtnTitle('Next');
          });
        });
      }

      callback(hasDependent);
    }
  };

  const removeDuplicateQuestions = (questionToRemove: any[]) => {
    const removeQuestionIds = questionToRemove.map((x) => x.id);
    const newQuestions = questionList.filter((x: any) => {
      return !removeQuestionIds.includes(x.id);
    });
    return newQuestions;
  };

  const onSubmit = (
    localquestionUuid: any,
    localIndex: number,
    length: number,
  ) => {
    findDepedentQuestion((hasDependency: boolean) => {
      const ans = {
        ...ids,
        taskType: 'question',
        questionName: questionList[index].questions.question,
        isDependent: false,
        questionId: questionList[index].questions.id,
        questionType: questionList[index].questions?.questionTypes.code,
        answer: inputText,
        answerOptionId: selected ? [selected] : checkedList,
      };
      const i = answers.findIndex(
        (x: any) => x.questionId == questionList[index].questions.id,
      );
      let ansData = [];
      if (i < 0) {
        ansData = [...answers].concat(ans);
        setAnswers([...ansData]);
      } else {
        answers[i].answerOptionId = checkedList;
        setAnswers([...answers]);
      }
      if (!hasDependency && index + 1 == questionList.length) {
        body = {
          ...ids,
          type: 'question',
          taskName: question.question,
          answers: [...ansData],
        };
        submitQuestion(body);
      }
    });
  };

  const handleCheckBoxClick = (val: any) => {
    let list = checkedList.filter((item) => item);
    list = list.includes(val.value)
      ? [
          ...list.filter((value) => {
            return value !== val.value;
          }),
        ]
      : [...list, val.value];
    setCheckedList(list);
    checkForOptions(
      questionList[index]?.questions.questionOptions,
      null,
      (uuid: any) =>
        props.setUuid ? props.setUuid(uuid) : setQuestionUuid(uuid),
      list,
    );
  };

  // props.type !== 'qnrs' ? 'Submit' : props.buttonTitle
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
          {questionList[index]?.type == 'taskQuestions' ? (
            <>
              <View style={questionStyle.textContainer}>
                <RegularText
                  title={questionList[index].questions.question}
                  style={{fontSize: normalize(theme.size.xxl)}}
                />
                <RegularText
                  title={question.questionHelp}
                  style={{fontSize: normalize(theme.size.sm)}}
                />
              </View>
              {question?.questionTypes?.code === 'RADIO' ? (
                <RadioButton
                  options={getOptions(
                    questionList[index].questions?.questionOptions,
                  )}
                  onValueChange={(val, uuid) => {
                    setSelected(val);
                    props.setUuid
                      ? props.setUuid([{...uuid}])
                      : setQuestionUuid([{...uuid}]);
                  }}
                  selected={selected}
                />
              ) : questionList[index].questions?.questionTypes?.code ===
                'CHECKBOX' ? (
                getOptions(questionList[index].questions?.questionOptions).map(
                  (val, index) => {
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
                  },
                )
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
                  title={btnTitle}
                  onPress={() => {
                    inputText || selected || checkedList[0]
                      ? props.type !== 'qnrs'
                        ? questionUuid.map((uuid, index) => {
                            onSubmit(uuid, index, questionUuid.length);
                          })
                        : setIndex(index + 1)
                      : snackBarBottom(
                          `${
                            type === 'input'
                              ? 'Please fill the input box'
                              : 'Please select an option'
                          }`,
                          'error',
                          true,
                        );
                  }}
                  spinner={loading ?? loading}
                />
              </View>
            </>
          ) : (
            <>
              {questionList[index]?.type == 'taskMessages' && (
                <MessagePage
                  data={{
                    messages: questionList[index].messages,
                    onClick: () => {
                      if (index + 1 == questionList.length) {
                        let body = {
                          ...ids,
                          type: 'question',
                          taskName: question.question,
                          answers: [...answers],
                        };
                        submitQuestion(body);
                      } else {
                        if (index + 1 == questionList.length) {
                          submitQuestion(body);
                        } else {
                          setIndex(index + 1).then((latestIndex: number) => {
                            latestIndex + 1 == questionList.length
                              ? setBtnTitle('Submit')
                              : setBtnTitle('Next');
                          });
                        }
                      }
                    },
                  }}
                />
              )}
              {questionList[index]?.type == 'taskTodos' && (
                <Task
                  data={{
                    fromQuestionaire: true,
                    name: questionList[index].name,
                    currentIndex: index + 1,
                    totalQuestions: questionList.length,
                    taskTodoLink: questionList[index].taskTodoLink,
                    isAcknowledgedRequired:
                      questionList[index].isAcknowledgedRequired,
                    status: questionList[index].status,
                    onClick: () => {
                      if (index + 1 == questionList.length) {
                        let body = {
                          ...ids,
                          type: 'question',
                          taskName: question.question,
                          answers: [...answers],
                        };
                        submitQuestion(body);
                      } else {
                        setIndex(index + 1).then((latestIndex: number) => {
                          latestIndex + 1 == questionList.length
                            ? setBtnTitle('Submit')
                            : setBtnTitle('Next');
                        });
                      }
                    },
                  }}
                />
              )}
            </>
          )}
          {index > 0 && (
            <GoBack
              onPress={() => {
                setIndex(index - 1).then((currentIndex: any) => {
                  persistQuestionAnswerOnBack(currentIndex);
                });
              }}
            />
          )}
        </View>
      </KeyboardAwareScrollView>
    </Wrapper>
  );
};

export {Question};
