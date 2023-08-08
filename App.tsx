import React, {useEffect} from 'react';
import AppRoute from './src/navigations';

const App = () => {
  useEffect(() => {
    if (__DEV__) {
      import('./src/config/ReactotronConfig').then(() =>
        console.log('Reactotron Configured'),
      );
    }
  }, []);
  return <AppRoute />;
};

export default App;
