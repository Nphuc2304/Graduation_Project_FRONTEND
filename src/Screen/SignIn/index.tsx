import {Image, Text, TouchableOpacity, View} from 'react-native';
import Wrapper from '../../../components/Wrapper';
import ButtonIcon from '../../../components/ButtonIcon';
import colors from '../../Color';
import WelcomePageStyles from '../../Styles/WelcomePageStyles';
import AppStyles from '../../Styles/AppStyles';
import SignInStyles from '../../Styles/SignInStyles';
import InputComponent from '../../../components/InputComponent';
import {useState, useEffect} from 'react';
import TextLink from '../../../components/TextLink';
import ButtonActive from '../../../components/ButtonActive';
import LoginStyles from '../../Styles/LoginStyles';
import {
  saveTokens,
  saveLoginCredentials,
  clearLoginCredentials,
} from '../../utils/tokenStorage';
import {useDispatch, useSelector} from 'react-redux';
import {fetchLogin} from '../../../services/userRedux/userSlice';
import {AppDispatch, RootState} from '../../../services/store/store';

export const SignIn = ({navigation}: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const {isLoading, isError, errorMessage, isSuccess, user} = useSelector(
    (state: RootState) => state.user,
  );

  // Debug Redux state
  console.log('🔍 SignIn Redux state:', {
    isLoading,
    isError,
    errorMessage,
    isSuccess,
    user: user ? 'present' : 'null',
  });
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [hide, setHide] = useState(true);
  const [check, setCheck] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // Handle successful login
  useEffect(() => {
    console.log(
      '🔄 SignIn useEffect - isSuccess:',
      isSuccess,
      'user:',
      user ? 'present' : 'null',
    );
    if (isSuccess && user) {
      console.log('✅ Login successful, navigating to BottomTabs');
      // Navigate to bottom tabs without passing user data
      navigation.replace('BottomTabs');
    }
  }, [isSuccess, user, navigation]);

  // Handle login error
  useEffect(() => {
    console.log(
      '🔄 SignIn useEffect - isError:',
      isError,
      'errorMessage:',
      errorMessage,
    );
    if (isError && errorMessage) {
      console.log('❌ Setting error message:', errorMessage);
      setErr(errorMessage);
    }
  }, [isError, errorMessage]);

  const handleSignIn = async () => {
    if (!userName || !password) {
      setErr('Username and password are required.');
      return;
    }

    setErr(null);
    console.log('Attempting to sign in with username:', userName);

    try {
      // Dispatch the login action
      const result = await dispatch(fetchLogin({username: userName, password}));

      console.log('Login result:', result);

      // If login was successful, save tokens and handle "Remember me"
      if (fetchLogin.fulfilled.match(result)) {
        const {refreshToken, accessToken} = result.payload;
        await saveTokens({accessToken, refreshToken});
        console.log('Login successful, tokens saved');

        // Handle "Remember me" functionality
        if (check) {
          try {
            await saveLoginCredentials({username: userName, password});
            console.log('✅ Login credentials saved for "Remember me"');
          } catch (error) {
            console.error('❌ Failed to save login credentials:', error);
          }
        } else {
          // If "Remember me" is not checked, clear any previously saved credentials
          try {
            await clearLoginCredentials();
            console.log('✅ Cleared previously saved login credentials');
          } catch (error) {
            console.error('❌ Failed to clear login credentials:', error);
          }
        }
      } else if (fetchLogin.rejected.match(result)) {
        console.log('Login rejected:', result.error);
        setErr(result.error?.message || 'Login failed');
      }
    } catch (e: any) {
      console.error('SignIn error:', e);
      setErr('Could not sign in. Please check your credentials.');
    }
  };

  return (
    <Wrapper>
      <ButtonIcon
        icon={require('../../../assets/icons/back.png')}
        bgColor={colors.gray}
        iconColor={colors.black}
        borderRa="50%"
        styles={{position: 'absolute', top: 15, left: 15, zIndex: 1}}
        func={() => {
          navigation.goBack();
        }}
      />
      <View style={AppStyles.container}>
        <Image
          style={WelcomePageStyles.logo}
          source={require('../../../assets/images/img_splash.png')}
        />
        <Text style={SignInStyles.title}>Start your journey</Text>
        <InputComponent
          label="Username *"
          placeholder="Enter your username"
          width="90%"
          value={userName}
          onChangeText={setUserName}
          mgBottom={20}
          err={err}
        />
        <InputComponent
          label="Password *"
          placeholder="Enter your password"
          width="90%"
          value={password}
          onChangeText={setPassword}
          mgBottom={10}
          icon={require('../../../assets/icons/eye.png')}
          secureTextEntry={hide}
          hidden={() => setHide(!hide)}
          err={err}
        />
        <View style={SignInStyles.rememberContainer}>
          <TouchableOpacity
            style={SignInStyles.checkbox}
            onPress={() => {
              setCheck(!check);
            }}>
            <Image
              style={[
                SignInStyles.iconRemember,
                {tintColor: check ? colors.primary : colors.transparent},
              ]}
              source={require('../../../assets/icons/check.png')}
            />
          </TouchableOpacity>
          <Text>Remember me</Text>
        </View>
        <TextLink text="Forgot password?" color={colors.primary} mg={20} />
        <ButtonActive
          text={isLoading ? 'Signing in…' : 'Sign In'}
          color={colors.white}
          bgColor={colors.primary}
          width="90%"
          radius={50}
          borderColor={colors.primary}
          disabled={isLoading || !userName || !password}
          func={handleSignIn}
        />
        <View style={[AppStyles.rowContainer, {marginTop: 50}]}>
          <Text style={LoginStyles.textBlack}>Don't have an account. </Text>
          <TextLink
            text="Sign up"
            color={colors.primary}
            func={() => {
              navigation.navigate('SignUp');
            }}
          />
        </View>
      </View>
    </Wrapper>
  );
};
