import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import colors from '../../Color';
import ButtonIcon from '../../../components/ButtonIcon';
import AppStyles from '../../Styles/AppStyles';
import TextLink from '../../../components/TextLink';
import VideoList from '../../../components/RenderItem/VideoList';

import Header from '../../../components/Header';
import Carousel from 'react-native-reanimated-carousel';
import CampaignList from '../../../components/RenderItem/CampaignList';
import CategoryList from '../../../components/RenderItem/CategoryList';
import HomeStyles from '../../bottomTabStyles/HomeStyles';

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

  // carousel
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

  // category
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = [
    {id: '1', name: 'Medical Aid'},
    {id: '2', name: 'Disaster Relief'},
    {id: '3', name: 'Education Fund'},
    {id: '4', name: 'Animal Welfare'},
    {id: '5', name: 'Community Projects'},
    {id: '6', name: 'Environmental Causes'},
    {id: '7', name: 'Startup Funding'},
    {id: '8', name: 'Sports & Fitness'},
    {id: '9', name: 'Arts & Culture'},
    {id: '10', name: 'Emergency Assistance'},
  ];

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    console.log('Selected Category:', categoryId);
  };

  // campaign
  const [data, setData] = useState([
    {
      id: '1',
      name: 'Campaign 1',
      image:
        'https://i.pinimg.com/736x/8c/56/c4/8c56c483afc07fbbc8d1c937c53c26b1.jpg',
      priceCurrent: 500,
      pricegoal: 1000,
      donators: 10,
      dayLeft: '5',
    },
    {
      id: '2',
      name: 'Campaign 2',
      image:
        'https://i.pinimg.com/736x/69/06/61/690661e5f4fdf73f358ce77340d3d045.jpg',
      priceCurrent: 700,
      pricegoal: 2000,
      donators: 20,
      dayLeft: '10',
    },
    {
      id: '2',
      name: 'Campaign 3',
      image:
        'https://i.pinimg.com/736x/9c/a3/32/9ca332469e80c3416ec91ed8afe2f402.jpg',
      priceCurrent: 2300,
      pricegoal: 3000,
      donators: 15,
      dayLeft: '20',
    },
  ]);

  const handleSelectItem = (id: string) => {
    console.log('Selected Item:', id);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={HomeStyles.container}>
          <Header
            logo={require('../../../assets/images/Logo.png')}
            iconSearch={require('../../../assets/icons/search.png')}
            iconSave={require('../../../assets/icons/save.png')}
            navigation={navigation}
            mg={20}
          />
          <View style={HomeStyles.carouselContainer}>
            <Carousel
              loop
              width={width - 20}
              height={200}
              autoPlay
              autoPlayInterval={3000}
              data={img}
              scrollAnimationDuration={1000}
              renderItem={({item}) => (
                <View style={HomeStyles.card}>
                  <Image source={{uri: item.url}} style={HomeStyles.image} />
                </View>
              )}
              onSnapToItem={handleCarouselIndexChange}
            />
            <View style={HomeStyles.dotsContainer}>
              {img.map((_, index) => (
                <View
                  key={index}
                  style={[
                    HomeStyles.dot,
                    currentIndex === index && HomeStyles.activeDot, // Tô màu dot hiện tại
                  ]}
                />
              ))}
            </View>
          </View>

          <View style={[HomeStyles.pd, AppStyles.rowContainerSpace]}>
            <Text style={HomeStyles.txtWatch}>Watch the impact</Text>
            <TextLink
              text="See all"
              size={18}
              color={colors.primary}
              fontw="600"
            />
          </View>

          <View style={HomeStyles.pd}>
            <CategoryList
              data={categories}
              onChangeIndex={handleCategoryChange}
              color={colors.white}
              colorActive={colors.primary}
              padV={10}
              width={100}
            />
          </View>

          <CampaignList data={data} onSelectItem={handleSelectItem} />

          <View style={[HomeStyles.pd, AppStyles.rowContainerSpace]}>
            <Text style={HomeStyles.txtWatch}>Watch the impact</Text>
            <TextLink
              text="See all"
              size={18}
              color={colors.primary}
              fontw="600"
            />
          </View>

          <View style={HomeStyles.viewVideo}>
            <VideoList videoData={videoData} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
