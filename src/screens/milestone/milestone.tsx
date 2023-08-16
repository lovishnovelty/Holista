import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  RefreshControl,
} from 'react-native';

import {
  Icon,
  Input,
  NavHeader,
  RegularText,
  TaskPlaceHolder,
  Wrapper,
} from '../../common/ui';
import {milestoneStyle as ms, color, commonStyle} from '../../assets';
import {
  normalize,
  snackBarBottom,
  transformMilestone,
  navigate,
  formatResult,
  GLOBALSTATUS,
  ROUTES,
  getColor,
} from '../../utils';
import {useFetch, useAsyncState} from '../../hooks';
import ArrowUp from '../../assets/images/svg/arrowUp.svg';
import ArrowDown from '../../assets/images/svg/arrowDown.svg';
import {getRequest} from '../../services/request';
import {MilestoneItem} from './milestoneItem';
import moment from 'moment';

let count = 0;
const Milestone = () => {
  const inputRef = useRef('');
  const {result, doRequest} = useFetch();
  const [ref, setRef] = useState<any>(null);
  const [status, setStatus] = useState(null);
  const [milestoneSearchText, setMilestoneSearchText] = useState<string>('');
  const [refreshing, setRefreshing] = React.useState(false);

  const [attribute, setAttribute] = useState<any>({
    itemId: null,
    activeStatus: 'In Progress',
    scrollTo: null,
    afterSubmit: false,
  });
  const [data, setData] = useAsyncState({
    data: [],
    tempData: [],
    loading: true,
    message: 'No milestone available',
  });
  const [state, setState] = useState<any>({
    tasks: [],
    loading: true,
  });

  const [ids, setIds] = useState({
    episodeId: 0,
    milestoneId: 0,
    taskId: 0,
    topicId: 0,
  });

  useEffect(() => {
    const url = '/api/episodes/milestones';
    doRequest(url);
    inputRef.current.clear();
  }, [refreshing]);

  useEffect(() => {
    if (result) {
      setIds(previd => ({...previd, episodeId: result?.episodes[0]?.id}));
      const formattedData =
        result?.episodes[0]?.milestones &&
        formatResult(result?.episodes[0]?.milestones);
      if (formattedData && formattedData.length > 0) {
        const mapData =
          formattedData?.length > 0 &&
          formattedData.filter(
            (item: any) =>
              item?.status?.toUpperCase() ===
              attribute.activeStatus.toUpperCase(),
          );
        setData({
          data: formattedData || [],
          tempData: mapData || [],
          loading: false,
        }).then((res: any) => {
          const activeMilestone = formattedData.filter(
            (item: any) => item?.status?.toUpperCase() === 'IN PROGRESS',
          );
          if (status) {
            onChangeStatus(status, res);
          } else {
            activeMilestone.length > 0 &&
              getCurrentTask(
                activeMilestone[0].id,
                activeMilestone[0].relativeStartDate,
                activeMilestone[0].status,
              ) &&
              setAttribute({
                ...attribute,
                activeStatus: 'IN PROGRESS',
                itemId: activeMilestone[0].id,
              });
          }
          setRefreshing(false);
        });
      } else {
        setData({
          data: [],
          tempData: [],
          loading: false,
        });
        setRefreshing(false);
      }
    }
  }, [result]);

  const loadTask = async (id: number, isBack?: boolean) => {
    const url = `/api/episodes/milestones/${id}/tasks`;
    const response: any = await getRequest(url);
    setIds(previd => ({
      ...previd,
      milestoneId: id,
      topicId: response.data[0]?.id,
    }));
    const checkForStatus = (data: any) => {
      const statusList = data.map((item: any) => item.status);
      if (statusList.includes('DUE')) return 'DUE';
      if (statusList.includes('IN PROGRESS')) return 'IN PROGRESS';
      if (statusList.includes('COMPLETED')) return 'COMPLETED';
    };
    let currentItem = data.data.find((item: any) => item.id === id);
    if (currentItem && Object.keys(currentItem).length > 0 && isBack) {
      // let filteredData = data.data.filter((item: any) => item.id !== id);
      currentItem.status = checkForStatus(response.data);
      setData({
        ...data,
        tempData: [...data.tempData]
          .sort((a: any, b: any) => (a.sequence > b.sequence ? 1 : -1))
          .filter(item => {
            if (attribute.activeStatus == 'ALL') {
              return true;
            } else if (attribute.activeStatus == 'PRIMARY') {
              return item.isKeyMilestone;
            } else {
              return item.status === attribute.activeStatus;
            }
            //   attribute.activeStatus !== 'ALL'
            //     ? item.status === attribute.activeStatus
            //     : true,
            // }
          }),
      });
    }
    // isKeyMIlestone
    let result: any = [];
    response?.data[0] &&
      Object.keys(response.data).length > 0 &&
      response.data.map(
        (item: any, index: number) =>
          (result = [].concat(
            ...result,
            transformMilestone(response.data[index]),
          )),
      );
    setState({
      tasks: result,
      loading: false,
    });
  };

  const getCurrentTask = async (
    id: number,
    startDate: string,
    status: string,
    isTriggerOnStart?: boolean,
  ) => {
    setState({
      tasks: [],
      loading: true,
    });
    try {
      let d = new Date();
      //  d.setDate(d.getDate() - 1);
      d = new Date(moment(d).format('YYYY-MM-DD'));
      if (GLOBALSTATUS.includes(status)) {
        loadTask(id);
      } else {
        if (
          isTriggerOnStart ||
          (startDate &&
            new Date(startDate) <= d &&
            result?.episodes[0]?.status !== 'PRELIMINARY')
        ) {
          loadTask(id, true);
          setAttribute({
            ...attribute,
            itemId: attribute.itemId ? null : id,
          });
        } else {
          snackBarBottom(
            'Please wait for your milestone to start',
            'info',
            true,
          );
          setState({tasks: [], loading: false});
        }
      }
    } catch (error) {
      snackBarBottom('Please wait for your milestone to start', 'info', true);
      setState({tasks: [], loading: false});
    }
  };

  const scrollHandler = (y: any, id: any) => {
    ref.scrollTo({
      x: 0,
      y: attribute.scrollTo ?? y,
      animated: true,
    });
    count += 1;
    setAttribute({...attribute, itemId: id});
  };

  const onChangeSearch = (
    text: string,
    milestoneData: any,
    status?: string,
  ) => {
    const result = milestoneData ?? data;
    setMilestoneSearchText(text);
    let temp = [...getDataByStatus(status ?? attribute.activeStatus)];
    if (text && !/\\/.test(text)) {
      const filterMilestone = temp.filter((item: any) =>
        item.name.toLowerCase().match(text.toLowerCase()),
      );
      setData({
        ...result,
        tempData: [...filterMilestone],
        message: 'No milestone available',
      });
    } else {
      setData({
        ...result,
        tempData: temp,
        message: 'No milestone available',
      });
    }
  };

  const toggleMilestone = (item: any) => {
    const getTasks = attribute.itemId !== item.id;
    setAttribute({
      ...attribute,
      itemId:
        attribute.itemId !== item.id &&
        (item.status === null || GLOBALSTATUS.includes(item.status))
          ? item.id
          : null,
    });
    if (getTasks) {
      getCurrentTask(
        item.id,
        item?.startDate ?? item?.relativeStartDate,
        item.status,
        item?.isTriggerOnStart,
      );
    }
    setData({...data, tempData: data.tempData});
  };

  const onChangeStatus = (item: any, milestoneData: any) => {
    const result: any = milestoneData ?? data;
    setStatus(item);
    setAttribute({...attribute, activeStatus: item});
    if (item === 'ALL') {
      const getTask =
        result.data
          .filter(
            (item: any) =>
              item.status === 'IN PROGRESS' || item.status === 'DUE',
          )
          .sort((a: any, b: any) => a.status.localeCompare(b.status))[0] ??
        null;

      getTask && getCurrentTask(getTask.id, getTask.startDate, getTask.status);
      setAttribute({
        ...attribute,
        activeStatus: 'ALL',
        itemId: getTask?.id,
      });
    }
    onChangeSearch(milestoneSearchText, result, item);
  };

  const getDataByStatus = (status: string) => {
    switch (status.toUpperCase()) {
      case 'PRIMARY':
        return data.data.filter((val: any) => val?.isKeyMilestone);
      case 'ALL':
        return data.data;
      default:
        return data.data.filter(
          (val: any) => val?.status?.toUpperCase() === status.toUpperCase(),
        );
    }
  };

  return (
    <Wrapper horizontalMargin={0}>
      <NavHeader
        title={
          data.loading
            ? 'Episode'
            : result?.episodes[0]?.name ?? 'No Episode available'
        }
        titleStyle={ms.titleStyle}
        style={commonStyle.justifyContentCenter}
        hideLeftIcon
      />
      <ScrollView
        style={ms.wrapper}
        ref={ref => setRef(ref)}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              setMilestoneSearchText('');
            }}
          />
        }>
        <View style={ms.container}>
          <View style={ms.search}>
            <View style={ms.input}>
              <Input
                ref={inputRef}
                placeholder="Search milestone"
                onChangeText={onChangeSearch}
                autoCapitalize="none"
                value={milestoneSearchText}
              />
              <View style={ms.icon}>
                <Icon name="magnify" size={24} />
              </View>
            </View>
          </View>
          <View style={ms.buttons}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {GLOBALSTATUS.map((item: string, index: number) => (
                <View key={index.toString()} style={ms.buttonContainer}>
                  <TouchableOpacity
                    style={[
                      ms.buttonItem,
                      {
                        backgroundColor:
                          attribute.activeStatus?.toUpperCase() ===
                          item.toUpperCase()
                            ? color.buttonBackground
                            : getColor(item.toUpperCase()),
                      },
                    ]}
                    onPress={() => onChangeStatus(item)}>
                    <RegularText
                      title={item}
                      style={{
                        textTransform: 'capitalize',
                        color:
                          attribute.activeStatus?.toUpperCase() ===
                          item.toUpperCase()
                            ? color.white
                            : color.black,
                      }}
                    />
                  </TouchableOpacity>
                  <View style={ms.statusGap} />
                </View>
              ))}
            </ScrollView>
          </View>
          <View style={ms.body}>
            <View style={ms.list}>
              {!data.loading && !refreshing ? (
                data.tempData.length > 0 ? (
                  data.tempData.map((item: any, index: string) => {
                    return (
                      <View
                        key={index}
                        style={{width: '100%'}}
                        onLayout={event => {
                          const layout = event.nativeEvent.layout;
                          if (
                            !count &&
                            attribute.activeStatus === 'ALL' &&
                            attribute.itemId === item.id
                          ) {
                            setAttribute({...attribute, itemId: null});
                            scrollHandler(layout.y, item.id);
                          }
                          if (attribute.afterSubmit) {
                            scrollHandler(layout.y, attribute.itemId);
                            setAttribute({...attribute, afterSubmit: false});
                          }
                        }}>
                        <TouchableWithoutFeedback
                          style={ms.touchable}
                          onPress={() => toggleMilestone(item)}>
                          <View style={ms.arrow}>
                            <View style={ms.main}>
                              <View style={ms.nameView}>
                                {item.id === attribute.itemId ? (
                                  <ArrowUp />
                                ) : (
                                  <ArrowDown />
                                )}
                                <RegularText
                                  title={item.name}
                                  style={ms.name}
                                />
                              </View>
                              {item.status && (
                                <View
                                  style={[
                                    ms.status,
                                    {
                                      backgroundColor: getColor(item.status),
                                      paddingHorizontal: normalize(8),
                                      paddingVertical: normalize(2),
                                    },
                                  ]}>
                                  <RegularText
                                    title={item.status}
                                    style={{
                                      textTransform: 'capitalize',
                                      fontSize: normalize(13),
                                    }}
                                  />
                                </View>
                              )}
                            </View>
                          </View>
                        </TouchableWithoutFeedback>
                        {item.id === attribute.itemId && (
                          <View style={ms.expand} key={index}>
                            {!state.loading ? (
                              state.tasks.length > 0 ? (
                                state.tasks.map(
                                  (item: any, index: string) =>
                                    !item.isDependent && (
                                      <MilestoneItem
                                        key={index}
                                        item={item}
                                        onPress={() => {
                                          item.type === 'taskQuestions' ||
                                          item.type === 'taskQnrs'
                                            ? navigate(ROUTES[item.type], {
                                                question:
                                                  item.questions ?? item.qnrs,
                                                ids: {
                                                  ...ids,
                                                  taskId: item.id,
                                                },
                                                loadTask: (id: number) => {
                                                  setAttribute({
                                                    ...attribute,
                                                    itemId: null,
                                                    afterSubmit: true,
                                                  });
                                                  setState({
                                                    ...state,
                                                    loading: true,
                                                  });
                                                  loadTask(id, true);
                                                  !state.loading &&
                                                    setAttribute({
                                                      ...attribute,
                                                      itemId: id,
                                                    });
                                                },
                                                itemData: state.tasks,
                                              })
                                            : item.type !== 'taskMessages'
                                            ? navigate(ROUTES[item.type], {
                                                item,
                                                ids: {
                                                  ...ids,
                                                  taskId: item.id,
                                                },
                                                loadTask: (id: number) => {
                                                  setAttribute({
                                                    ...attribute,
                                                    itemId: null,
                                                    afterSubmit: true,
                                                  });
                                                  setState({
                                                    ...state,
                                                    loading: true,
                                                  });
                                                  loadTask(id, true);
                                                  !state.loading &&
                                                    setAttribute({
                                                      ...attribute,
                                                      itemId: id,
                                                    });
                                                },
                                              })
                                            : navigate(ROUTES[item.type], {
                                                ids: {
                                                  ...ids,
                                                  taskId: item.id,
                                                },
                                                status: item.status,
                                                messages: item.messages,
                                                fromMilestone: true,
                                                getLatestMilestone: () => {
                                                  loadTask(ids.milestoneId);
                                                },
                                              });
                                        }}
                                      />
                                    ),
                                )
                              ) : (
                                <RegularText
                                  title="No task available"
                                  style={{marginTop: normalize(10)}}
                                />
                              )
                            ) : (
                              <View style={{marginTop: 10}}>
                                <TaskPlaceHolder length={2} space={10} />
                              </View>
                            )}
                          </View>
                        )}
                        <View style={[ms.gap, item.last && {borderWidth: 0}]} />
                      </View>
                    );
                  })
                ) : (
                  <View style={ms.empty}>
                    <Icon name="sign-direction" />
                    <RegularText
                      title={data.message || 'No milestone available'}
                    />
                  </View>
                )
              ) : (
                <TaskPlaceHolder length={8} space={20} />
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </Wrapper>
  );
};

export {Milestone};
