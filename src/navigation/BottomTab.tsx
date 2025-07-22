import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, StyleSheet} from 'react-native';
import {useTheme} from '../utils/ThemeContext';
import Home from '../(tabs)/Home';
import Notification from '../(tabs)/Notification';
import CreateCamp from '../Screen/CreateCamp';
import Profile from '../(tabs)/Profile';
import {Plus} from 'lucide-react-native';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const {colors} = useTheme();

  const styles = StyleSheet.create({
    icon: {
      resizeMode: 'contain',
    },
  });

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.secondary,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopWidth: 0,
          height: 85,
          shadowColor: colors.text,
          shadowOpacity: 0.1,
          shadowOffset: {width: 0, height: -2},
          shadowRadius: 8,
          elevation: 8,
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
        name="CreateCamp"
        component={CreateCamp}
        options={{
          tabBarIcon: ({color, size}) => <Plus color={color} size={size} />,
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

export default BottomTabNavigator;
