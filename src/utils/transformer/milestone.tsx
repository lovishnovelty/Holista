import moment from 'moment';
import {sortBy, sortByDate} from '../milestone-utils';

const transformCurrentTask = (data: any) => {
  let concatTask: any = [];

  for (let key in data) {
    concatTask.push(
      ...data[key].map((item: any) => {
        return {
          ...item,
          type: key,
        };
      }),
    );
  }

  return concatTask;
};

const transformMilestone = (data: any) => {
  const keys = ['taskTodos', 'taskQuestions', 'taskQnrs', 'taskMessages'];

  let concatTask: any = [];
  if (data) {
    for (let key in data) {
      keys.includes(key) &&
        concatTask.push(
          ...data[key].map((item: any) => {
            return {
              ...item,
              type: key,
            };
          }),
        );
    }
  }
  return concatTask
    .filter(
      (x: any) =>
        x.assignedToRole === 'MP' ||
        x.type === 'taskQuestions' ||
        x.type === 'taskQnrs' ||
        x?.messageToRole === 'MP',
    )
    .sort((a: any, b: any) => (a.sequence > b.sequence ? 1 : -1));
};

const formatResult = (data: any) => {
  data = data.map((x: any) => {
    x.showDate = null;
    let showDate = x.startDate ? x.startDate : x.relativeStartDate;
    x.showDate = showDate
      ? moment(showDate.split('T')[0]).format('MM/DD/YYYY')
      : null;
    return x;
  });
  data = sortBy(data, 'sequence');
  data = [
    ...data.filter((x) => x.isTriggerOnStart),
    ...data.filter((x) => !x.showDate && !x.isTriggerOnStart),
    ...sortByDate(
      data.filter((x) => !x.isTriggerOnStart),
      'showDate',
    ),
  ];
  return data;
};

export {transformCurrentTask, transformMilestone, formatResult};
