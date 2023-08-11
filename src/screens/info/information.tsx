import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {color, commonStyle} from '../../assets';
import Links from './links';
import {useFetch, useAsyncState} from '../../hooks';
import Documents from './documents';
import {useDispatch, useSelector} from 'react-redux';
import {checkEmpty, normalize, seperateFiles} from '../../utils';
import {InfoPlaceHolder} from '../../common/ui';
import {loginSchema} from '../../utils/validation';

const Tab = createMaterialTopTabNavigator();

const Information = () => {
  const {loading, result, error, doRequest} = useFetch();
  const [links, setLinks] = useState<any>(null);
  const [documents, setdocuments] = useAsyncState(null);
  const [loader, setLoader] = useState(true);
  const dispatch = useDispatch();
  const infoData = useSelector((state: any) => state.data.info);

  const setData = (data: any) => {
    const {links, documents} = seperateFiles(data);
    setLinks(links);
    setdocuments(documents).then(() => setLoader(false));
  };

  useEffect(() => {
    if (result?.rows) {
      setData(result?.rows);
      dispatch({type: 'SET_INFO_DATA', payload: {info: result?.rows}});
    }
  }, [result]);

  useEffect(() => {
    const ress = doRequest(
      '/api/documents?page=1&limit=200&sortType=desc&sortBy=id',
    );
    console.log(ress, 'resss');

    checkEmpty(infoData)
      ? doRequest('/api/documents?page=1&limit=200&sortType=desc&sortBy=id')
      : setData(infoData);
  }, []);

  return (
    <View style={{flex: 1}}>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: color.darkBlack,
          labelStyle: {textTransform: 'capitalize', fontSize: normalize(18)},
          indicatorStyle: commonStyle.topTab,
          style: {
            backgroundColor: color.navheader,
            height: normalize(50),
          },
        }}>
        <Tab.Screen name="Documents">
          {() =>
            loader ? (
              <InfoPlaceHolder type="document" />
            ) : (
              <Documents loading={loader} documents={documents} />
            )
          }
        </Tab.Screen>
        <Tab.Screen name="Useful Links">
          {() =>
            loader ? (
              <InfoPlaceHolder type="link" />
            ) : (
              <Links loading={loader} links={links} />
            )
          }
        </Tab.Screen>
      </Tab.Navigator>
    </View>
  );
};

export {Information};
