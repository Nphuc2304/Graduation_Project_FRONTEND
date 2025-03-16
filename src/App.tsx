import React from 'react';
import {enableScreens} from 'react-native-screens';
import AppNavigator from './navigation/AppNavigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';

enableScreens();

const App = () => {
  return (
    <SafeAreaProvider>
      <AppNavigator />
    </SafeAreaProvider>
  );
};

export default App;
