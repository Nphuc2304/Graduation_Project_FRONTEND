import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import BottomTabNavigator from './BottomTab';
import Splash from '../Splash/Splash';
import Start1 from '../Splash/Start1';
import Start2 from '../Splash/Start2';
import Start3 from '../Splash/Start3';
import Login from '../app/Login';
import WelcomePage from '../app/WelcomePage';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Start1" component={Start1} />
        <Stack.Screen name="Start2" component={Start2} />
        <Stack.Screen name="Start3" component={Start3} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Welcome" component={WelcomePage} />
        <Stack.Screen name="BottomTabs" component={BottomTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
