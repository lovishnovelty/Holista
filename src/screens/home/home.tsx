import React, {useState, useEffect, useContext} from 'react';
import {View, Text, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import {useSelector} from 'react-redux';

import withTheme from '../../hoc/withTheme';
import {
  CustumModal as Modal,
  RegularText,
  BoldText,
  Wrapper,
  NavHeader,
  Icon,
  Card,
  Button,
  TaskPlaceHolder,
  Desclamier,
} from '../../common/ui';
import {
  getLocalData,
  isKeyExist,
  createSecureKeys,
  biometricPrompt,
  storeLocalData,
  isBiometricAvailable,
  normalize,
  navigate,
  transformCurrentTask,
  ROUTES,
  getBlockNavigation,
  showToast,
} from '../../utils';
import {color, dashboardStyle as ds, theme, app_theme} from '../../assets';
import {useFetch} from '../../hooks';
import Comment from '../../assets/images/svg/comment.svg';
import {MilestoneItem} from '../milestone/milestoneItem';
import {AuthContext} from '../../context';

let biometricSetup: any = null;
const HomeScreen = () => {
  const flag: any = useSelector<any>(state => state.flag);
  const {state, dispatch} = useContext(AuthContext);

  const [showDisclaimer, setShowDisclaimer] = useState<boolean>(false);
  const [attribute, setAttribute] = useState<any>({
    isVisible: true,
  });
  const user = useSelector((state: any) => state.auth);
  const name =
    user.userData?.data?.firstName +
    ' ' +
    (user.userData?.data?.lastName ?? '');

  const {loading, doRequest} = useFetch();
  const [task, setTask] = useState<any>([]);
  const blockNavigations = getBlockNavigation();

  useEffect(() => {
    fetchTasks();
  }, [flag.fetch]);

  const fetchTasks = async () => {
    const url = '/api/episodes/current-tasks';
    const result = await doRequest(url);
    if (result?.tasks) {
      const tasks = transformCurrentTask(result.tasks);
      setTask(tasks);
    }
  };
  useEffect(() => {
    const checkDisclaimed = async () => {
      const isviewedd = !!(await getLocalData('isDisclaimerViewed'));
      console.log(
        isviewedd,
        'issss???????',
        await getLocalData('isDisclaimerViewed'),
      );
      if (!isviewedd) {
        dispatch({
          type: 'LOAD_DISCLAIMER',
          payload: true,
        });
        setShowDisclaimer(true);
      }
    };
    checkDisclaimed();
  }, []);

  useEffect(() => {
    (async () => {
      biometricSetup = await getLocalData('biometricSetup');
      const isDeviceSupportBiometric = async () => {
        try {
          const result: any = await isBiometricAvailable();
          if (result) {
            if (!state.disclaimer && !biometricSetup) {
              dispatch({
                type: 'BIOMETRIC',
                payload: {biometric: true},
              });
            }
          }
        } catch (error) {}
      };

      const checkBiometricConfigured = async () => {
        try {
          const keys: any = await isKeyExist();
          if (!keys) {
            isDeviceSupportBiometric();
          } else {
            if (!biometricSetup && !state.disclaimer) {
              // also open the biometric if logged in user and biometric setupped user is different
              dispatch({
                type: 'BIOMETRIC',
                payload: {
                  biometric: true,
                },
              });
            }
          }
        } catch (error) {}
      };
      if (user.isSignedIn) {
        const biometricAvailable = await isBiometricAvailable();
        if (biometricAvailable) {
          checkBiometricConfigured();
        }
      }
    })();
  }, [user.isSignedIn]);

  const configureBiometricAuth = async () => {
    try {
      const localUser: any = await getLocalData('user');
      const keys: any = await isKeyExist();

      if (!keys) {
        await createSecureKeys();
      }
      const result = await biometricPrompt();
      if (result) {
        await storeLocalData('biometricSetup', localUser);
        dispatch({
          type: 'BIOMETRIC',
          payload: {biometric: false},
        });
        showToast({
          type: 'success',
          text1: 'Biometric setup successful',
        });
      }
    } catch (e) {
      console.log('Error while setting up biometric login', e);
    }
  };

  const handleModalClick = (val: boolean) => {
    if (val) {
      configureBiometricAuth();
    } else {
      dispatch({
        type: 'BIOMETRIC',
        payload: {biometric: val},
      });
    }
  };

  const getTaskHeight = (taskLength: number) => {
    taskLength = loading ? 3 : attribute.isVisible ? taskLength : 0;
    switch (taskLength) {
      case 0:
        return '5%';
      case 1:
        return '12%';
      case 2:
        return '22%';
      default:
        return '35%';
    }
  };

  const renderNavigation = (item: any, index: number) => {
    return (
      <Card
        key={index}
        disabled={false}
        onHandlePress={() => navigate(item.navigate)}
        styles={ds.blockNavigation}>
        {item.icon}
        <RegularText
          title={item.title}
          style={{
            marginTop: normalize(19.4),
          }}
        />
      </Card>
    );
  };

  const onPress = async (val: boolean) => {
    if (val) {
      await storeLocalData('disclaimer', 'true');
    }
    const result = await isBiometricAvailable();
    const localBiometricData = await getLocalData('biometricSetup');
    const biometricSetup = result && !localBiometricData;
    dispatch({
      type: 'SET_DISCLAIMER',
      payload: {
        disclaimer: false,
        biometric: biometricSetup || false,
        isDisclaimerViewed: false,
      },
    });
  };

  return (
    <Wrapper horizontalMargin={0}>
      <NavHeader
        logo={true}
        rightIcon="account-circle"
        rightIconColor={app_theme.primary_color}
        rightIconSize={35}
        rightIconPress={() => navigate('Profile')}
        title={name ?? 'Guest User'}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={ds.container}>
          <View style={ds.body}>
            {/* <View style={ds.disclamier}>
              <Icon name="alert" color={color.white} />
              <View style={{flex: 1, marginLeft: normalize(10)}}>
                <RegularText
                  title="DISCLAIMER: This portal does not provide medical advice"
                  style={{textAlign: 'left', color: color.white}}
                />
              </View>
              <TouchableOpacity
                style={{flex: 0.4}}
                onPress={() =>
                  dispatch({
                    type: 'LOAD_DISCLAIMER',
                    payload: true,
                  })
                }>
                <RegularText title="Learn more" style={ds.learnMore} />
              </TouchableOpacity>
            </View> */}
            <TouchableOpacity
              style={ds.task}
              onPress={() => {
                setAttribute({...attribute, isVisible: !attribute.isVisible});
                fetchTasks();
              }}>
              <RegularText
                title="Current Task"
                style={{
                  fontSize: normalize(theme.size.base),
                }}
              />
              <Icon
                name={attribute?.isVisible ? 'chevron-up' : 'chevron-down'}
                color={color.arrow}
                size={25}
              />
            </TouchableOpacity>
            <View style={[ds.currentTaskWrapper]}>
              {attribute?.isVisible && (
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  nestedScrollEnabled={true}
                  style={[ds.current, {maxHeight: normalize(250)}]}>
                  {!loading ? (
                    task.length > 0 ? (
                      <FlatList
                        data={task}
                        renderItem={({item, index}) => {
                          return (
                            !item.isDependent && (
                              <MilestoneItem
                                key={index}
                                item={item}
                                onPress={() => {
                                  Object.assign(item, {
                                    isAcknowledgedRequired:
                                      item?.acknowledgedRequired,
                                  });
                                  item.type === 'taskQuestions' ||
                                  item.type === 'taskQnrs'
                                    ? navigate(ROUTES[item.type], {
                                        question: item.questions ?? item.qnrs,
                                        ids: {
                                          episodeId: item.episodeId,
                                          milestoneId: item.milestoneId,
                                          taskId: item.taskId,
                                          topicId: item.topicId,
                                        },
                                        currentTask: true,
                                        loadTask: fetchTasks,
                                        itemData: task,
                                        type: item.type,
                                      })
                                    : navigate(ROUTES[item.type], {
                                        item,
                                        ids: {
                                          episodeId: item.episodeId,
                                          milestoneId: item.milestoneId,
                                          taskId: item.taskId,
                                          topicId: item.topicId,
                                        },
                                        loadTask: fetchTasks,
                                      });
                                }}
                              />
                            )
                          );
                        }}
                      />
                    ) : (
                      <RegularText title="No current task" />
                    )
                  ) : (
                    <TaskPlaceHolder length={3} space={10} />
                  )}
                </ScrollView>
              )}
            </View>

            <View style={ds.navigationWrapper}>
              <View style={ds.blockNavigationWrapper}>
                {blockNavigations.map((x: any, index: number) => {
                  return renderNavigation(x, index);
                })}
              </View>
            </View>
            <View style={ds.footer}>
              <Comment />
              <View style={ds.chatWrapper}>
                <BoldText
                  title="Do you have questions?"
                  style={ds.footerQuestionText}
                />
                <RegularText
                  title="Our care navigators are availabe 24/7 for support"
                  style={ds.footerSubText}
                />
              </View>
              <Button
                title="Chat Now"
                onPress={() => navigate('Communication')}
                buttonWrapper={{}}
                buttonStyle={ds.chatNowBtn}
                buttonTextStyle={ds.chatNowTxt}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      {showDisclaimer && (
        <Desclamier visible={state.disclaimer} onPress={onPress} />
      )}
      <Modal
        headerTitle="Biometric Setup"
        handleButtonClick={handleModalClick}
        popupVisibility={setAttribute}
        leftButtonTitle="Later"
        rightButtonTitle="Yes"
        attribute={attribute}
        show={state.biometric}>
        <View style={ds.modalContentWrapper}>
          <Text style={ds.modalText}>
            Would you like to set up biometric login?
          </Text>
        </View>
      </Modal>
    </Wrapper>
  );
};

const Home = withTheme(HomeScreen);
export {Home};
