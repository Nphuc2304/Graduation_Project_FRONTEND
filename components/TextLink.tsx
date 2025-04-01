import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import colors from '../src/Color';

const TextLink = (props: any) => {
  const {text, func, color, mg, size, fontw, line} = props;
  return (
    <TouchableOpacity onPress={func} style={{margin: mg}}>
      <Text
        style={{
          color: color,
          fontSize: size,
          fontWeight: fontw,
          textDecorationLine: line,
        }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default TextLink;
