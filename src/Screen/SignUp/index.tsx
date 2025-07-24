import React, { useState, useEffect } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View, Alert } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useAppDispatch, useAppSelector } from '../../../services/store/hooks';

import Wrapper from '../../../components/Wrapper';
import InputComponent from '../../../components/InputComponent';
import ButtonActive from '../../../components/ButtonActive';
import TextLink from '../../../components/TextLink';
import colors from '../../Color';
import AppStyles from '../../Styles/AppStyles';
import WelcomePageStyles from '../../Styles/WelcomePageStyles';
import SignInStyles from '../../Styles/SignInStyles';
import LoginStyles from '../../Styles/LoginStyles';

import { fetchSignup, fetchGoogleLogin } from '../../../services/userRedux/userSlice';
import { RootState } from '../../../services/store/store';
import { saveTokens } from '../../utils/tokenStorage';

export const SignUp = ({ navigation }: any) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [hide, setHide] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const {
    isLoadingSignup,
    isErrorSignup,
    isSuccessSignup,
    errorMessageSignup,
    isLoadingGoogleLogin,
    isSuccessGoogleLogin,
    errorMessageGoogleLogin,
  } = useAppSelector((state: RootState) => state.user);

  // Navigate after normal signup
  useEffect(() => {
    if (isSuccessSignup) {
      navigation.replace('BottomTabs');
    }
  }, [isSuccessSignup, navigation]);

  // Navigate after Google login
  useEffect(() => {
    if (isSuccessGoogleLogin) {
      navigation.replace('BottomTabs');
    }
    if (errorMessageGoogleLogin) {
      setErr(errorMessageGoogleLogin);
    }
  }, [isSuccessGoogleLogin, errorMessageGoogleLogin, navigation]);

  // Google Sign‑In handler
  const handleGoogleSignIn = async () => {
    setErr(null);
    try {
      await GoogleSignin.signOut();
      await GoogleSignin.hasPlayServices();

      // 1) signIn() now returns the user directly
      const userInfo = await GoogleSignin.signIn();
      console.log('Google user info:', userInfo);

      // 2) fetch tokens separately
      const { idToken, accessToken } = await GoogleSignin.getTokens();
      console.log("idToken:", idToken);
      console.log("accessToken:", accessToken);

      if (!idToken) throw new Error('ID token not returned');
      if (!accessToken) throw new Error('Access token not returned');

      // 3) dispatch 
      const result = await dispatch(fetchGoogleLogin({ googleToken: accessToken }));
      if (fetchGoogleLogin.fulfilled.match(result)) {
        const { accessToken: backendAT, refreshToken } = result.payload;
        await saveTokens({ accessToken: backendAT, refreshToken });
      }
    } catch (error: any) {
      console.error('Google Sign‑In error', error);
      setErr(error.message || 'Google đăng nhập thất bại');
    }
  };

  // Normal signup handler
  const handleSignUp = async () => {
    setErr(null);
    if (!userName.trim()) return setErr('Username không được để trống.');
    if (!password.trim()) return setErr('Password không được để trống.');
    if (userName.length < 3) return setErr('Username phải có ít nhất 3 ký tự.');
    if (password.length < 6) return setErr('Password phải có ít nhất 6 ký tự.');

    const result = await dispatch(fetchSignup({ username: userName.trim(), password }) as any);
    if (fetchSignup.fulfilled.match(result)) {
      const { accessToken, newRefreshToken } = result.payload;
      await saveTokens({ accessToken, refreshToken: newRefreshToken });
    } else {
      setErr(result.error?.message || 'Đăng ký thất bại');
    }
  };

  return (
    <Wrapper>
      <ScrollView>
        <View style={AppStyles.container}>
          <Image style={WelcomePageStyles.logo} source={require('../../../assets/images/img_splash.png')} />
          <Text style={SignInStyles.title}>Start your journey</Text>

          <InputComponent
            label="Username *"
            placeholder="Enter your username"
            width="90%"
            value={userName}
            onChangeText={setUserName}
            mgBottom={10}
            err={err}
          />

          <InputComponent
            label="Password *"
            placeholder="Enter your password"
            width="90%"
            value={password}
            onChangeText={setPassword}
            mgBottom={20}
            icon={require('../../../assets/icons/eye.png')}
            secureTextEntry={hide}
            hidden={() => setHide(!hide)}
            err={err}
          />

          <ButtonActive
            text={isLoadingSignup ? 'Signing up…' : 'Sign Up'}
            color={colors.white}
            bgColor={colors.primary}
            width="90%"
            radius={50}
            borderColor={colors.primary}
            disabled={isLoadingSignup || !userName || !password}
            func={handleSignUp}
          />

          <Text style={[LoginStyles.textBlack, { marginVertical: 20 }]}>
            Or continue with
          </Text>

          <TouchableOpacity onPress={handleGoogleSignIn} disabled={isLoadingGoogleLogin}>
            <Image source={require('../../../assets/icons/Google.png')} />
          </TouchableOpacity>

          <View style={[AppStyles.rowContainer, { marginVertical: 30 }]}>
            <Text style={LoginStyles.textBlack}>Already have an account? </Text>
            <TextLink text="Sign in" color={colors.primary} func={() => navigation.navigate('SignIn')} />
          </View>
        </View>
      </ScrollView>
    </Wrapper>
  );
};
