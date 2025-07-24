import React from 'react';
import {enableScreens} from 'react-native-screens';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import AppNavigator from './navigation/AppNavigation';
import {store} from '../services/store/store';
import {ThemeProvider} from './utils/ThemeContext';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: '622343681897-bnelbp2nuq3rlnjf2mhsbq9vi71uuvvb.apps.googleusercontent.com',
});

// Import Reactotron for debugging
import './config/ReactotronConfig';

if (__DEV__) {
  import('./config/ReactotronConfig').then(() =>
    console.tron.log('Reactotron Configured ✅'),
  );
}

enableScreens();

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <SafeAreaProvider>
          <AppNavigator />
        </SafeAreaProvider>
      </ThemeProvider>
    </Provider>
  );
}
