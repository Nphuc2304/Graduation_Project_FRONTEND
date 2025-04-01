import {StyleSheet} from 'react-native';
import Colors from '../Color';

const ForgotStyle = StyleSheet.create({
  content: {
    flex: 1,
    marginTop: 100,
    marginRight: 20,
    marginLeft: 20,
  },
  txtForgot: {
    fontSize: 26,
    fontWeight: 'bold',
    color: Colors.black,
  },
  txtNotification: {
    fontSize: 14,
    fontWeight: '400',
    color: '#9A9A9A',
    marginTop: 20,
  },
  txtPhoneOrEmail: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.lightBlack,
    marginTop: 50,
  },
  txtPhoneOrEmailErr: {
    fontSize: 14,
    fontWeight: '400',
    color: 'red',
    marginTop: 50,
  },
  textInvalid: {
    fontSize: 14,
    fontWeight: '400',
    color: 'red',
    marginTop: 10,
  },
  viewInput: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.darkGray,
    borderRadius: 50,
    marginTop: 25,
    padding: 15,
  },
  input: {
    width: '100%',
    color: Colors.primary,
  },
  imgError: {
    width: 13,
    height: 13,
    marginTop: 20,
    marginLeft: 10,
  },
  textInputForcus: {
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 50,
    marginTop: 25,
    padding: 15,
  },
  textInputInvalid: {
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 50,
    marginTop: 25,
    padding: 15,
  },
  btnRequest: {
    width: '80%',
    height: 56,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  txtRequest: {
    fontSize: 18,
    fontWeight: '500',
    color: Colors.white,
  },
  btnCancel: {
    width: '80%',
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  txtCancel: {
    fontSize: 18,
    fontWeight: '500',
    color: Colors.primary,
  },
  viewBottom: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
});

export default ForgotStyle;
