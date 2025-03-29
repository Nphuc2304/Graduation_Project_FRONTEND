import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import ButtonIcon from '../../components/ButtonIcon';
import Colors from '../Color';
import AppStyles from '../Styles/AppStyles';
import ForgotStyles from '../Styles/ForgotStyle';

const ForgotPassword = ({navigation}: any) => {
  const [isForcus, setIsForcus] = useState(false);
  const [value, setValue] = useState('');
  const [err, setErr] = useState(false);

  const hanldeRequest = () => {
    if (!value) {
      setErr(true);
    } else {
      setErr(false);
    }
  };

  const onChangeText = ({text}: any) => {
    setValue(text);
    setErr(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={AppStyles.container}>
      <ButtonIcon
        icon={require('../../assets/icons/back.png')}
        bgColor={Colors.gray}
        iconColor={Colors.black}
        borderRa="50%"
        styles={{position: 'absolute', top: 50, left: 20, zIndex: 1}}
        func={() => {
          navigation.goBack();
        }}
      />
      <View style={ForgotStyles.content}>
        <Text style={ForgotStyles.txtForgot}>Forgot Password</Text>
        <Text style={ForgotStyles.txtNotification}>
          Provide your phone number (or) email address for which you want to
          reset your password
        </Text>
        <Text
          style={[
            ForgotStyles.txtPhoneOrEmail,
            err && ForgotStyles.txtPhoneOrEmailErr,
          ]}>
          Phone Number (or) Email
        </Text>
        <View style={ForgotStyles.viewInput}>
          <View
            style={[
              ForgotStyles.textInput,
              isForcus && ForgotStyles.textInputForcus,
              err && ForgotStyles.textInputInvalid,
            ]}>
            <TextInput
              style={ForgotStyles.input}
              onChangeText={onChangeText}
              placeholder="Phone Number (or) Email"
              placeholderTextColor={Colors.darkGray}
              onFocus={() => setIsForcus(true)}
            />
          </View>
          {err && (
            <Image
              style={ForgotStyles.imgError}
              source={require('../../assets/images/Error.png')}
            />
          )}
        </View>
        {err && (
          <Text style={ForgotStyles.textInvalid}>
            Phone number (or) email is invalid
          </Text>
        )}
      </View>
      <TouchableOpacity style={ForgotStyles.btnRequest} onPress={hanldeRequest}>
        <Text style={ForgotStyles.txtRequest}>Request Code</Text>
      </TouchableOpacity>
      <TouchableOpacity style={ForgotStyles.btnCancel}>
        <Text style={ForgotStyles.txtCancel}>Cancel</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default ForgotPassword;
