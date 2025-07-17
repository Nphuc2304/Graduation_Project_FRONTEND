import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import colors from '../../../Color';

interface DetailImageCarouselProps {
  images: string[];
  height?: number;
  width?: number;
}

const {width: screenWidth} = Dimensions.get('window');

const DetailImageCarousel: React.FC<DetailImageCarouselProps> = ({
  images,
  height = 250,
  width = screenWidth,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<any>(null);
  const autoPlayIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play functionality
  useEffect(() => {
    if (images.length > 1) {
      // Clear existing interval
      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current);
      }

      // Set new interval for auto-play
      autoPlayIntervalRef.current = setInterval(() => {
        if (carouselRef.current) {
          const nextIndex = (currentIndex + 1) % images.length;
          carouselRef.current.scrollTo({index: nextIndex, animated: true});
        }
      }, 2000); // 2 seconds interval

      // Cleanup on unmount
      return () => {
        if (autoPlayIntervalRef.current) {
          clearInterval(autoPlayIntervalRef.current);
        }
      };
    }
  }, [currentIndex, images.length]);

  // Pause auto-play when user interacts
  const handleManualScroll = (index: number) => {
    setCurrentIndex(index);

    // Reset auto-play timer
    if (autoPlayIntervalRef.current) {
      clearInterval(autoPlayIntervalRef.current);
    }

    // Restart auto-play after user interaction
    autoPlayIntervalRef.current = setInterval(() => {
      if (carouselRef.current) {
        const nextIndex = (index + 1) % images.length;
        carouselRef.current.scrollTo({index: nextIndex, animated: true});
      }
    }, 2000);
  };

  // Manual navigation functions
  const goToPrevious = () => {
    if (carouselRef.current && images.length > 1) {
      const prevIndex =
        currentIndex === 0 ? images.length - 1 : currentIndex - 1;
      carouselRef.current.scrollTo({index: prevIndex, animated: true});

      // Reset auto-play timer
      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current);
      }

      autoPlayIntervalRef.current = setInterval(() => {
        if (carouselRef.current) {
          const nextIndex = (prevIndex + 1) % images.length;
          carouselRef.current.scrollTo({index: nextIndex, animated: true});
        }
      }, 2000);
    }
  };

  const goToNext = () => {
    if (carouselRef.current && images.length > 1) {
      const nextIndex = (currentIndex + 1) % images.length;
      carouselRef.current.scrollTo({index: nextIndex, animated: true});

      // Reset auto-play timer
      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current);
      }

      autoPlayIntervalRef.current = setInterval(() => {
        if (carouselRef.current) {
          const nextNextIndex = (nextIndex + 1) % images.length;
          carouselRef.current.scrollTo({index: nextNextIndex, animated: true});
        }
      }, 2000);
    }
  };

  // If no images or only one image, show single image
  if (images.length <= 1) {
    return (
      <Image
        source={{uri: images[0] || 'https://via.placeholder.com/400x250'}}
        style={[styles.singleImage, {height, width}]}
        resizeMode="cover"
      />
    );
  }

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        loop
        width={width}
        height={height}
        autoPlay={false}
        data={images}
        scrollAnimationDuration={500}
        renderItem={({item}) => (
          <Image
            source={{uri: item}}
            style={[styles.image, {height, width}]}
            resizeMode="cover"
          />
        )}
        onSnapToItem={handleManualScroll}
      />

      {/* Navigation buttons */}
      <TouchableOpacity
        style={[styles.navButton, styles.leftButton]}
        onPress={goToPrevious}
        activeOpacity={0.7}>
        <Text style={styles.navButtonText}>‹</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.navButton, styles.rightButton]}
        onPress={goToNext}
        activeOpacity={0.7}>
        <Text style={styles.navButtonText}>›</Text>
      </TouchableOpacity>

      {/* Dots indicator */}
      <View style={styles.dotsContainer}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, currentIndex === index && styles.activeDot]}
          />
        ))}
      </View>

      {/* Image counter */}
      <View style={styles.counterContainer}>
        <Text style={styles.counterText}>
          {currentIndex + 1} / {images.length}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  singleImage: {
    resizeMode: 'cover',
  },
  image: {
    resizeMode: 'cover',
  },
  navButton: {
    position: 'absolute',
    top: '50%',
    transform: [{translateY: -20}],
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  leftButton: {
    left: 10,
  },
  rightButton: {
    right: 10,
  },
  navButtonText: {
    color: colors.white,
    fontSize: 24,
    fontWeight: 'bold',
  },
  dotsContainer: {
    position: 'absolute',
    bottom: 20,
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
  counterContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  counterText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
});

export default DetailImageCarousel;
