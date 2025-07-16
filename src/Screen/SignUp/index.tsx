import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import Wrapper from '../../../components/Wrapper';
import ButtonIcon from '../../../components/ButtonIcon';
import colors from '../../Color';
import AppStyles from '../../Styles/AppStyles';
import WelcomePageStyles from '../../Styles/WelcomePageStyles';
import SignInStyles from '../../Styles/SignInStyles';
import InputComponent from '../../../components/InputComponent';
import {useState, useEffect} from 'react';
import ButtonActive from '../../../components/ButtonActive';
import LoginStyles from '../../Styles/LoginStyles';
import TextLink from '../../../components/TextLink';
import {useDispatch, useSelector} from 'react-redux';
import {fetchSignup} from '../../../services/userRedux/userSlice';
import {RootState} from '../../../services/store/store';
import {saveTokens} from '../../utils/tokenStorage';

export const SignUp = ({navigation}: any) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [hide, setHide] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  const dispatch = useDispatch();
  const {isLoadingSignup, isErrorSignup, isSuccessSignup, errorMessageSignup} =
    useSelector((state: RootState) => state.user);

  // Handle signup success
  useEffect(() => {
    if (isSuccessSignup) {
      // Navigate to main app
      navigation.navigate('BottomTabs');
    }
  }, [isSuccessSignup, navigation]);

  // Handle signup error
  useEffect(() => {
    if (isErrorSignup && errorMessageSignup) {
      console.log('Signup error:', errorMessageSignup);
      setErr(errorMessageSignup);
    }
  }, [isErrorSignup, errorMessageSignup]);

  const testAPI = async () => {
    try {
      const response = await fetch(
        'https://graduation-project-backend-jio7.onrender.com/users/signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: 'testuser123',
            password: 'testpass123',
          }),
        },
      );

      const data = await response.json();
      console.log('🔍 Direct API test response:', {
        status: response.status,
        data: data,
      });

      Alert.alert(
        'API Test',
        `Status: ${response.status}\nData: ${JSON.stringify(data, null, 2)}`,
      );
    } catch (error: any) {
      console.error('🔍 Direct API test error:', error);
      Alert.alert('API Test Error', error.message || 'Unknown error');
    }
  };

  const handleSignUp = async () => {
    // Clear previous errors
    setErr(null);

    // Validation
    if (!userName.trim()) {
      setErr('Username không được để trống.');
      return;
    }

    if (!password.trim()) {
      setErr('Password không được để trống.');
      return;
    }

    if (password.length < 6) {
      setErr('Password phải có ít nhất 6 ký tự.');
      return;
    }

    if (userName.length < 3) {
      setErr('Username phải có ít nhất 3 ký tự.');
      return;
    }

    try {
      console.log('🚀 Attempting signup with:', {
        username: userName,
        password: '***',
        url: 'https://graduation-project-backend-jio7.onrender.com/users/signup',
      });

      // Dispatch signup action
      const result = await dispatch(
        fetchSignup({username: userName.trim(), password}) as any,
      );

      console.log('📋 Signup result:', {
        fulfilled: fetchSignup.fulfilled.match(result),
        rejected: fetchSignup.rejected.match(result),
        payload: result.payload,
        error: result.error,
      });

      // If successful, save tokens
      if (fetchSignup.fulfilled.match(result)) {
        const {accessToken, newRefreshToken} = result.payload;
        await saveTokens({accessToken, refreshToken: newRefreshToken});
        console.log('✅ Signup successful, tokens saved');
      } else if (fetchSignup.rejected.match(result)) {
        console.log('❌ Signup rejected:', result.error);
        setErr(result.error?.message || 'Đăng ký thất bại');
      }
    } catch (error) {
      console.error('💥 Signup error:', error);
      setErr('Đăng ký thất bại. Vui lòng thử lại.');
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
      <ScrollView>
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
            mgBottom={10}
            err={err}
          />
          {/* <InputComponent
            label="Email *"
            placeholder="Enter your email"
            width="90%"
            value={email}
            onChangeText={setEmail}
            mgBottom={10}
            err={err}
          />
          <InputComponent
            label="Phone Number *"
            placeholder="Enter your phone number"
            width="90%"
            value={phone}
            onChangeText={setPhone}
            mgBottom={10}
            err={err}
          /> */}
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
          <TouchableOpacity
            onPress={testAPI}
            style={{
              backgroundColor: colors.gray,
              padding: 10,
              borderRadius: 25,
              marginTop: 10,
              width: '90%',
              alignItems: 'center',
            }}>
            <Text style={{color: colors.black}}>Test API</Text>
          </TouchableOpacity>
          <Text
            style={[LoginStyles.textBlack, {marginTop: 20, marginBottom: 30}]}>
            Or continue with
          </Text>
          <View style={[AppStyles.rowContainerSpace, {width: '40%'}]}>
            <TouchableOpacity>
              <Image source={require('../../../assets/icons/Google.png')} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={require('../../../assets/icons/Facebook.png')} />
            </TouchableOpacity>
          </View>
          <View style={[AppStyles.rowContainer, {marginVertical: 30}]}>
            <Text style={LoginStyles.textBlack}>Already have an account? </Text>
            <TextLink
              text="Sign in"
              color={colors.primary}
              func={() => {
                navigation.navigate('SignIn');
              }}
            />
          </View>
        </View>
      </ScrollView>
    </Wrapper>
  );
};
