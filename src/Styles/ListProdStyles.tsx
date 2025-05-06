import {StyleSheet} from 'react-native';
import colors from '../Color';

const ListProdStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    margin: 20,
    backgroundColor: colors.white,
    borderRadius: 20,
    overflow: 'hidden',

    // iOS Shadow
    shadowColor: '#000',
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
  content: {
    paddingHorizontal: 23,
    paddingTop: 20,
    paddingBottom: 32,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  textContent: {
    fontSize: 14,
    fontWeight: 'medium',
    color: '#9A9A9A',
  },
  textPer: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#9A9A9A',
  },
  textWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    maxWidth: '100%',
  },
});

export default ListProdStyles;
