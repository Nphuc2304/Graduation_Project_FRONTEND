import {StyleSheet} from 'react-native';
import colors from '../Color';

const WelcomePageStyles = StyleSheet.create({
  logo: {
    height: 175,
    resizeMode: 'contain',
    marginTop: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    textAlign: 'center',
    width: 100,
    marginTop: 40,
    marginBottom: 60,
    color: colors.primary,
  },
});

export default WelcomePageStyles;
