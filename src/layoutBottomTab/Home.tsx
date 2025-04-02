import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import colors from '../Color';
import TextLink from '../../components/TextLink';
import VideoList from '../../components/RenderItem/VideoList';
import Header from '../../components/Header';
import Carousel from 'react-native-reanimated-carousel';

// Định nghĩa interface cho dữ liệu video
interface VideoItem {
  id: string;
  uri: string;
  title: string;
}

const {width} = Dimensions.get('window');

const Home = ({navigation}: any) => {
  const [videoData, setVideoData] = useState<VideoItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const img = [
    {
      id: 1,
      url: 'https://i.pinimg.com/736x/8f/80/4a/8f804a99230cc29f84657ec6e747b0f7.jpg',
    },
    {
      id: 2,
      url: 'https://i.pinimg.com/736x/65/37/eb/6537eb5cbdb7019e893c10a501894c8b.jpg',
    },
    {
      id: 3,
      url: 'https://i.pinimg.com/736x/de/50/59/de5059b1836a1d642bf341f285ee66ff.jpg',
    },
  ];

  useEffect(() => {
    setVideoData([
      {
        id: '1',
        uri: 'https://www.w3schools.com/html/mov_bbb.mp4',
        title: 'Video 1',
      },
      {
        id: '2',
        uri: 'https://www.w3schools.com/html/mov_bbb.mp4',
        title: 'Video 2',
      },
      {
        id: '3',
        uri: 'https://www.w3schools.com/html/mov_bbb.mp4',
        title: 'Video 3',
      },
      {
        id: '4',
        uri: 'https://www.w3schools.com/html/mov_bbb.mp4',
        title: 'Video 4',
      },
    ]);
  }, []);

  const handleCarouselIndexChange = (index: number) => {
    setCurrentIndex(index); // Cập nhật chỉ số khi carousel thay đổi
  };

  console.log('videoData:', videoData);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        logo={require('../../assets/images/Logo.png')}
        iconSearch={require('../../assets/icons/search.png')}
        iconSave={require('../../assets/icons/save.png')}
        navigation={navigation}
        mg={20}
      />
      <View style={styles.carouselContainer}>
        <Carousel
          loop
          width={width - 20}
          height={200}
          autoPlay
          autoPlayInterval={3000}
          data={img}
          scrollAnimationDuration={1000}
          renderItem={({item}) => (
            <View style={styles.card}>
              <Image source={{uri: item.url}} style={styles.image} />
            </View>
          )}
          onSnapToItem={handleCarouselIndexChange}
        />
        <View style={styles.dotsContainer}>
          {img.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentIndex === index && styles.activeDot, // Tô màu dot hiện tại
              ]}
            />
          ))}
        </View>
      </View>

      <View style={styles.viewSeeAll}>
        <Text style={styles.txtWatch}>Watch the impact</Text>
        <TextLink
          text="See all"
          size={18}
          color={colors.primary}
          fontw="600"
          line="underline"
        />
      </View>

      <View style={styles.viewVideo}>
        <VideoList videoData={videoData} />
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  viewSeeAll: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
