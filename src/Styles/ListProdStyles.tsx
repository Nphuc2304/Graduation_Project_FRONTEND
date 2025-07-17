import {StyleSheet} from 'react-native';

const createListProdStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      margin: 20,
      backgroundColor: colors.card,
      borderRadius: 25,
      overflow: 'hidden',

      // iOS Shadow
      shadowColor: colors.text,
      shadowOffset: {width: 3, height: 3},
      shadowOpacity: 0.17,
      shadowRadius: 20,

      // Android Shadow
      elevation: 6, // Không thể chỉnh chi tiết như iOS
    },
    img: {
      width: '100%',
      height: 180,
      resizeMode: 'cover',
    },
    imageCarousel: {
      width: '100%',
      height: 180,
    },
    content: {
      paddingHorizontal: 23,
      paddingTop: 20,
      paddingBottom: 32,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 20,
      color: colors.text,
    },
    textContent: {
      fontSize: 14,
      fontWeight: 'medium',
      color: colors.secondary,
    },
    textPer: {
      fontSize: 12,
      fontWeight: 'bold',
      color: colors.secondary,
    },
    textWrap: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      maxWidth: '100%',
    },
  });

export default createListProdStyles;
