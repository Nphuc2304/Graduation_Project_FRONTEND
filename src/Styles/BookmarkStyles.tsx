import {StyleSheet} from 'react-native';
import colors from '../Color';

const BookmarkStyles = StyleSheet.create({
  containerModel: {
    width: '100%',
    position: 'relative',
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
    backgroundColor: colors.white,
    padding: 10,
  },
  imgContainer: {
    width: '100%',
    height: 200,
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
    borderBottomStartRadius: 30,
    borderBottomEndRadius: 30,
    overflow: 'hidden',
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 30,
    textAlign: 'center',
  },
});

export default BookmarkStyles;
