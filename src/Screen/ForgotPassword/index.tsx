import {Image, ScrollView, Text, View} from 'react-native';
import Wrapper from '../../../components/Wrapper';
import ButtonIcon from '../../../components/ButtonIcon';
import colors from '../../Color';
import WelcomePageStyles from '../../Styles/WelcomePageStyles';
import AppStyles from '../../Styles/AppStyles';
import SignInStyles from '../../Styles/SignInStyles';
import InputComponent from '../../../components/InputComponent';
import {useState, useEffect} from 'react';
import ButtonActive from '../../../components/ButtonActive';
import {useDispatch, useSelector} from 'react-redux';
import {fetchForgotPassword} from '../../../services/userRedux/userSlice';
import {resetForgotPasswordStatus} from '../../../services/userRedux/userReducer';
import {AppDispatch, RootState} from '../../../services/store/store';

export const ForgotPassword = ({navigation}: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    isLoadingForgotPassword,
    isSuccessForgotPassword,
    isErrorForgotPassword,
    errorMessageForgotPassword,
    emailToken,
  } = useSelector((state: RootState) => state.user);

  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  const isFormValid = email.trim() !== '' && newPassword.trim() !== '';

  // Handle success and navigate to verification screen
  useEffect(() => {
    if (isSuccessForgotPassword && emailToken) {
      console.log('✅ Forgot password successful, navigating to Verification');
      navigation.navigate('Verification', { 
        email: email,
        newPassword: newPassword,
        emailToken: emailToken
      });
      // Reset the status
      dispatch(resetForgotPasswordStatus());
    }
  }, [isSuccessForgotPassword, emailToken, email, newPassword, navigation, dispatch]);

  useEffect(() => {
    if (isErrorForgotPassword && errorMessageForgotPassword) {
      console.log('❌ Forgot password error:', errorMessageForgotPassword);
      setErr(errorMessageForgotPassword);
    }
  }, [isErrorForgotPassword, errorMessageForgotPassword]);

  // Clear Redux status when component unmounts or when user starts typing
  useEffect(() => {
    return () => {
      dispatch(resetForgotPasswordStatus());
    };
  }, [dispatch]);

  const handleSendCode = async () => {
    if (!email || !newPassword) {
      setErr('Both email and new password are required.');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErr('Please enter a valid email address.');
      return;
    }

    if (newPassword.length < 6) {
      setErr('Password must be at least 6 characters long.');
      return;
    }

    setErr(null);
    console.log('Attempting to send confirmation code to:', email);

    try {
      const result = await dispatch(fetchForgotPassword({
        email: email,
        newPassword: newPassword
      }));

      console.log('Forgot password result:', result);

      if (fetchForgotPassword.rejected.match(result)) {
        console.log('Forgot password rejected:', result.error);
      }
    } catch (error: any) {
      console.error('Forgot password error:', error);
      setErr('Failed to send confirmation code. Please try again.');
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
          <Text style={SignInStyles.title}>Reset Your Password</Text>
          
          <InputComponent
            label="Email Address *"
            placeholder="Enter your email"
            width="90%"
            value={email}
            onChangeText={(text: string) => {
              setEmail(text);
              setErr(null); // Clear error when user types
              // Clear Redux error when user starts typing
              if (isErrorForgotPassword) {
                dispatch(resetForgotPasswordStatus());
              }
            }}
            mgBottom={20}
            err={err}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          
          <InputComponent
            label="New Password *"
            placeholder="Enter your new password"
            width="90%"
            value={newPassword}
            onChangeText={(text: string) => {
              setNewPassword(text);
              setErr(null); // Clear error when user types
              // Clear Redux error when user starts typing
              if (isErrorForgotPassword) {
                dispatch(resetForgotPasswordStatus());
              }
            }}
            mgBottom={30}
            icon={require('../../../assets/icons/eye.png')}
            secureTextEntry={hidePassword}
            hidden={() => setHidePassword(!hidePassword)}
            err={err}
          />

          <ButtonActive
            text={isLoadingForgotPassword ? 'Sending Code...' : 'Send Confirmation Code'}
            color={colors.white}
            bgColor={isFormValid ? colors.primary : colors.gray}
            width="90%"
            radius={50}
            borderColor={isFormValid ? colors.primary : colors.gray}
            disabled={!isFormValid || isLoadingForgotPassword}
            func={handleSendCode}
          />
        </View>
      </ScrollView>
    </Wrapper>
  );
};