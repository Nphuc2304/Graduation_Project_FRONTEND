import {Image, Text, TouchableOpacity, View} from 'react-native';
import Wrapper from '../../components/Wrapper';
import ButtonIcon from '../../components/ButtonIcon';
import colors from '../Color';
import WelcomePageStyles from '../Styles/WelcomePageStyles';
import AppStyles from '../Styles/AppStyles';
import SignInStyles from '../Styles/SignInStyles';
import InputComponent from '../../components/InputComponent';
import {useState} from 'react';
import TextLink from '../../components/TextLink';
import ButtonActive from '../../components/ButtonActive';
import LoginStyles from '../Styles/LoginStyles';

const SignIn = ({navigation}: any) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [hide, setHide] = useState(true);
  const [check, setCheck] = useState(false);
  const [err, setErr] = useState('');
  return (
    <Wrapper>
      <ButtonIcon
        icon={require('../../assets/icons/back.png')}
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
          source={require('../../assets/images/img_splash.png')}
        />
        <Text style={SignInStyles.title}>Start your journey</Text>
        <InputComponent
          label="Username (or) email *"
          placeholder="Enter your username(or)email"
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
          icon={require('../../assets/icons/eye.png')}
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
              source={require('../../assets/icons/check.png')}
            />
          </TouchableOpacity>
          <Text>Remember me</Text>
        </View>
        <TextLink text="Forgot password?" color={colors.primary} mg={20} />
        <ButtonActive
          text="Sign In"
          color={colors.white}
          bgColor={colors.primary}
          width="90%"
          radius={50}
          borderColor={colors.primary}
          disabled={!(userName !== '' && password !== '')}
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

export default SignIn;
