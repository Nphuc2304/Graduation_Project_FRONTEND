import {StyleSheet} from 'react-native';
import colors from '../../Color';

const SplashStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    marginTop: -20,
    height: 400,
    resizeMode: 'contain',
  },
  textPrimary: {
    width: '70%',
    color: colors.primary,
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 25,
  },
  textCenter: {
    textAlign: 'center',
  },
  dotGroup: {
    width: 50,
    marginTop: 35,
    resizeMode: 'contain',
  },
});

export default SplashStyles;
