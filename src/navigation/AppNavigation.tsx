import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import BottomTabNavigator from './BottomTab';
import Splash from '../Splash/Splash';
import Start1 from '../Splash/Start1';
import Start2 from '../Splash/Start2';
import Start3 from '../Splash/Start3';
import {
  Bookmark,
  ForgotPassword,
  Login,
  ProfileOther,
  SelectInterest,
  SelectSuccess,
  SignIn,
  SignUp,
  Verification,
  WelcomePage,
  Detail,
  Dontation,
  Payment
} from '../Screen';
const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="BottomTabs"
        screenOptions={{headerShown: false}}>
          <Stack.Screen name="Payment" component={Payment} />
          <Stack.Screen name="Donation" component={Dontation} />
        <Stack.Screen name="Detail" component={Detail} />
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Start1" component={Start1} />
        <Stack.Screen name="Start2" component={Start2} />
        <Stack.Screen name="Start3" component={Start3} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Welcome" component={WelcomePage} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="Verification" component={Verification} />
        <Stack.Screen name="BottomTabs" component={BottomTabNavigator} />
        <Stack.Screen name="SelectInterest" component={SelectInterest} />
        <Stack.Screen name="SelectSuccess" component={SelectSuccess} />
        <Stack.Screen name="Bookmark" component={Bookmark} />
        <Stack.Screen name="ProfileOther" component={ProfileOther} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
