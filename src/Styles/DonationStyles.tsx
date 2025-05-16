import {StyleSheet} from 'react-native';
import colors from '../Color';

const DonationStyles = StyleSheet.create({
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
  textXL: {
    fontSize: 26,
    fontWeight: 'semibold',
    color: colors.primary,
    textAlign: 'center'
  },
  textL: {
    fontSize: 18,
    fontWeight: 'semibold',
    color: colors.black,
  },
  textM: {
    fontSize: 18,
    fontWeight: 'medium',
    color: colors.gray,
    textAlign: 'center',
    marginVertical: 40,
  },
  textS: {
    fontSize: 12,
    fontWeight: 'medium',
    color: colors.black
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
  amountBox: {
    marginHorizontal: 24,
    padding: 20,
    borderColor: colors.primary,
    borderWidth: 1.6,
    borderRadius: 14,
  },
  amountContainer: {
    height: 200,
    width: '100%',
    paddingHorizontal: 18,
    paddingVertical: 40,
    borderBottomColor: colors.darkGray,
    borderBottomWidth: 1
  },
});

export default DonationStyles;
