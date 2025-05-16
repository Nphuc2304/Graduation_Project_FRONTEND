import {StyleSheet} from 'react-native';
import colors from '../Color';

const PaymentStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowContainerSpace: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 24,
    marginVertical: 20
  },
  textL: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
  },
  btn: {
    marginHorizontal: 50,
    paddingVertical: 10,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    borderRadius: 50,
  },
  icon: {
    width: 24, height: 24,
    resizeMode: 'contain',
    tintColor: colors.primary,
  },
  moreBox: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    backgroundColor: colors.lightPrimary,
    borderRadius: 5,
  },
  iconback: {
    width: 14,
    resizeMode: 'contain',
    tintColor: colors.black,
  },
  backBox: {
    width: 31, height: 31,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: colors.darkGray,
  },
  methodContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: colors.gray,
    borderWidth: 1,
    borderRadius: 14,
    marginVertical: 20,
  },
  selectMethodContainer: {
    borderColor: colors.primary
  },
  leftContainer: {
    flexDirection: 'row',
    gap: 17,
    alignItems: 'center'
  },
  imgBank: {
    width: 40, height: 40,
    resizeMode: 'cover',
    borderRadius: 6,
  },
  radioBtn: {
    width: 16, height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 20,
  },
  radioInner: {
    width: 13, height: 13,
    backgroundColor: colors.primary,
    borderRadius: 20,
    position:'absolute'
  },
  modal: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  modalContainer: {
    alignSelf: 'flex-start',
    width: '80%',
    backgroundColor: colors.white,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 36,
    paddingVertical: 38,
    marginTop: 100
  },
  imgSuccess: {
    width: 194, height: 194,
    resizeMode: 'contain',
    marginBottom: 33,
  },
  textSuccess: {
    fontSize: 20,
    fontWeight: 'semibold',
    color: colors.primary,
    marginBottom: 12,
  },
  textThank: {
    fontSize: 14,
    fontWeight: 'semibold',
    color: colors.darkGray,
    marginBottom: 45,
  },
  btnOK: {
    marginHorizontal: 50,
    paddingVertical: 10,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    width: '100%'
  }
});

export default PaymentStyles;
