import {StyleSheet} from 'react-native';
import colors from '../Color';

const LoginStyles = StyleSheet.create({
  img: {
    width: '85%',
    marginTop: 50,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: colors.primary,
  },
  text: {
    color: colors.primary,
    fontSize: 21,
    fontWeight: 'bold',
    marginVertical: 40,
  },
  textBlack: {
    fontSize: 17,
    color: colors.black,
  },
});

export default LoginStyles;
