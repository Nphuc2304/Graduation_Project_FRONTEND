import {Image, Text, TouchableOpacity, View} from 'react-native';
import ButtonActive from '../../components/ButtonActive';
import colors from '../Color';
import TextLink from '../../components/TextLink';
import AppStyles from '../Styles/AppStyles';
import ButtonIcon from '../../components/ButtonIcon';
import LoginStyles from '../Styles/LoginStyles';

const Login = ({navigation}: any) => {
  return (
    <View style={AppStyles.container}>
      <ButtonIcon
        icon={require('../../assets/icons/back.png')}
        bgColor={colors.gray}
        iconColor={colors.black}
        borderRa="50%"
      />
      <Image
        style={LoginStyles.img}
        source={require('../../assets/images/img_login.png')}
      />
      <Text style={LoginStyles.title}>LET'S GET YOU IN</Text>
      <ButtonActive
        text="Sign in with password"
        bgColor={colors.primary}
        borderColor={colors.primary}
        color={colors.white}
        width="85%"
      />
      <Text style={LoginStyles.text}>Or</Text>
      <View style={[AppStyles.rowContainerSpace, {width: '40%'}]}>
        <TouchableOpacity>
          <Image source={require('../../assets/icons/Google.png')} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('../../assets/icons/Facebook.png')} />
        </TouchableOpacity>
      </View>
      <View style={[AppStyles.rowContainer, {marginTop: 30}]}>
        <Text style={LoginStyles.textBlack}>Don't have an account. </Text>
        <TextLink text="Sign up" color={colors.primary} />
      </View>
    </View>
  );
};

export default Login;
