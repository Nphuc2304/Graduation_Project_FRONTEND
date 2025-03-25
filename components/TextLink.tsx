import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import colors from '../src/Color';

const TextLink = (props: any) => {
  const {text, func, color, mg} = props;
  return (
    <TouchableOpacity onPress={func} style={{margin: mg}}>
      <Text style={{color: color, fontSize: 18}}>{text}</Text>
    </TouchableOpacity>
  );
};

export default TextLink;
