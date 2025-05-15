import {Image, Text, TouchableOpacity, View} from 'react-native';
import ButtonActive from '../../../components/ButtonActive';
import colors from '../../Color';
import TextLink from '../../../components/TextLink';
import AppStyles from '../../Styles/AppStyles';
import ButtonIcon from '../../../components/ButtonIcon';
import LoginStyles from '../../Styles/LoginStyles';

export const Login = ({navigation}: any) => {
  return (
    <View style={AppStyles.container}>
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
      <Image
        style={LoginStyles.img}
        source={require('../../../assets/images/img_login.png')}
      />
      <Text style={LoginStyles.title}>LET'S GET YOU IN</Text>
      <ButtonActive
        text="Sign in with password"
        bgColor={colors.primary}
        borderColor={colors.primary}
        color={colors.white}
        width="85%"
        radius={50}
        func={() => {
          navigation.navigate('Welcome');
        }}
      />
      <Text style={LoginStyles.text}>Or</Text>
      <View style={[AppStyles.rowContainerSpace, {width: '40%'}]}>
        <TouchableOpacity>
          <Image source={require('../../../assets/icons/Google.png')} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('../../../assets/icons/Facebook.png')} />
        </TouchableOpacity>
      </View>
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
  );
};
