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

const AppRoute = () => {
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
  const {state, dispatch} = useAuth();
  return (
    <Provider store={store}>
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
    </Provider>
  );
};

export default AppRoute;
