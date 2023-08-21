import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import {commonStyle, questionnaireStyle as qs} from '../../assets';
import {GoBack, NavHeader, RegularText, Wrapper} from '../../common/ui';
import {postRequest} from '../../services/request';
import {navigate, showToast} from '../../utils';
import {checkForDependent, checkForOptions} from '../../utils/milestone-utils';
import {Task} from '../task/task';
import {MessagePage} from './messagePage';
import Progress from './progress';
import {QuestionnaireQuestion} from './questionnaireQuestion';

const Questionnaire = (props: any) => {
  const {loadTask, ids, question, itemData, currentTask, body, onBackClick} =
    props.route.params;
  const [index, setIndex] = useState(0);

  const [uuid, setUuid] = useState([
    {
      question: '',
      task: '',
      taskMsg: '',
      taskTodo: '',
      qnrs: '',
    },
  ]);

  const [questions, setQuestions] = useState(question.qnrsQues);
  const auth = useSelector((state: any) => state.auth);
  const [answers, setAnswers] = useState<Array<any>>(
    body?.answers ? [...body?.answers] : [],
  );
  const [loading, setLoading] = useState(false);
  const onSubmit = async (answers: any[]) => {
    try {
      let submitBody = {
        ...ids,
        type: body?.type ?? 'questionnaire',
        taskName: body?.questionName ?? question?.name,
        answers: [...answers],
      };
      setLoading(true);
      await postRequest('/api/episodes/question-answer', submitBody);
      showToast({
        type: 'success',
        text1: 'Questionnaire completed successfully',
      });
      if (currentTask) {
        navigate('Home');
        loadTask();
      } else {
        navigate('Milestone');
        loadTask(ids.milestoneId);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    let extra: any = {data: [...questions], index: 0};
    extra.data.map((ques: any, index: number) => {
      if (ques?.question?.ansOpt) {
        const list = ques?.question?.ansOpt?.map(
          (ans: any, index: number) => ans?.answerOptionId,
        );
        if (list.length > 0) {
          const uuid = checkForOptions(
            ques?.question?.questionOptions,
            null,
            null,
            list,
          );
          uuid.length > 0 &&
            checkForDependent(
              extra.data,
              uuid,
              itemData,
              auth.userData.data.id,
              extra,
              index,
            );
        }
      }
    });
    setQuestions(extra.data);
  }, []);

  return (
    <Wrapper horizontalMargin={0}>
      <NavHeader
        title="Questionnaire"
        style={commonStyle.centerHeaderWrapper}
      />
      <View style={commonStyle.center}>
        <RegularText
          title={`${index + 1 < 10 ? 0 : ''}${index + 1}/${
            questions.length < 10 ? 0 : ''
          }${questions.length}`}
          style={qs.progressText}
        />
      </View>
      <Progress
        totalQuestions={questions.length}
        completedQuestions={index + 1}
      />
      <View style={{height: '80%', justifyContent: 'flex-start'}}>
        {questions[index]?.question || questions[index]?.questions ? (
          <QuestionnaireQuestion
            type="qnrs"
            question={{
              question: questions[index].questions ?? questions[index].question,
              ids,
            }}
            setUuid={setUuid}
            loading={loading}
            buttonTitle={index + 1 === questions.length ? 'Submit' : 'Next'}
            onNext={(answer: any) => {
              const options = answer?.answerOptionId.filter(
                item => item !== undefined,
              );
              const quesCopy = [...questions];
              quesCopy[index]?.question &&
                (quesCopy[index].question.ansOpt = [{...answer}]);
              setQuestions([...quesCopy]);
              let ansCopy: any[] = [...answers];
              ansCopy[ansCopy.length] = {...answer};
              setAnswers([...ansCopy]);
              if (index < questions.length - 1) {
                checkForDependent(
                  questions,
                  uuid,
                  itemData,
                  auth.userData.data.id,
                  null,
                  index,
                  setQuestions,
                  setUuid,
                  (hasDependent: boolean) => {
                    if (hasDependent || index + 1 != questions.length) {
                      setIndex(prev => prev + 1);
                    } else {
                      onSubmit(ansCopy);
                    }
                  },
                );
              } else {
                checkForDependent(
                  questions,
                  uuid,
                  itemData,
                  auth.userData.data.id,
                  null,
                  index,
                  setQuestions,
                  setUuid,
                  (hasDependent: boolean) => {
                    if (hasDependent) {
                      setIndex(prev => prev + 1);
                    } else {
                      onSubmit(ansCopy);
                    }
                  },
                );
              }
            }}
          />
        ) : (
          <>
            {questions[index]?.type === 'taskMessages' && (
              <MessagePage
                data={{
                  messages: questions[index].messages,
                  onClick: () => {
                    if (index + 1 == questions.length) {
                      onSubmit(answers);
                    } else {
                      setIndex(prev => prev + 1),
                        checkForDependent(
                          questions,
                          uuid,
                          itemData,
                          auth.userData.data.id,
                          null,
                          index,
                          setQuestions,
                          setUuid,
                        );
                    }
                  },
                }}
              />
            )}
            {questions[index]?.type === 'taskTodos' && (
              <Task
                data={{
                  fromQuestionaire: true,
                  name: questions[index].name,
                  currentIndex: index + 1,
                  totalQuestions: questions.length,
                  taskTodoLink: questions[index].taskTodoLink,
                  isAcknowledgedRequired:
                    questions[index].isAcknowledgedRequired,
                  status: questions[index].status,
                  onClick: () => {
                    if (index + 1 == questions.length) {
                      onSubmit(answers);
                    } else {
                      setIndex(prev => prev + 1),
                        checkForDependent(
                          questions,
                          uuid,
                          itemData,
                          auth.userData.data.id,
                          null,
                          index,
                          setQuestions,
                          setUuid,
                        );
                    }
                  },
                }}
              />
            )}
          </>
        )}
        {(onBackClick || index > 0) && (
          <GoBack
            onPress={() => {
              index > 0 ? setIndex(index - 1) : onBackClick();
            }}
          />
        )}
      </View>
    </Wrapper>
  );
};

export {Questionnaire};
