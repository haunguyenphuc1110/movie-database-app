import React from 'react';

import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AppNavigator from './navigation/AppNavigator';

const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" showHideTransition="slide" />
      <AppNavigator />
    </SafeAreaProvider>
  );
};

export default App;
