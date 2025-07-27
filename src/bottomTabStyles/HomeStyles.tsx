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
    // Filter Styles
    filterContainer: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 20,
      marginTop: 15,
      shadowColor: colors.text,
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.1,
      shadowRadius: 12,
      elevation: 8,
    },
    filterHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    filterTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
    },
    filterToggleButton: {
      backgroundColor: colors.primary,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      shadowColor: colors.primary,
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 4,
    },
    filterToggleText: {
      color: 'white',
      fontSize: 14,
      fontWeight: '600',
    },
    searchContainer: {
      marginBottom: 16,
    },
    searchInput: {
      borderWidth: 1.5,
      borderColor: colors.border,
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 14,
      color: colors.text,
      backgroundColor: colors.background,
      fontSize: 16,
      shadowColor: colors.text,
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    rangeContainer: {
      marginBottom: 16,
    },
    rangeTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 12,
    },
    rangeRow: {
      flexDirection: 'row',
      gap: 12,
    },
    rangeInput: {
      flex: 1,
      borderWidth: 1.5,
      borderColor: colors.border,
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 14,
      color: colors.text,
      backgroundColor: colors.background,
      fontSize: 16,
      shadowColor: colors.text,
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    statusContainer: {
      marginBottom: 20,
    },
    statusTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 12,
    },
    statusRow: {
      flexDirection: 'row',
      gap: 8,
    },
    statusButton: {
      flex: 1,
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 12,
      borderWidth: 2,
      alignItems: 'center',
      shadowColor: colors.text,
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    statusButtonActive: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    statusButtonInactive: {
      backgroundColor: colors.background,
      borderColor: colors.border,
    },
    statusText: {
      fontSize: 14,
      fontWeight: '600',
      textTransform: 'capitalize',
    },
    statusTextActive: {
      color: 'white',
    },
    statusTextInactive: {
      color: colors.text,
    },
    filterActions: {
      flexDirection: 'row',
      gap: 12,
    },
    actionButton: {
      flex: 1,
      paddingVertical: 14,
      borderRadius: 12,
      alignItems: 'center',
      shadowColor: colors.text,
      shadowOffset: {width: 0, height: 3},
      shadowOpacity: 0.2,
      shadowRadius: 6,
      elevation: 4,
    },
    applyButton: {
      backgroundColor: colors.primary,
    },
    clearButton: {
      backgroundColor: colors.error || '#ff6b6b',
    },
    actionButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: 'white',
    },
    // Slider Styles
    sliderContainer: {
      marginBottom: 20,
    },
    sliderHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    sliderLabel: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.text,
    },
    sliderValue: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.primary,
    },
    slider: {
      width: '100%',
      height: 40,
    },
    sliderThumb: {
      backgroundColor: colors.primary,
      width: 20,
      height: 20,
      borderRadius: 10,
    },
    sliderTrack: {
      height: 4,
      borderRadius: 2,
    },
  });

export default createHomeStyles;
