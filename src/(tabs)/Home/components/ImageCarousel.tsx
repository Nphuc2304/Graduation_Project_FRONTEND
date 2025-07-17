import React, {useState} from 'react';
import {View, Image, Dimensions, StyleSheet} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {useTheme} from '../../../utils/ThemeContext';
import createListProdStyles from '../../../Styles/ListProdStyles';

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
  const {colors} = useTheme();
  const listProdStyles = createListProdStyles(colors);

  // If only one image, don't show carousel
  if (images.length <= 1) {
    return (
      <Image
        source={{uri: images[0] || 'https://picsum.photos/300/200'}}
        style={listProdStyles.img}
        resizeMode="cover"
      />
    );
  }

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
          <Image
            source={{uri: item}}
            style={listProdStyles.img}
            resizeMode="cover"
          />
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

export default ImageCarousel;
