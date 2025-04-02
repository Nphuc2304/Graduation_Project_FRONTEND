import {StyleSheet} from 'react-native';
import colors from '../Color';

const HomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  pd: {
    padding: 20,
  },
  txtWatch: {
    fontSize: 18,
    color: colors.black,
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
  },
  activeDot: {
    backgroundColor: colors.primary,
  },
});

export default HomeStyles;
