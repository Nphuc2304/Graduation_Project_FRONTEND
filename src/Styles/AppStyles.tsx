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
    width: 15,
    height: 15,
  },
  textNormal: {
    fontSize: 16,
    color: colors.lightBlack,
  },
});

export default AppStyles;
