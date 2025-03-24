import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const ButtonActive = (props: any) => {
  const {text, color, bgColor, width, borderColor, func} = props;
  return (
    <TouchableOpacity
      style={[
        styles.btn,
        {backgroundColor: bgColor, width: width, borderColor: borderColor},
      ]}
      onPress={func}>
      <Text style={{color: color, fontSize: 18}}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    borderRadius: 50,
    padding: 10,
    borderWidth: 1,
    alignItems: 'center',
  },
});

export default ButtonActive;
