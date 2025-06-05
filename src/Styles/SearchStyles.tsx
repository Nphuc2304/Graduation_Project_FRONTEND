import {Dimensions, StyleSheet, Text, View} from 'react-native';
import colors from '../Color';

const {width} = Dimensions.get('window');

export const SearchStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingHorizontal: 16,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 15,
      paddingVertical: 16,
    },
    backContainer: {
        padding: 8,
        width: 30, height: 30,
        backgroundColor: colors.gray,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backIcon: {
      width: 14,
      height: 24,
      resizeMode: 'contain',
    },
    title: {
      fontSize: 18,
      fontWeight: 'semibold',
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#f1f1f1',
      borderRadius: 12,
      paddingLeft: 50,
      paddingVertical: 10,
      marginTop: 8,
      marginBottom: 15,
      flex: 1,
      fontSize: 16,
      color: colors.primary,
    },
    searchIcon: {
      width: 20,
      height: 20,
      marginRight: 8,
      left: 15,
      top: 18,
      tintColor: colors.primary,
      position: 'absolute',
    },
    cancelText: {
      color: colors.black,
      fontSize: 16,
    },
    exploreContainer: {
      flex: 1,
    },
    exploreTitle: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 12,
    },
    categoryItem: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      marginBottom: 25,
    },
    categoryImage: {
      width: width / 4,
      height: width / 4,
      resizeMode: 'contain',
      marginBottom: 8,
    },
    categoryText: {
      fontSize: 14,
      textAlign: 'center',
      color: colors.black,
      fontWeight: 'semibold'
    },
    noResultContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
    },
    noResultImage: {
      width: 194,
      height: 188,
      resizeMode: 'contain',
      marginBottom: 16,
    },
    noResultTitle: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 4,
    },
    noResultText: {
      fontSize: 18,
      color: colors.gray,
    },
    noResultSorry: {
        fontSize: 24,
        fontWeight: 'semibold',
        color: colors.primary,
    }
  });
};
