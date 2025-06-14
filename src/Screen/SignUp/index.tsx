import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Wrapper from '../../../components/Wrapper';
import ButtonIcon from '../../../components/ButtonIcon';
import colors from '../../Color';
import AppStyles from '../../Styles/AppStyles';
import WelcomePageStyles from '../../Styles/WelcomePageStyles';
import SignInStyles from '../../Styles/SignInStyles';
import InputComponent from '../../../components/InputComponent';
import {useState} from 'react';
import ButtonActive from '../../../components/ButtonActive';
import LoginStyles from '../../Styles/LoginStyles';
import TextLink from '../../../components/TextLink';
import {signup} from '../../api/users';
import {saveTokens} from '../../utils/tokenStorage';

export const SignUp = ({navigation}: any) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [hide, setHide] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!userName || !password) {
      setErr('Username and password are required.');
      return;
    }

    setLoading(true);
    setErr(null);

    try {
      const {data} = await signup({username: userName, password});
      const {accessToken, refreshToken} = data;
      await saveTokens({accessToken, refreshToken});

      navigation.navigate('BottomTabs');
    } catch (err: any) {
      console.error('SignUp API error:', err);
      setErr(err.response?.data?.message ?? 'Unexpected network error');
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
            text={loading ? 'Signing up…' : 'Sign Up'}
            color={colors.white}
            bgColor={colors.primary}
            width="90%"
            radius={50}
            borderColor={colors.primary}
            disabled={loading || !userName || !password}
            func={handleSignUp}
          />
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
      </ScrollView>
    </Wrapper>
  );
};
