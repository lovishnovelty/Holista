export const getOptions = (options: any) => {
  let optionArray: any[] = [];
  options.map((val: any, index: number) => {
    optionArray.push({
      label: val.optionValue?.trim(),
      value: val.id,
      uuid: {
        task: val.taskQuesUuid,
        question: val.questionUuid,
        qnrs: val.taskQnrsUuid,
        taskMsg: val.taskMessageUuid,
        taskTodo: val.taskTodoUuid,
      },
    });
  });

  return optionArray;
};

export const checkForOptions = (
  options: any,
  item: any,
  setuuid?: any,
  list?: any,
) => {
  let uuid: any = [];
  if (item) {
    getOptions(options).map((val, index) => {
      const id = item.answerOptionId[0] ?? item.answerOptionId;
      if (+val.value === id) {
        if (setuuid) {
          setuuid([{id: index + 1, ...val.uuid}]);
        } else {
          uuid = [{id: index + 1, ...val.uuid}];
        }
      }
    });
  } else {
    list.map((item: number) => {
      getOptions(options).map((val, index) => {
        if (val.value === item) {
          const localUuid = {
            id: index + 1,
            task: val.uuid.task,
            taskMsg: val.uuid.taskMsg,
            taskTodo: val.uuid.taskTodo,
            question: val.uuid.question,
            qnrs: val.uuid.qnrs,
          };
          uuid.push(localUuid);
        }
      });
    });
    setuuid && setuuid(uuid);
    list.length === 0 &&
      setuuid([{task: '', taskMsg: '', taskTodo: '', question: '', qnrs: ''}]);
  }

  return uuid;
};

export const checkUuid = (uuidList: any, uuid: any) => {
  for (let i = 0; i < uuid.length; i++) {
    if (
      uuidList[i]?.task === uuid ||
      uuidList[i]?.taskMsg === uuid ||
      uuidList[i]?.qnrs === uuid ||
      uuidList[i]?.question === uuid ||
      uuidList[i]?.taskTodo === uuid
    ) {
      return true;
    }
  }
  return false;
};

