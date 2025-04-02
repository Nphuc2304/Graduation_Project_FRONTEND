import {StyleSheet} from 'react-native';
import Colors from '../Color';

const StyleVerifiCation = StyleSheet.create({
  content: {
    flex: 1,
    marginTop: 150,
    marginRight: 20,
    marginLeft: 20,
  },
  txtVetification: {
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
  viewVerification: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 50,
  },
  textInput: {
    width: '10%',
    borderBottomWidth: 2,
    borderColor: Colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    fontSize: 35,
    color: Colors.primary,
    textAlign: 'center',
  },
  line: {
    width: 41,
    height: 1,
    backgroundColor: Colors.black,
  },
  btnVerify: {
    width: '80%',
    height: 56,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  txtVerify: {
    fontSize: 18,
    fontWeight: '500',
    color: Colors.white,
  },
  btnSendAgain: {
    width: '80%',
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  txtSendAgain: {
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

export default StyleVerifiCation;
