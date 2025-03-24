import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, StyleSheet} from 'react-native';
import Home from '../layoutBottomTab/Home';
import Setting from '../layoutBottomTab/Profile';
import colors from '../Color';
import Notification from '../layoutBottomTab/Notification';
import Stats from '../layoutBottomTab/Stats';
import Profile from '../layoutBottomTab/Profile';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: colors.white,
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
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('../../assets/icons/home.png')}
              style={[
                styles.icon,
                {tintColor: color, width: size, height: size},
              ]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('../../assets/icons/bell.png')}
              style={[
                styles.icon,
                {tintColor: color, width: size, height: size},
              ]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Stats"
        component={Stats}
        options={{
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('../../assets/icons/database.png')}
              style={[
                styles.icon,
                {tintColor: color, width: size, height: size},
              ]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('../../assets/icons/user.png')}
              style={[
                styles.icon,
                {tintColor: color, width: size, height: size},
              ]}
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
