import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../src/Color';
import AppStyles from '../src/Styles/AppStyles';

const InputComponent = (props: any) => {
  const {
    label,
    placeholder,
    secureTextEntry,
    value,
    onChangeText,
    icon,
    width,
    err,
    mgBottom,
    hidden,
  } = props;
  return (
    <View style={{marginBottom: mgBottom, width: width}}>
      <Text
        style={[styles.title, {color: err != '' ? colors.red : colors.black}]}>
        {label}
      </Text>
      <View
        style={[
          AppStyles.rowContainerSpace,
          styles.inputContainer,
          {borderColor: err != '' ? colors.red : colors.darkGray},
        ]}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.darkGray}
          secureTextEntry={secureTextEntry}
          style={styles.input}
        />
        <TouchableOpacity onPress={hidden}>
          <Image style={AppStyles.icon} source={icon} />
        </TouchableOpacity>
      </View>
      {err != '' ? <Text style={styles.textErr}>{err}</Text> : <Text></Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 8,
    paddingLeft: 20,
    fontSize: 17,
    fontWeight: '500',
  },
  inputContainer: {
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 50,
    marginBottom: 5,
    overflow: 'hidden',
  },
  input: {
    outlineColor: colors.transparent,
    width: '80%',
    fontSize: 15,
    color: colors.primary,
    padding: 10,
  },
  textErr: {
    color: colors.red,
    paddingLeft: 20,
  },
});

export default InputComponent;
