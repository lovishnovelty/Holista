import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView} from 'react-native';
import {Provider} from 'react-redux';
import {persistor, store} from '../redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {globalStyle as gs} from '../assets';
import {navigationRef} from '../utils';
import Stack from './stack';
import {DocumentViewer} from '../screens';
import {CallProvider} from '../context';
import {AuthContext, useAuth} from '../context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Toast, {ErrorToast, SuccessToast} from 'react-native-toast-message';

const AppRoute = () => {
  const {state, dispatch} = useAuth();
  const deepLinking = {
    prefixes: [
      'https://demo-api-holista.noveltytechnology.com/api/mobile-association',
      'https://prod-api-holista.noveltytechnology.com/api/mobile-association',
      'https://stage-api-holista.noveltytechnology.com/api/mobile-association',
      'https://dev-api-holista.noveltytechnology.com/api/mobile-association',
    ],
    config: {
      screens: {
        Verification: {
          path: '/patient/activation/:code',
          exact: true,
        },
      },
    },
  };
  const toastConfig = {
    success: (props: any) => (
      <SuccessToast
        {...props}
        style={{
          width: '97%',
          borderLeftColor: '#4BB543',
          backgroundColor: '#4BB543',
        }}
        text1NumberOfLines={2}
        text1Style={{fontSize: 14, color: 'white'}}
      />
    ),
    error: (props: any) => {
      return (
        <ErrorToast
          {...props}
          style={{
            width: '97%',
            borderLeftColor: '#cc0000',
            backgroundColor: '#cc0000',
          }}
          text1NumberOfLines={2}
          text1Style={{fontSize: 14, color: 'white'}}
        />
      );
    },
  };
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <CallProvider>
          <AuthContext.Provider value={{state, dispatch}}>
            <PersistGate loading={null} persistor={persistor}>
              <NavigationContainer ref={navigationRef} linking={deepLinking}>
                <SafeAreaView style={gs.safeAreaView}>
                  <DocumentViewer />
                  <Stack />
                </SafeAreaView>
              </NavigationContainer>
            </PersistGate>
          </AuthContext.Provider>
        </CallProvider>
      </Provider>

      <Toast config={toastConfig} />
    </GestureHandlerRootView>
  );
};

export default AppRoute;
