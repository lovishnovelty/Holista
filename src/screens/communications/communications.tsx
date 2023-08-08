import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import withTheme from '../../hoc/withTheme';
import {Wrapper as SafeAreaView} from '../../common/ui';
import {Messages} from './messages';
import {Telemedicine} from './telemedicine/telemedicine';
import {color, commonStyle} from '../../assets';
import {normalize} from '../../utils';

const Tab = createMaterialTopTabNavigator();

const CommunicationScreen = () => {
  return (
    <SafeAreaView horizontalMargin={0}>
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
        <Tab.Screen name="Messages" component={Messages} />
        <Tab.Screen name="Telemedicine" component={Telemedicine} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const Communication = withTheme(CommunicationScreen);
export {Communication};
