import {StyleSheet} from 'react-native';
import colors from '../Color';

const AppStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowContainerSpace: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  textNormal: {
    fontSize: 16,
    color: colors.lightBlack,
  },
  textTitle: {
    fontSize: 18,
    fontWeight: 'semibold',
    lineHeight: 18,
    color: colors.black,
    marginLeft: 25,
  },
});

export default AppStyles;
