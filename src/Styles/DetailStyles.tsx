import {StyleSheet} from 'react-native';
import colors from '../Color';

const DetailsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  rowSpace: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconBack: {
    width: 7,
    resizeMode: 'contain'
  },
  btnRounded: {
    width: 31, height: 31,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#D9D9D9',
  },
  icon: {
    width: 24, height: 24,
    resizeMode: 'contain'
  },
  rowSpaceAbsolute: {
    position: 'absolute',
    right: 24, left: 24,
    top: 30,
  },
  mainImg: {
    height: 340,
    width: '100%',
    resizeMode: 'cover'
  },
  textXL: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#353535',
    textAlign: 'justify'
  },
  textL: {
    fontSize: 18,
    fontWeight: 'semibold',
    color: '#353535',
  },
  textM: {
    fontSize: 16,
    fontWeight: 'medium',
    color: '#353535',
  },
  textS: {
    fontSize: 14,
    fontWeight: 'medium',
    color: '#9A9A9A',
  },
  textXS: {
    fontSize: 12,
    fontWeight: 'semibold',
    color: '#9A9A9A',
  },
  textXXS: {
    fontSize: 10,
    fontWeight: 'medium',
    color: '#9A9A9A',
  },
  secondContainer: {
    padding: 24,
    borderBottomColor: '#CDCDCD',
    borderBottomWidth: 1,
    gap: 20,
  },
  thirdContainer: {
    paddingHorizontal: 24,
    paddingVertical: 37,
    gap: 50,
  },
  fourContainer: {
    gap: 27,
  },
  goal: {
    flex: 1,
    height: 3,
    backgroundColor: '#BBDEF7',
    borderRadius: 5,
  },
  btnSmall: {
    paddingHorizontal: 23,
    paddingVertical: 8,
    borderRadius: 50,
    backgroundColor: '#BBDEF7'
  },
  btnLarge: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: '#1A8FE3'
  },
  smallIcon: {
    width: 20, height: 20,
    resizeMode: 'contain'
  },
  btnBorder: {
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    borderWidth: 2,
    borderColor: '#1A8FE3',
    borderRadius: 50,
  },
  mgL: {
    marginLeft: 20,
  }
});

export default DetailsStyles;
