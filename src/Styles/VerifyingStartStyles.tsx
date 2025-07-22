import {StyleSheet} from 'react-native';
import colors from '../Color';

const VerifyingStartStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
  },
  mainImg: {
    width: '80%',
    height: 300,
    resizeMode: 'contain',
  },
  textXL: {
    fontSize: 25,
    fontWeight: 'bold',
    color: colors.primary,
  },
  textL: {
    fontSize: 18,
    fontWeight: 'regular',
    color: colors.white,
  },
  textM: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
  textS: {
    fontSize: 16,
    fontWeight: 'medium',
    color: colors.darkGray,
    textAlign: 'justify',
  },
  textXS: {
    fontSize: 12,
    fontWeight: 'normal',
    color: colors.gray,
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 10,
  },
  optionContainer: {
    flexDirection: 'row',
    gap: 15,
    marginVertical: 15,
    flex: 1,
  },
  bottomContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    gap: 10,
    borderTopColor: colors.gray,
    borderTopWidth: 0.5,
    justifyContent: 'center'
  },
  iconMedium: {
    width: 30, height: 30,
    tintColor: colors.darkGray,
    resizeMode: 'contain'
  },
  iconSmall: {
    width: 12, height: 12,
    resizeMode: 'contain',
    tintColor: colors.gray
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
});

export default VerifyingStartStyles;
