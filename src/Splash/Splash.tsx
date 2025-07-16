import {Image, StyleSheet, Text, View} from 'react-native';
import {useEffect} from 'react';
import SplashStyles from './SplashStyles/SplashStyles';
import {
  loadTokens,
  loadLoginCredentials,
  clearLoginCredentials,
} from '../utils/tokenStorage';
import {useDispatch, useSelector} from 'react-redux';
import {fetchLogin} from '../../services/userRedux/userSlice';
import {resetUser} from '../../services/userRedux/userReducer';
import {AppDispatch, RootState} from '../../services/store/store';

const Splash = ({navigation}: any) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        console.log('🔍 Checking login status...');

        // Check if we have valid tokens first
        const tokens = await loadTokens();

        if (tokens && tokens.refreshToken) {
          console.log('✅ Found valid tokens, navigating to BottomTabs');
          // If we have valid tokens, go directly to main app
          setTimeout(() => {
            navigation.replace('BottomTabs');
          }, 2000);
          return;
        }

        // If no tokens found, ensure Redux state is also cleared
        console.log('⚠️ No tokens found, ensuring Redux state is cleared');
        dispatch(resetUser());

        // If no tokens, check for saved login credentials
        const savedCredentials = await loadLoginCredentials();

        if (
          savedCredentials &&
          savedCredentials.username &&
          savedCredentials.password
        ) {
          console.log('🔐 Found saved credentials, attempting auto-login...');

          try {
            // Attempt to login with saved credentials
            const result = await dispatch(
              fetchLogin({
                username: savedCredentials.username,
                password: savedCredentials.password,
              }),
            );

            if (fetchLogin.fulfilled.match(result)) {
              console.log('✅ Auto-login successful');
              setTimeout(() => {
                navigation.replace('BottomTabs');
              }, 2000);
              return;
            } else {
              console.log('❌ Auto-login failed, clearing saved credentials');
              // Clear invalid credentials
              await clearLoginCredentials();
            }
          } catch (error) {
            console.log('❌ Auto-login error:', error);
            // Clear invalid credentials
            await clearLoginCredentials();
          }
        }

        // If no saved credentials or auto-login failed, go to start screens
        console.log('⚠️ No saved login found, navigating to Start1');
        setTimeout(() => {
          navigation.navigate('Start1');
        }, 2000);
      } catch (error) {
        console.error('❌ Error checking login status:', error);
        // On error, go to start screens
        setTimeout(() => {
          navigation.navigate('Start1');
        }, 2000);
      }
    };

    checkLoginStatus();
  }, [navigation, dispatch]);

  return (
    <View style={SplashStyles.container}>
      <Image source={require('../../assets/images/img_splash.png')} />
    </View>
  );
};

export default Splash;
