import {Image, Text, TouchableOpacity, View} from 'react-native';
import Wrapper from '../../../components/Wrapper';
import ButtonIcon from '../../../components/ButtonIcon';
import colors from '../../Color';
import WelcomePageStyles from '../../Styles/WelcomePageStyles';
import AppStyles from '../../Styles/AppStyles';
import SignInStyles from '../../Styles/SignInStyles';
import InputComponent from '../../../components/InputComponent';
import {useState} from 'react';
import TextLink from '../../../components/TextLink';
import ButtonActive from '../../../components/ButtonActive';
import LoginStyles from '../../Styles/LoginStyles';
import {login, getMe} from '../../api/users';
import {saveTokens} from '../../utils/tokenStorage';
import {useDispatch} from 'react-redux';
import {setUser} from '../../store/slices/userSlice';
import {AppDispatch} from '../../store/store';

export const SignIn = ({navigation}: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [hide, setHide] = useState(true);
  const [check, setCheck] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!userName || !password) {
      setErr('Username and password are required.');
      return;
    }

    setLoading(true);
    setErr(null);

    try {
      // call /login
      const {data: loginData} = await login({username: userName, password});
      const {accessToken, refreshToken} = loginData;
      await saveTokens({accessToken, refreshToken});

      // call /me
      const {data: me} = await getMe();
      // put it into Redux:
      dispatch(setUser(me.user));
      console.log('fetched user profile:', me);
      navigation.replace('BottomTabs', {user: me});
    } catch (e: any) {
      console.error('SignIn API error:', e);
      setErr(
        e.response?.data?.message ??
          'Could not sign in. Please check your credentials.',
      );
    } finally {
      setLoading(false);
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
          text={loading ? 'Signing in…' : 'Sign In'}
          color={colors.white}
          bgColor={colors.primary}
          width="90%"
          radius={50}
          borderColor={colors.primary}
          disabled={loading || !userName || !password}
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
