import {StyleSheet} from 'react-native';
import {useTheme} from '../utils/ThemeContext';

const createHomeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    pd: {
      padding: 20,
    },
    txtWatch: {
      fontSize: 18,
      color: colors.text,
      fontWeight: 'bold',
    },
    viewVideo: {
      flex: 1,
      width: '100%',
      marginLeft: 20,
    },
    carouselContainer: {
      position: 'relative',
      alignItems: 'center',
      marginVertical: 20,
      borderRadius: 15,
      overflow: 'hidden',
      marginHorizontal: 20,
      shadowColor: colors.text,
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    card: {
      borderRadius: 15,
      overflow: 'hidden',
      marginHorizontal: 5,
    },
    image: {
      width: '100%',
      height: 200,
    },
    dotsContainer: {
      position: 'absolute',
      flexDirection: 'row',
      justifyContent: 'center',
      bottom: 10,
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: colors.white,
      margin: 5,
      opacity: 0.6,
    },
    activeDot: {
      backgroundColor: colors.primary,
      opacity: 1,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 10,
    },
    sectionContainer: {
      marginVertical: 10,
    },
    loadingContainer: {
      padding: 20,
      alignItems: 'center',
    },
    errorContainer: {
      padding: 20,
      alignItems: 'center',
    },
    errorText: {
      color: colors.error,
      textAlign: 'center',
    },
    loadingText: {
      color: colors.primary,
      textAlign: 'center',
    },
  });

export default createHomeStyles;
