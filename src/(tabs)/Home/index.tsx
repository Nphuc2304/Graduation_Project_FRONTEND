import React, {useEffect, useState, useCallback, useRef} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Slider from '@react-native-community/slider';
import {useSelector, useDispatch} from 'react-redux';
import {useTheme} from '../../utils/ThemeContext';
import ButtonIcon from '../../../components/ButtonIcon';
import AppStyles from '../../Styles/AppStyles';
import TextLink from '../../../components/TextLink';
import VideoList from './components/VideoList';
import {useHeadAlert} from '../../../components/HeadAlertProvider';

import Header from '../../../components/Header';
import {ThemeToggle} from '../../../components/ThemeToggle';
import Carousel from 'react-native-reanimated-carousel';
import CampaignList from './components/CampaignList';
import createHomeStyles from '../../bottomTabStyles/HomeStyles';
import {RootState, AppDispatch} from '../../../services/store/store';
import {
  fetchGetAllCampaignsWithMedia,
  fetchFilterCampaigns,
} from '../../../services/campaignRedux/campaignSlice';
import {
  resetGetAllStatus,
  resetFilterStatus,
  clearFilteredCampaigns,
} from '../../../services/campaignRedux/campaignReducer';
import {FilterParams} from '../../../services/campaignRedux/campaignTypes';

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
  const {showAlert} = useHeadAlert();
  const {
    campaigns,
    isLoadingGetAll,
    isErrorGetAll,
    errorMessageGetAll,
    filteredCampaigns,
    isLoadingFilter,
    isErrorFilter,
    isSuccessFilter,
    errorMessageFilter,
    filterPagination,
    appliedFilters,
  } = useSelector((state: RootState) => state.campaigns);

  const [videoData, setVideoData] = useState<VideoItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filter states
  const [filterParams, setFilterParams] = useState<FilterParams>({
    campName: '',
    minProgress: undefined,
    maxProgress: undefined,
    minGoal: undefined,
    maxGoal: undefined,
    status: undefined,
    page: 1,
    limit: 10,
    sortBy: 'dateCreated',
    sortOrder: 'desc',
    populate: 'media',
  });

  const [showFilters, setShowFilters] = useState(false);

  // Slider states for progress range
  const [progressRange, setProgressRange] = useState({
    min: 0,
    max: 100,
  });

  // Ref to track if alerts have been shown to prevent duplicates
  const alertShownRef = useRef({
    noResults: false,
    filterApplied: false,
    filterError: false,
    loadingError: false,
  });

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
    // Reset alert flags when component mounts
    alertShownRef.current = {
      noResults: false,
      filterApplied: false,
      filterError: false,
      loadingError: false,
    };

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
      dispatch(resetFilterStatus());
    };
  }, [dispatch]);

  // Show alert when filter returns no results
  useEffect(() => {
    if (
      !isLoadingFilter &&
      !isErrorFilter &&
      filteredCampaigns.length === 0 &&
      appliedFilters &&
      isSuccessFilter &&
      !alertShownRef.current.noResults
    ) {
      alertShownRef.current.noResults = true;
      showAlert(
        'No Results Found',
        'No campaigns match your current filter criteria. Try adjusting your search parameters.',
        4000,
      );
    }
  }, [
    isLoadingFilter,
    isErrorFilter,
    filteredCampaigns.length,
    appliedFilters,
    isSuccessFilter,
  ]);

  // Show alert when filter finds results
  useEffect(() => {
    if (
      !isLoadingFilter &&
      !isErrorFilter &&
      filteredCampaigns.length > 0 &&
      appliedFilters &&
      isSuccessFilter &&
      !alertShownRef.current.filterApplied
    ) {
      alertShownRef.current.filterApplied = true;
      showAlert(
        'Filter Applied',
        `Found ${filteredCampaigns.length} campaign(s) matching your criteria.`,
        3000,
      );
    }
  }, [
    isLoadingFilter,
    isErrorFilter,
    filteredCampaigns.length,
    appliedFilters,
    isSuccessFilter,
  ]);

  // Show alert when filter has error
  useEffect(() => {
    if (
      isErrorFilter &&
      errorMessageFilter &&
      !alertShownRef.current.filterError
    ) {
      alertShownRef.current.filterError = true;
      showAlert(
        'Filter Error',
        errorMessageFilter || 'An error occurred while filtering campaigns.',
        4000,
      );
    }
  }, [isErrorFilter, errorMessageFilter]);

  // Show alert when loading all campaigns has error
  useEffect(() => {
    if (
      isErrorGetAll &&
      errorMessageGetAll &&
      !alertShownRef.current.loadingError
    ) {
      alertShownRef.current.loadingError = true;
      showAlert(
        'Loading Error',
        errorMessageGetAll || 'An error occurred while loading campaigns.',
        4000,
      );
    }
  }, [isErrorGetAll, errorMessageGetAll]);

  const handleCarouselIndexChange = (index: number) => {
    setCurrentIndex(index); // Cập nhật chỉ số khi carousel thay đổi
  };

  // Filter functions
  const handleFilter = () => {
    // Reset alert flags when starting new filter
    alertShownRef.current = {
      noResults: false,
      filterApplied: false,
      filterError: false,
      loadingError: false,
    };
    const params = {...filterParams, page: 1}; // Reset to first page when filtering
    dispatch(fetchFilterCampaigns(params));
  };

  const handleClearFilters = () => {
    // Reset alert flags when clearing filters
    alertShownRef.current = {
      noResults: false,
      filterApplied: false,
      filterError: false,
      loadingError: false,
    };
    setFilterParams({
      campName: '',
      minProgress: undefined,
      maxProgress: undefined,
      minGoal: undefined,
      maxGoal: undefined,
      status: undefined,
      page: 1,
      limit: 10,
      sortBy: 'dateCreated',
      sortOrder: 'desc',
      populate: 'media',
    });
    setProgressRange({
      min: 0,
      max: 100,
    });
    dispatch(clearFilteredCampaigns());
    dispatch(resetFilterStatus());
  };

  const handleLoadMore = () => {
    if (filterPagination && filterPagination.hasNextPage) {
      const nextPage = filterPagination.currentPage + 1;
      const params = {...filterParams, page: nextPage};
      dispatch(fetchFilterCampaigns(params));
    }
  };

  // Transform campaigns data to match CampaignList component interface
  const transformCampaignsData = (campaignsData: any[]) => {
    return campaignsData.map(campaign => {
      // Get all images from media array
      let images: string[] = ['https://picsum.photos/300/200'];

      if (campaign.media && campaign.media.length > 0) {
        // Filter only images (not videos)
        const imageMedia = campaign.media.filter(
          (media: any) => media.type === 'image',
        );
        if (imageMedia.length > 0) {
          images = imageMedia.map((media: any) => media.url);
        } else {
          // If no images found, use all media items
          images = campaign.media.map((media: any) => media.url);
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

  // Determine which campaigns to display
  const displayCampaigns =
    filteredCampaigns.length > 0 ? filteredCampaigns : campaigns;
  const isFiltered = filteredCampaigns.length > 0;

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

          {/* Filter Section */}
          <View style={[HomeStyles.pd, HomeStyles.sectionContainer]}>
            <View style={HomeStyles.filterHeader}>
              <Text style={HomeStyles.filterTitle}>🔍 Filter Campaigns</Text>
              <TouchableOpacity
                onPress={() => setShowFilters(!showFilters)}
                style={HomeStyles.filterToggleButton}>
                <Text style={HomeStyles.filterToggleText}>
                  {showFilters ? 'Hide Filters' : 'Show Filters'}
                </Text>
              </TouchableOpacity>
            </View>

            {showFilters && (
              <View style={HomeStyles.filterContainer}>
                {/* Search by name */}
                <View style={HomeStyles.searchContainer}>
                  <TextInput
                    style={HomeStyles.searchInput}
                    placeholder="🔎 Search campaign name..."
                    placeholderTextColor={colors.text + '80'}
                    value={filterParams.campName}
                    onChangeText={text =>
                      setFilterParams({...filterParams, campName: text})
                    }
                  />
                </View>

                {/* Progress range */}
                <View style={HomeStyles.rangeContainer}>
                  <Text style={HomeStyles.rangeTitle}>
                    📊 Progress Range (%)
                  </Text>

                  {/* Min Progress Slider */}
                  <View style={HomeStyles.sliderContainer}>
                    <View style={HomeStyles.sliderHeader}>
                      <Text style={HomeStyles.sliderLabel}>Min Progress</Text>
                      <Text style={HomeStyles.sliderValue}>
                        {progressRange.min}%
                      </Text>
                    </View>
                    <Slider
                      style={HomeStyles.slider}
                      minimumValue={0}
                      maximumValue={100}
                      value={progressRange.min}
                      onValueChange={value => {
                        const newMin = Math.round(value);
                        setProgressRange(prev => ({
                          ...prev,
                          min: newMin,
                        }));
                        setFilterParams({
                          ...filterParams,
                          minProgress: newMin,
                        });
                      }}
                      minimumTrackTintColor={colors.primary}
                      maximumTrackTintColor={colors.border}
                      thumbTintColor={colors.primary}
                    />
                  </View>

                  {/* Max Progress Slider */}
                  <View style={HomeStyles.sliderContainer}>
                    <View style={HomeStyles.sliderHeader}>
                      <Text style={HomeStyles.sliderLabel}>Max Progress</Text>
                      <Text style={HomeStyles.sliderValue}>
                        {progressRange.max}%
                      </Text>
                    </View>
                    <Slider
                      style={HomeStyles.slider}
                      minimumValue={0}
                      maximumValue={100}
                      value={progressRange.max}
                      onValueChange={value => {
                        const newMax = Math.round(value);
                        setProgressRange(prev => ({
                          ...prev,
                          max: newMax,
                        }));
                        setFilterParams({
                          ...filterParams,
                          maxProgress: newMax,
                        });
                      }}
                      minimumTrackTintColor={colors.primary}
                      maximumTrackTintColor={colors.border}
                      thumbTintColor={colors.primary}
                    />
                  </View>
                </View>

                {/* Goal amount range */}
                <View style={HomeStyles.rangeContainer}>
                  <Text style={HomeStyles.rangeTitle}>
                    💰 Goal Amount Range
                  </Text>
                  <View style={HomeStyles.rangeRow}>
                    <TextInput
                      style={HomeStyles.rangeInput}
                      placeholder="Min goal"
                      placeholderTextColor={colors.text + '80'}
                      keyboardType="numeric"
                      value={filterParams.minGoal?.toString() || ''}
                      onChangeText={text =>
                        setFilterParams({
                          ...filterParams,
                          minGoal: text ? parseFloat(text) : undefined,
                        })
                      }
                    />
                    <TextInput
                      style={HomeStyles.rangeInput}
                      placeholder="Max goal"
                      placeholderTextColor={colors.text + '80'}
                      keyboardType="numeric"
                      value={filterParams.maxGoal?.toString() || ''}
                      onChangeText={text =>
                        setFilterParams({
                          ...filterParams,
                          maxGoal: text ? parseFloat(text) : undefined,
                        })
                      }
                    />
                  </View>
                </View>

                {/* Status filter */}
                <View style={HomeStyles.statusContainer}>
                  <Text style={HomeStyles.statusTitle}>📋 Campaign Status</Text>
                  <View style={HomeStyles.statusRow}>
                    {(['preparing', 'active', 'ended'] as const).map(status => (
                      <TouchableOpacity
                        key={status}
                        style={[
                          HomeStyles.statusButton,
                          filterParams.status === status
                            ? HomeStyles.statusButtonActive
                            : HomeStyles.statusButtonInactive,
                        ]}
                        onPress={() =>
                          setFilterParams({
                            ...filterParams,
                            status:
                              filterParams.status === status
                                ? undefined
                                : status,
                          })
                        }>
                        <Text
                          style={[
                            HomeStyles.statusText,
                            filterParams.status === status
                              ? HomeStyles.statusTextActive
                              : HomeStyles.statusTextInactive,
                          ]}>
                          {status}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                {/* Filter buttons */}
                <View style={HomeStyles.filterActions}>
                  <TouchableOpacity
                    style={[HomeStyles.actionButton, HomeStyles.applyButton]}
                    onPress={handleFilter}>
                    <Text style={HomeStyles.actionButtonText}>
                      ✅ Apply Filters
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[HomeStyles.actionButton, HomeStyles.clearButton]}
                    onPress={handleClearFilters}>
                    <Text style={HomeStyles.actionButtonText}>
                      🗑️ Clear All
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>

          <View style={[HomeStyles.pd, HomeStyles.sectionContainer]}>
            <View style={AppStyles.rowContainerSpace}>
              <Text style={HomeStyles.sectionTitle}>
                {isFiltered ? 'Filtered Campaigns' : 'Active Campaigns'}
              </Text>
              {isFiltered && filterPagination && (
                <Text style={{color: colors.text, fontSize: 12}}>
                  Page {filterPagination.currentPage} of{' '}
                  {filterPagination.totalPages}
                </Text>
              )}
            </View>

            {isLoadingFilter ? (
              <View style={HomeStyles.loadingContainer}>
                <Text style={HomeStyles.loadingText}>
                  Filtering campaigns...
                </Text>
              </View>
            ) : isErrorFilter ? (
              <View style={HomeStyles.errorContainer}>
                <Text style={HomeStyles.errorText}>{errorMessageFilter}</Text>
              </View>
            ) : isLoadingGetAll ? (
              <View style={HomeStyles.loadingContainer}>
                <Text style={HomeStyles.loadingText}>Loading campaigns...</Text>
              </View>
            ) : isErrorGetAll ? (
              <View style={HomeStyles.errorContainer}>
                <Text style={HomeStyles.errorText}>{errorMessageGetAll}</Text>
              </View>
            ) : (
              <>
                <CampaignList
                  data={transformCampaignsData(displayCampaigns)}
                  onSelectItem={handleSelectItem}
                />
                {isFiltered &&
                  filterPagination &&
                  filterPagination.hasNextPage && (
                    <TouchableOpacity
                      style={{
                        padding: 12,
                        backgroundColor: colors.primary,
                        borderRadius: 8,
                        marginTop: 15,
                      }}
                      onPress={handleLoadMore}>
                      <Text style={{textAlign: 'center', color: 'white'}}>
                        Load More
                      </Text>
                    </TouchableOpacity>
                  )}
              </>
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
            {/* <VideoList videoData={videoData} /> */}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
