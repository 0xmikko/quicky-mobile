/*
 * Copyright (c) 2020. Mikhail Lazarev
 */

import React from 'react';
import {Provider} from 'react-redux';

import configureStore from './src/store';
import {ThemeProvider} from 'react-native-elements';
import {theme} from './src/styles';
import {AuthSwitcher} from './src/screens/AuthSwitcher';
import {NavigationContainer} from '@react-navigation/native';
import {enableScreens} from 'react-native-screens';

// declare const global: {HermesInternal: null | {}};

const store = configureStore();
enableScreens();

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <AuthSwitcher />
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
