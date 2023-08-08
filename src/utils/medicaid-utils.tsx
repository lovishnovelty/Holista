import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator} from 'react-native';
import {WModal, WSnackBar} from 'react-native-smart-tip';
import React from 'react';
import moment from 'moment';
import {color, app_theme} from '../assets/theme';
import IdCard from '../assets/images/svg/id-card.svg';
import Milestone from '../assets/images/svg/mission.svg';
import Information from '../assets/images/svg/info.svg';
import Communication from '../assets/images/svg/communicationIcon.svg';
import {normalize} from './helper';

export const storeLocalData = async (name: string, value: string) => {
  try {
    await AsyncStorage.setItem(`@${name}`, value);
  } catch (e) {}
};

export const getLocalData = async (name: string) => {
  try {
    const value = await AsyncStorage.getItem(`@${name}`);
    return value;
  } catch (e) {
    console.log('error in getting from async storage', e);
    return false;
  }
};

export const removeLocalData = async (name: string) => {
  try {
    await AsyncStorage.removeItem(`@${name}`);
  } catch (e) {
    console.log('error in removing from async storage', e);
  }
};

const colors: any = {
  success: '#58AD76',
  error: '#f25c5c',
  info: '#5bc0de',
};

export const snackBarBottom = (
  message: string,
  type: string,
  isTop?: boolean,
  callback?: () => any,
) => {
  const snackBarDown = {
    numberOfLines: 5,
    statusBarHeight: normalize(20),
    height: normalize(35),
    data: message,
    position: isTop ? WSnackBar.position.TOP : WSnackBar.position.BOTTOM, // 1.TOP 2.CENTER 3.BOTTOM
    duration: WSnackBar.duration.LONG, //1.SHORT 2.LONG 3.INDEFINITE
    textColor: '#fff',
    backgroundColor: colors[type],
    actionTextColor: '#fff',
    onActionHide: (isSlideHide: any) => {
      WSnackBar.hide();
    },
  };
  WSnackBar.show(snackBarDown);
  if (callback) {
    callback();
  }
};

export const checkEmpty = (obj: Object) => {
  return obj && Object.keys(obj).length === 0;
};
export const getChatDate = (date: any, format?: string) => {
  if (date) {
    return moment(date * 1000).format(format || 'MM/DD/YYYY');
  } else {
    return date;
  }
};

export const showLoader = () => {
  const modalOpts = {
    data: 'Loading',
    textColor: '#fff',
    backgroundColor: '#444444',
    position: WModal.position.CENTER,
    icon: <ActivityIndicator color="#fff" size={'large'} />,
  };
  WModal.show(modalOpts);
};

export const hideLoader = () => {
  return WModal.hide();
};

export const seperateFiles = (result: any) => {
  let links: any[] = [];
  let documents: any[] = [];
  result.map((item: any) => {
    if (
      item?.documentPath &&
      (item.documentPath.endsWith('.pdf') ||
        item.documentPath.endsWith('.xlsx') ||
        item.documentPath.endsWith('.txt') ||
        item.documentPath.endsWith('.jpeg') ||
        item.documentPath.endsWith('.jpg') ||
        item.documentPath.endsWith('.png') ||
        item.documentPath.endsWith('.xls') ||
        item.documentPath.endsWith('.docx'))
    ) {
      documents.push(item);
    } else {
      links.push(item);
    }
  });
  return {links, documents};
};

export const getColor = (status: string) => {
  return status === 'COMPLETED'
    ? color.fadeGreen
    : status === 'DUE'
    ? color.fadeRed
    : status === 'IN PROGRESS'
    ? color.cream
    : color.borderGrey;
};

export const getBorderColor = (status: string) => {
  return status === 'DUE'
    ? color.borderRed
    : status === 'COMPLETED'
    ? color.accentGreen
    : color.borderGrey;
};
export const capitalizeFirstLetter = (string: String) => {
  if (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  } else {
    return string;
  }
};

export const secondsToTime = (seconds: number) => {
  const times = {
    year: 31557600,
    month: 2629746,
    day: 86400,
    h: 3600,
    m: 60,
    s: 1,
  };
  try {
    if (seconds) {
      let time_string: string = '';
      for (var key in times) {
        if (Math.floor(seconds / times[key]) > 0) {
          time_string +=
            Math.floor(seconds / times[key]).toString() + key.toString() + ' ';
          seconds = seconds - times[key] * Math.floor(seconds / times[key]);
        }
      }
      return time_string;
    } else {
      return seconds;
    }
  } catch (e) {
    console.log('Error while converting time for call', e);
    return seconds;
  }
};

export const checkMessage = async (
  messageList: any,
  message: any,
  past?: boolean,
) => {
  for (let i = 0; i < messageList.length; i++) {
    if (
      messageList[i].uid === message.uid &&
      messageList[i].text === message.text
    ) {
      return true;
    } else if (messageList[i].uid === message.uid) {
      messageList[i].text = message.text;
    } else if (!messageList.some((item) => item.uid === message.uid)) {
      messageList.push(message);
    }
  }
  if (
    messageList.length === 0 &&
    !messageList.some((item) => item.uid === message.uid)
  ) {
    messageList.push(message);
  }
  return past ? messageList : false;
};

export const getFileTypeIcon = (fileType: string) => {
  switch (fileType) {
    case 'pdf':
      return 'file-pdf-outline';
    case 'txt':
      return 'file-outline';
    case 'jpg':
    case 'jpeg':
      return 'file-image-outline';
    default:
      return 'file-document-outline';
  }
};

export const getBlockNavigation = () => {
  return [
    {
      navigate: 'ID Card',
      icon: (
        <IdCard
          fill_a={app_theme.primary_color}
          fill_b={color.buttonBackground}
          fill_c={color.accentGreen}
        />
      ),
      title: 'ID Card',
    },
    {
      navigate: 'Milestone',
      icon: (
        <Milestone
          fill_a={app_theme.primary_color}
          fill_b={color.buttonBackground}
          fill_c={color.accentGreen}
        />
      ),
      title: 'Milestone',
    },
    {
      navigate: 'Information',
      icon: (
        <Information
          fill_a={app_theme.primary_color}
          fill_b={color.buttonBackground}
          fill_c={color.accentGreen}
        />
      ),
      title: 'Information',
    },
    {
      navigate: 'Communication',
      icon: (
        <Communication
          fill_a={app_theme.primary_color}
          fill_b={color.buttonBackground}
          fill_c={color.accentGreen}
        />
      ),
      title: 'Communication',
    },
  ];
};
