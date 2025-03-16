import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import colors from '../src/Color';
import React from 'react';

const ButtonActive = React.memo((props: any) => {
  const {bgColor, width, borderColor, text, func} = props;

  return (
    <TouchableOpacity
      onPress={func}
      style={[
        styles.container,
        {width: width, backgroundColor: bgColor, borderColor: borderColor},
      ]}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  text: {
    fontSize: 17,
    color: colors.textButton,
    fontWeight: '500',
  },
});

export default ButtonActive;