export const checkForDependent = (
  questions: any,
  uuid: any,
  overAllData: any,
  userId: number,
  extra: any,
  localIndex: number,
  setQuestions?: any,
  setUuid?: any,
  checkDependent?: (isDependent: boolean) => void,
) => {
  let filteredData = overAllData.filter(
    (item: any) => item?.isDependent && checkUuid(uuid, item?.uuid),
  );

  const hasDependent = filteredData.length > 0 ? true : false;
  checkDependent && checkDependent(hasDependent);
  if (!hasDependent) {
    return;
  }
  const addData = (type: string, uuidItem: any) => {
    const messages = filteredData.filter((item: any) => item.type === type);
    const dependenTaskIds = filteredData.map((x: any) => +x?.id);
    let filteredQues = questions.filter((item: any) => {
      // return +item.id !== +messages[0]?.id;
      if (!dependenTaskIds.includes(+item.id)) {
        return item;
      }
    });
    const item = questions[localIndex];
    const filteredUuid = uuid.filter((item: any) => item.id !== uuidItem.id);
    messages.forEach((dependenTask: any, index: number) => {
      let spliceIndex = localIndex + index + 1;
      messages[index] &&
        filteredQues.splice(spliceIndex, 0, {
          ...messages[index],
          dependentIndex: item?.uuid ?? item?.question?.uuid,
        });
      // messages[1] &&
      //   filteredQues.splice(localIndex + 2, 0, {
      //     ...messages[1],
      //     dependentIndex: item?.uuid ?? item?.question?.uuid,
      //   });
    });

    if (messages[0]?.messageTo) {
      if (+userId === +messages[0].messageTo) {
        if (extra) {
          extra.data = [...filteredQues];
          checkForDependent(
            filteredQues,
            [...filteredUuid, {...uuidItem, taskMsg: ''}],
            overAllData,
            userId,
            extra,
            localIndex + 1,
          );
        } else {
          setQuestions([...filteredQues]);
          setUuid([...filteredUuid, {...uuidItem, taskMsg: ''}]);
        }
      } else {
        extra &&
          checkForDependent(
            questions,
            [...filteredUuid, {...uuidItem, taskMsg: ''}],
            overAllData,
            userId,
            extra,
            localIndex,
          );
      }
    } else if (messages[0]?.assignedTo) {
      if (+userId === +messages[0].assignedTo) {
        if (extra) {
          extra.data = [...filteredQues];
          checkForDependent(
            filteredQues,
            [...filteredUuid, {...uuidItem, taskTodo: ''}],
            overAllData,
            userId,
            extra,
            localIndex + 1,
          );
        } else {
          setQuestions([...filteredQues]);
          setUuid([...filteredUuid, {...uuidItem, taskTodo: ''}]);
        }
      } else {
        extra &&
          checkForDependent(
            questions,
            [...filteredUuid, {...uuidItem, taskTodo: ''}],
            overAllData,
            userId,
            extra,
            localIndex,
          );
      }
    } else if (type === 'taskQuestions') {
      if (extra) {
        let newuuid: any = [];
        filteredQues[localIndex + 1]?.questions?.ansOpt?.map((item) => {
          newuuid = checkForOptions(
            filteredQues[localIndex + 1]?.questions?.questionOptions,
            item,
          );
        });
        checkForDependent(
          filteredQues,
          [...filteredUuid, {...uuidItem, task: ''}],
          overAllData,
          userId,
          extra,
          localIndex + 1,
        );

        if (newuuid.length > 0) {
          checkForDependent(
            filteredQues,
            [...newuuid],
            overAllData,
            userId,
            extra,
            localIndex + 1,
          );
        }
      } else {
        setQuestions([...filteredQues]);
        setUuid([...filteredUuid, {...uuidItem, task: ''}]);
      }
    } else if (type === 'taskQnrs') {
      if (extra) {
        checkForDependent(
          questions,
          [...filteredUuid, {...uuidItem, qnrs: ''}],
          overAllData,
          userId,
          extra,
          localIndex + 1,
        );
      } else {
        setQuestions([...filteredQues]);
        setUuid([...filteredUuid, {...uuidItem, qnrs: ''}]);
      }
    }
  };

  const removeChild = (newQuestions: any, localIndex: any) => {
    if (newQuestions[localIndex + 1]?.isDependent) {
      newQuestions = removeChild(newQuestions, localIndex + 1);
    }

    newQuestions = newQuestions.filter((item: any) =>
      item?.dependentIndex
        ? item?.dependentIndex.localeCompare(
            questions[localIndex]?.uuid ??
              questions[localIndex]?.question?.uuid,
          )
        : true,
    );

    return newQuestions;
  };

  const removeDependent = (questions: any, localIndex: number) => {
    const filteredQues = removeChild(questions, localIndex);

    setQuestions([...filteredQues]);
  };
  uuid.map((uuidItem: any) => {
    if (uuidItem.taskMsg) {
      addData('taskMessages', uuidItem);
    } else if (uuidItem.taskTodo) {
      addData('taskTodos', uuidItem);
    } else if (uuidItem.task) {
      addData('taskQuestions', uuidItem);
    } else if (uuidItem.qnrs) {
      addData('taskQnrs', uuidItem);
    } else {
      extra
        ? (extra.data = [...questions])
        : removeDependent(questions, localIndex);
    }
  });
};

export const sortBy = (arr: any, sortBy: string) => {
  arr = arr.sort(function (a: any, b: any) {
    if (a[sortBy] < b[sortBy]) {
      return -1;
    } else if (a[sortBy] > b[sortBy]) {
      return 1;
    } else {
      return 0;
    }
  });
  return arr;
};

export const sortByDate = (arr: any, sortBy: string) => {
  arr = arr.filter((x) => x[sortBy]);
  arr.sort(
    (a, b) => new Date(a.showDate).getTime() - new Date(b.showDate).getTime(),
  );
  return arr;
};
