import React, {useEffect, useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector, useDispatch} from 'react-redux';
import {Linking} from 'react-native';
import {
  getAcessToken,
  getLocalData,
  removeLocalData,
  removeToken,
} from '../utils';

import BottomTabNavigator from './bottomTabBar';
import * as screen from '../screens';
import {AuthContext} from '../context';
import {CustomWebView} from '../common/ui/webView';

const stack = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: any) => state.auth);

  const {dispatch: dispathcAuth} = useContext(AuthContext);
  const Stack = createStackNavigator();
  const urlList = [
    'https://demo-api-holista.noveltytechnology.com/api/mobile-association/patient/activation/',
    'https://dev-api-holista.noveltytechnology.com/api/mobile-association/patient/activation/',
    'https://stage-api-holista.noveltytechnology.com/api/mobile-association/patient/activation/',
    'https://prod-api-holista.noveltytechnology.com/api/mobile-association/patient/activation/',
  ];

  useEffect(() => {
    Linking?.addEventListener('url', handleOpenURL);
    return () => {
      Linking?.removeEventListener('url', handleOpenURL);
    };
  }, []);

  const handleOpenURL = (event: any) => {
    if (
      token &&
      urlList.includes(event.url.substring(0, event.url.length - 17))
    ) {
      dispatch({type: 'SIGN_OUT'});
      removeToken();
      removeLocalData('user');
      dispatch({type: 'CLEAR_DATA'});
    }
  };

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        let userToken = await getAcessToken();
        const userData: any = await getLocalData('user');
        const disclaimer = await getLocalData('disclaimer');
        dispatch({type: 'RESTORE_TOKEN', token: userToken});
        if (!disclaimer)
          dispathcAuth({
            type: 'LOAD_DISCLAIMER',
            payload: true,
          });

        dispatch({
          type: 'RESTORE_USER',
          payload: {user: JSON.parse(userData)},
        });
      } catch (e) {}
    };
    bootstrapAsync();
  }, []);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {token.userToken === null ? (
        <>
          <Stack.Screen name="Login" component={screen.Login} />
          <Stack.Screen
            name="Register"
            component={screen.Register}
            options={{gestureEnabled: false}}
          />
          <Stack.Screen
            name="Verification"
            component={screen.Verification}
            options={{gestureEnabled: false}}
          />
          <Stack.Screen
            name="Confirmation"
            component={screen.Confirmation}
            options={{gestureEnabled: false, headerShown: false}}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Main"
            component={BottomTabNavigator}
            options={{gestureEnabled: false, headerShown: false}}
          />
          <Stack.Screen name="Profile" component={screen.Profile} />
          <Stack.Screen
            name="Task"
            component={screen.Task}
            options={{
              gestureEnabled: false,
              headerShown: false,
            }}
          />
          <Stack.Screen name="message" component={screen.Message} />
          <Stack.Screen
            name="Questions"
            component={screen.Question}
            options={{
              gestureEnabled: false,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Questionnaire"
            component={screen.Questionnaire}
            options={{
              gestureEnabled: false,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="QuestionnaireQuestion"
            component={screen.QuestionnaireQuestion}
            options={{gestureEnabled: false, headerShown: false}}
          />
          <Stack.Screen
            name="MessagePage"
            component={screen.MessagePage}
            options={{gestureEnabled: false, headerShown: false}}
          />
          <Stack.Screen name="webView" component={CustomWebView} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default stack;
