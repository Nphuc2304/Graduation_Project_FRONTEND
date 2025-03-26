import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AppStyles from '../src/Styles/AppStyles';

const ButtonActive = (props: any) => {
  const {text, color, bgColor, width, borderColor, radius, func, img} = props;
  return (
    <TouchableOpacity
      style={[
        styles.btn,
        {
          backgroundColor: bgColor,
          width: width,
          borderColor: borderColor,
          borderRadius: radius,
        },
      ]}
      onPress={func}>
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
