import {Image, ScrollView, Text, View, TextInput, TouchableOpacity} from 'react-native';
import Wrapper from '../../../components/Wrapper';
import ButtonIcon from '../../../components/ButtonIcon';
import colors from '../../Color';
import WelcomePageStyles from '../../Styles/WelcomePageStyles';
import AppStyles from '../../Styles/AppStyles';
import SignInStyles from '../../Styles/SignInStyles';
import {useState, useRef, useEffect} from 'react';
import ButtonActive from '../../../components/ButtonActive';
import TextLink from '../../../components/TextLink';
import {useDispatch, useSelector} from 'react-redux';
import {fetchConfirmForgotPassword, fetchForgotPassword} from '../../../services/userRedux/userSlice';
import {resetConfirmForgotPasswordStatus, resetForgotPasswordStatus} from '../../../services/userRedux/userReducer';
import {AppDispatch, RootState} from '../../../services/store/store';

export const Verification = ({navigation, route}: any) => {
  const {email, newPassword, emailToken} = route.params;
  const dispatch = useDispatch<AppDispatch>();
  
  const {
    isLoadingConfirmForgotPassword,
    isSuccessConfirmForgotPassword,
    isErrorConfirmForgotPassword,
    errorMessageConfirmForgotPassword,
    isLoadingForgotPassword,
    isSuccessForgotPassword,
    emailToken: newEmailToken,
  } = useSelector((state: RootState) => state.user);

  const [codes, setCodes] = useState(['', '', '', '', '', '']);
  const [err, setErr] = useState<string | null>(null);
  
  const inputRefs = useRef<(TextInput | null)[]>([]);
  
  // Check if all codes are filled
  const isCodeComplete = codes.every(code => code !== '');

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  useEffect(() => {
    if (isSuccessConfirmForgotPassword) {
      console.log('✅ Password reset confirmed successfully');
      // Navigate back to SignIn screen
      navigation.navigate('SignIn');
      // Reset the status 
      dispatch(resetConfirmForgotPasswordStatus());
    }
  }, [isSuccessConfirmForgotPassword, navigation, dispatch]);

  // Handle confirmation error
  useEffect(() => {
    if (isErrorConfirmForgotPassword && errorMessageConfirmForgotPassword) {
      console.log('❌ Confirmation error:', errorMessageConfirmForgotPassword);
      setErr(errorMessageConfirmForgotPassword);
    }
  }, [isErrorConfirmForgotPassword, errorMessageConfirmForgotPassword]);

  // Handle successful resend
  useEffect(() => {
    if (isSuccessForgotPassword && newEmailToken) {
      console.log('✅ Code resent successfully');
      // Clear current codes and focus first input
      setCodes(['', '', '', '', '', '']);
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
      // Reset the status
      dispatch(resetForgotPasswordStatus());
    }
  }, [isSuccessForgotPassword, newEmailToken, dispatch]);

  // Clear Redux status when component unmounts
  useEffect(() => {
    return () => {
      dispatch(resetConfirmForgotPasswordStatus());
      dispatch(resetForgotPasswordStatus());
    };
  }, [dispatch]);

  const handleCodeChange = (text: string, index: number) => {
    // Only allow single digit
    const sanitizedText = text.replace(/[^0-9]/g, '').slice(0, 1);
    
    const newCodes = [...codes];
    newCodes[index] = sanitizedText;
    setCodes(newCodes);
    setErr(null); // Clear error when user types
    
    // Clear Redux error when user starts typing
    if (isErrorConfirmForgotPassword) {
      dispatch(resetConfirmForgotPasswordStatus());
    }

    // Auto-focus next input if current input is filled
    if (sanitizedText !== '' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    // Handle backspace to move to previous input
    if (key === 'Backspace' && codes[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    if (!isCodeComplete) {
      setErr('Please enter all 6 digits.');
      return;
    }

    const fullCode = codes.join('');
    setErr(null);

    console.log('Attempting to confirm code:', fullCode);
    console.log('Using emailToken:', emailToken);

    try {
      // Dispatch the confirm forgot password action
      const result = await dispatch(fetchConfirmForgotPassword({
        emailToken: emailToken,
        confirmationCode: fullCode
      }));

      console.log('Confirm forgot password result:', result);

      if (fetchConfirmForgotPassword.rejected.match(result)) {
        console.log('Confirm forgot password rejected:', result.error);
      }
    } catch (error: any) {
      console.error('Confirm forgot password error:', error);
      setErr('Failed to confirm code. Please try again.');
    }
  };

  const handleResendCode = async () => {
    setErr(null);

    console.log('Attempting to resend confirmation code to:', email);

    try {
      // Dispatch the forgot password action again to resend code
      const result = await dispatch(fetchForgotPassword({
        email: email,
        newPassword: newPassword
      }));

      console.log('Resend code result:', result);

      if (fetchForgotPassword.rejected.match(result)) {
        console.log('Resend code rejected:', result.error);
        setErr('Failed to resend code. Please try again.');
      }
    } catch (error: any) {
      console.error('Resend code error:', error);
      setErr('Failed to resend code. Please try again.');
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
          <Text style={SignInStyles.title}>Enter Confirmation Code</Text>
          
          <Text style={[AppStyles.textNormal, {textAlign: 'center', marginBottom: 30, paddingHorizontal: 20}]}>
            We've sent a 6-digit confirmation code to{'\n'}
            <Text style={{fontWeight: 'bold', color: colors.primary}}>{email}</Text>
          </Text>

          {/* Code Input Boxes */}
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '85%',
            marginBottom: 20,
            paddingHorizontal: 10,
          }}>
            {codes.map((code, index) => (
              <TextInput
                key={index}
                ref={(ref) => { 
                  inputRefs.current[index] = ref; 
                }}
                style={{
                  width: 45,
                  height: 45,
                  borderWidth: 2,
                  borderColor: code ? colors.primary : (err ? colors.red : colors.gray),
                  borderRadius: 8,
                  textAlign: 'center',
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: colors.black,
                  backgroundColor: colors.white,
                }}
                value={code}
                onChangeText={(text) => handleCodeChange(text, index)}
                onKeyPress={({nativeEvent}) => handleKeyPress(nativeEvent.key, index)}
                keyboardType="numeric"
                maxLength={1}
                selectTextOnFocus
              />
            ))}
          </View>

          {err && (
            <Text style={{
              color: colors.red,
              fontSize: 14,
              textAlign: 'center',
              marginBottom: 20,
              paddingHorizontal: 20,
            }}>
              {err}
            </Text>
          )}

          <TouchableOpacity 
            onPress={handleResendCode} 
            disabled={isLoadingForgotPassword}
            style={{marginBottom: 30}}
          >
            <Text style={{
              color: colors.primary,
              fontSize: 16,
              textAlign: 'center',
              textDecorationLine: 'underline',
            }}>
              {isLoadingForgotPassword ? 'Resending...' : 'Resend Code'}
            </Text>
          </TouchableOpacity>

          <ButtonActive
            text={isLoadingConfirmForgotPassword ? 'Confirming...' : 'Confirm & Reset Password'}
            color={colors.white}
            bgColor={isCodeComplete ? colors.primary : colors.gray}
            width="90%"
            radius={50}
            borderColor={isCodeComplete ? colors.primary : colors.gray}
            disabled={!isCodeComplete || isLoadingConfirmForgotPassword}
            func={handleSubmit}
          />
        </View>
      </ScrollView>
    </Wrapper>
  );
};