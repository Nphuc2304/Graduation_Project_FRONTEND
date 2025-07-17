import {StyleSheet} from 'react-native';

const createDetailStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    rowSpace: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    iconBack: {
      width: 12,
      height: 12,

      resizeMode: 'contain',
    },
    btnRounded: {
      width: 31,
      height: 31,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
      backgroundColor: colors.card,
    },
    icon: {
      width: 24,
      height: 24,
      resizeMode: 'contain',
    },
    rowSpaceAbsolute: {
      position: 'absolute',
      right: 24,
      left: 24,
      top: 30,
    },
    mainImg: {
      height: 340,
      width: '100%',
      resizeMode: 'cover',
    },
    textXL: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
    },
    textL: {
      fontSize: 18,
      fontWeight: 'semibold',
      color: colors.text,
    },
    textM: {
      fontSize: 16,
      fontWeight: 'medium',
      color: colors.text,
    },
    textS: {
      fontSize: 14,
      fontWeight: 'medium',
      color: colors.secondary,
    },
    textXS: {
      fontSize: 12,
      fontWeight: 'semibold',
      color: colors.secondary,
    },
    textXXS: {
      fontSize: 10,
      fontWeight: 'medium',
      color: colors.secondary,
    },
    secondContainer: {
      padding: 24,
      borderBottomColor: colors.border,
      borderBottomWidth: 1,
      gap: 20,
      backgroundColor: colors.background,
    },
    thirdContainer: {
      paddingHorizontal: 24,
      paddingVertical: 37,
      gap: 50,
      backgroundColor: colors.background,
    },
    fourContainer: {
      gap: 27,
    },
    goal: {
      flex: 1,
      height: 3,
      backgroundColor: colors.lightPrimary,
      borderRadius: 5,
    },
    btnSmall: {
      paddingHorizontal: 23,
      paddingVertical: 8,
      borderRadius: 50,
      backgroundColor: colors.lightPrimary,
    },
    btnLarge: {
      width: '100%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      backgroundColor: colors.primary,
    },
    smallIcon: {
      width: 20,
      height: 20,
      resizeMode: 'contain',
    },
    btnBorder: {
      paddingHorizontal: 20,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 5,
      borderWidth: 2,
      borderColor: colors.primary,
      borderRadius: 50,
    },
    mgL: {
      marginLeft: 20,
    },
  });

export default createDetailStyles;
