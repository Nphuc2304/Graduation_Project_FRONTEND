import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AppStyles from '../src/Styles/AppStyles';
import colors from '../src/Color';

const ButtonActive = (props: any) => {
  const {
    text,
    color,
    bgColor,
    width,
    borderColor,
    radius,
    func,
    img,
    disabled,
  } = props;
  return (
    <TouchableOpacity
      style={[
        styles.btn,
        {
          backgroundColor: disabled ? colors.darkGray : bgColor,
          width: width,
          borderColor: disabled ? colors.darkGray : borderColor,
          borderRadius: radius,
        },
      ]}
      onPress={disabled ? undefined : func}
      disabled={disabled}>
      {img != null ? (
        <Image source={img} style={[AppStyles.icon, {marginRight: 10}]} />
      ) : (
        <View></View>
      )}
      <Text style={{color: color, fontSize: 18}}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    padding: 12,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ButtonActive;
