import {StyleSheet} from 'react-native';
import colors from '../Color';

const SignInStyles = StyleSheet.create({
  title: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 24,
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 30,
  },
  checkbox: {
    borderRadius: 2,
    borderColor: colors.primary,
    borderWidth: 1.5,
    width: 17,
    height: 17,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 1,
  },
  rememberContainer: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconRemember: {
    width: '100%',
    height: '100%',
  },
});

export default SignInStyles;
