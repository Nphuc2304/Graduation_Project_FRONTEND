import {StyleSheet} from 'react-native';
import colors from '../Color';

const SelectInStyles = StyleSheet.create({
  title: {
    width: '100%',
    marginTop: 20,
    height: 31,
    paddingLeft: 20,
  },
  container: {
    paddingHorizontal: 34,
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
  },
  textMargin: {
    marginVertical: 62,
  },
  marginBtn: {
    marginHorizontal: 15,
    marginVertical: 15,
  },
  select: {
    width: '105%',
    flexGrow: 1,
  },
  img: {
    width: 194,
    height: 188,
  },
  textW: {
    fontSize: 24,
    lineHeight: 18,
    fontWeight: 'semibold',
    color: colors.primary,
    marginVertical: 40,
  },
  textM: {
    fontSize: 16,
    fontWeight: 'medium',
    textAlign: 'center',
    color: '#9A9A9A',
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SelectInStyles;
