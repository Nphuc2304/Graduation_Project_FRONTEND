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
import {useSelector, useDispatch} from 'react-redux';
import {useTheme} from '../../utils/ThemeContext';
import ButtonIcon from '../../../components/ButtonIcon';
import AppStyles from '../../Styles/AppStyles';
import TextLink from '../../../components/TextLink';
import VideoList from './components/VideoList';

import Header from '../../../components/Header';
import {ThemeToggle} from '../../../components/ThemeToggle';
import Carousel from 'react-native-reanimated-carousel';
import CampaignList from './components/CampaignList';
import CategoryList from './components/CategoryList';
import createHomeStyles from '../../bottomTabStyles/HomeStyles';
import {RootState, AppDispatch} from '../../../services/store/store';
import {fetchGetAllCampaignsWithMedia} from '../../../services/campaignRedux/campaignSlice';
import {resetGetAllStatus} from '../../../services/campaignRedux/campaignReducer';

// Định nghĩa interface cho dữ liệu video
interface VideoItem {
  id: string;
  uri: string;
  title: string;
}

const {width} = Dimensions.get('window');

const Home = ({navigation}: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const {colors} = useTheme();
  const {campaigns, isLoadingGetAll, isErrorGetAll, errorMessageGetAll} =
    useSelector((state: RootState) => state.campaigns);

  const [videoData, setVideoData] = useState<VideoItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // carousel
  const img = [
    {
      id: 1,
      url: 'https://phunuvietnam.mediacdn.vn/179072216278405120/2021/12/31/yola-1-16409497614121089453110.jpg',
    },
    {
      id: 2,
      url: 'https://chuthapdophutho.org.vn/uploads/news/2016_12/e2.jpg',
    },
    {
      id: 3,
      url: 'https://taidat.vn/wp-content/uploads/2016/04/photo-bo-anh-nhung-em-be-vung-cao-17.jpg',
    },
  ];

  useEffect(() => {
    // Fetch campaigns when component mounts
    dispatch(fetchGetAllCampaignsWithMedia());

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
  }, [dispatch]);

  // Reset status when component unmounts
  useEffect(() => {
    return () => {
      dispatch(resetGetAllStatus());
    };
  }, [dispatch]);

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

  // Transform campaigns data to match CampaignList component interface
  const transformCampaignsData = () => {
    return campaigns.map(campaign => {
      // Get all images from media array
      let images: string[] = ['https://picsum.photos/300/200'];

      if (campaign.media && campaign.media.length > 0) {
        // Filter only images (not videos)
        const imageMedia = campaign.media.filter(
          media => media.type === 'image',
        );
        if (imageMedia.length > 0) {
          images = imageMedia.map(media => media.url);
        } else {
          // If no images found, use all media items
          images = campaign.media.map(media => media.url);
        }
      }

      return {
        id: campaign._id,
        name: campaign.campName,
        images: images,
        priceCurrent: campaign.currentFund,
        pricegoal: campaign.totalGoal,
        donators: 0, // This might need to come from a different API endpoint
        totalGoal: campaign.totalGoal,
        dayLeft: campaign.dateCreated
          ? Math.ceil(
              (new Date().getTime() -
                new Date(campaign.dateCreated).getTime()) /
                (1000 * 60 * 60 * 24),
            ).toString()
          : '0',
      };
    });
  };

  const handleSelectItem = (id: string) => {
    console.log('Selected Item:', id);
    // Navigate to campaign detail page
    navigation.navigate('Detail', {campaignId: id});
  };

  const HomeStyles = createHomeStyles(colors);

  return (
    <SafeAreaView style={{backgroundColor: colors.background}}>
      <ScrollView style={{backgroundColor: colors.background}}>
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
                  <Image
                    source={{uri: item.url}}
                    style={HomeStyles.image}
                    resizeMode="cover"
                  />
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

          <View style={[HomeStyles.pd, HomeStyles.sectionContainer]}>
            <Text style={HomeStyles.sectionTitle}>Categories</Text>
            <CategoryList
              data={categories}
              onChangeIndex={handleCategoryChange}
              color={colors.card}
              colorActive={colors.primary}
              padV={10}
              width={100}
            />
          </View>

          <View style={[HomeStyles.pd, HomeStyles.sectionContainer]}>
            <Text style={HomeStyles.sectionTitle}>Active Campaigns</Text>
            {isLoadingGetAll ? (
              <View style={HomeStyles.loadingContainer}>
                <Text style={HomeStyles.loadingText}>Loading campaigns...</Text>
              </View>
            ) : isErrorGetAll ? (
              <View style={HomeStyles.errorContainer}>
                <Text style={HomeStyles.errorText}>{errorMessageGetAll}</Text>
              </View>
            ) : (
              <CampaignList
                data={transformCampaignsData()}
                onSelectItem={handleSelectItem}
              />
            )}
          </View>

          <View style={[HomeStyles.pd, HomeStyles.sectionContainer]}>
            <View style={AppStyles.rowContainerSpace}>
              <Text style={HomeStyles.sectionTitle}>Featured Videos</Text>
              <TextLink
                text="See all"
                size={16}
                color={colors.primary}
                fontw="600"
              />
            </View>
            <VideoList videoData={videoData} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
