import {Image, StyleSheet, Text, View} from 'react-native';
import {useEffect} from 'react';
import SplashStyles from './SplashStyles/SplashStyles';

const Splash = ({navigation}: any) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Start1');
    }, 3000);
  }, []);
  return (
    <View style={SplashStyles.container}>
      <Image source={require('../../assets/images/img_splash.png')} />
    </View>
  );
};

export default Splash;
