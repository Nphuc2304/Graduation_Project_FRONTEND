import React, {useState} from 'react';
import {View, Image, Dimensions, StyleSheet} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import colors from '../../../Color';
import ListProdStyles from '../../../Styles/ListProdStyles';

interface ImageCarouselProps {
  images: string[];
  height?: number;
  width?: number;
}

const {width: screenWidth} = Dimensions.get('window');

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  height = 180,
  width = screenWidth - 40, // Account for container margin
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // If only one image, don't show carousel
  if (images.length <= 1) {
    return (
      <Image
        source={{uri: images[0] || 'https://via.placeholder.com/300x200'}}
        style={ListProdStyles.img}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Carousel
        loop
        width={width}
        height={height}
        autoPlay={false}
        data={images}
        scrollAnimationDuration={500}
        renderItem={({item}) => (
          <Image source={{uri: item}} style={ListProdStyles.img} />
        )}
        onSnapToItem={setCurrentIndex}
      />
      {/* Dots indicator */}
      <View style={styles.dotsContainer}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, currentIndex === index && styles.activeDot]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  dotsContainer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: colors.white,
  },
});

export default ImageCarousel;
