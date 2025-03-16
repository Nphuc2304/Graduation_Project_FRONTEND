import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, Settings, StyleSheet} from 'react-native';
import Home from '../layoutBottomTab/Home';
import Dashboard from '../layoutBottomTab/Dashboard';
import Campaigns from '../layoutBottomTab/Campaigns';
import Setting from '../layoutBottomTab/Settings';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0,
          height: 50,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: 'bold',
          marginTop: 2,
        },
        headerShown: false,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color}) => (
            <Image
              source={require('../../assets/icons/home.png')}
              style={[styles.icon, {tintColor: color, width: 20, height: 20}]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: ({color}) => (
            <Image
              source={require('../../assets/icons/dashboard.png')}
              style={[styles.icon, {tintColor: color, width: 20, height: 20}]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Campaigns"
        component={Campaigns}
        options={{
          tabBarIcon: ({color}) => (
            <Image
              source={require('../../assets/icons/campaigns.png')}
              style={[styles.icon, {tintColor: color, width: 25, height: 25}]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Setting}
        options={{
          tabBarIcon: ({color}) => (
            <Image
              source={require('../../assets/icons/settings.png')}
              style={[styles.icon, {tintColor: color, width: 20, height: 20}]}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  icon: {
    resizeMode: 'contain',
  },
});

export default BottomTabNavigator;
