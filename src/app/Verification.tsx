import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {useRef, useState} from 'react';
import AppStyles from '../Styles/AppStyles';
import ButtonIcon from '../../components/ButtonIcon';
import Colors from '../Color';
import StyleVerifiCation from '../Styles/Verification';

const Verification = ({navigation}: any) => {
  const inputRefs = useRef<TextInput[]>([]);
  const [code, setCode] = useState<string[]>(new Array(6).fill('')); // Mảng chứa giá trị từng ô input
  const [isFilled, setIsFilled] = useState<boolean[]>(new Array(6).fill(false)); // Mảng theo dõi trạng thái từng ô

  const handleChangeText = ({text, index}: {text: string; index: number}) => {
    let newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // Cập nhật trạng thái isFilled
    let newIsFilled = [...isFilled];
    newIsFilled[index] = text.length > 0; // Nếu ô có dữ liệu, đặt isFilled là true
    setIsFilled(newIsFilled);

    if (text.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus(); // Chuyển sang ô tiếp theo khi nhập
    }
  };

  const handleKeyPress = (
    event: {nativeEvent: {key: string}},
    index: number,
  ) => {
    if (
      event.nativeEvent.key === 'Backspace' &&
      index > 0 &&
      code[index] === ''
    ) {
      inputRefs.current[index - 1]?.focus(); // Quay lại ô trước nếu đang xoá và ô hiện tại trống
    }
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
      <View style={StyleVerifiCation.content}>
        <Text style={StyleVerifiCation.txtVetification}>Code Verification</Text>
        <Text style={StyleVerifiCation.txtNotification}>
          Provide your phone number (or) email address for which you want to
          reset your password
        </Text>
        <View style={StyleVerifiCation.viewVerification}>
          {[0, 1, 2, 3, 4, 5].map(index => (
            <View
              key={index}
              style={[
                StyleVerifiCation.textInput,
                {borderColor: isFilled[index] ? Colors.primary : Colors.black}, // Thay đổi màu dựa trên trạng thái
              ]}>
              <TextInput
                keyboardType="numeric"
                maxLength={1}
                ref={el => {
                  if (el) inputRefs.current[index] = el;
                }}
                onChangeText={text => handleChangeText({text, index})}
                onKeyPress={event => handleKeyPress(event, index)}
                value={code[index]}
                style={StyleVerifiCation.input}
              />
            </View>
          ))}
        </View>
      </View>
      <View style={StyleVerifiCation.viewBottom}>
        <TouchableOpacity style={StyleVerifiCation.btnVerify}>
          <Text style={StyleVerifiCation.txtVerify}>Verify</Text>
        </TouchableOpacity>
        <TouchableOpacity style={StyleVerifiCation.btnSendAgain}>
          <Text style={StyleVerifiCation.txtSendAgain}>Send Code Again</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Verification;

const styles = StyleSheet.create({});
