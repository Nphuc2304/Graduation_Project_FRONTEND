import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import React, {useEffect} from 'react';
import DetailsStyles from '../../Styles/DetailStyles';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState, AppDispatch} from '../../../services/store/store';
import {fetchGetCampaignById} from '../../../services/campaignRedux/campaignSlice';
import {resetGetByIdStatus} from '../../../services/campaignRedux/campaignReducer';
import colors from '../../Color';
import DetailImageCarousel from './components/DetailImageCarousel';
import {BASE_URL} from '../../../services/api';

const {width: screenWidth} = Dimensions.get('window');

export const Detail = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const dispatch = useDispatch<AppDispatch>();

  // Get campaign ID from route params
  const {campaignId} = route.params || {};

  // Get campaign data from Redux store
  const {
    currentCampaign,
    isLoadingGetById,
    isErrorGetById,
    errorMessageGetById,
  } = useSelector((state: RootState) => state.campaigns);

  useEffect(() => {
    if (campaignId) {
      // Fetch campaign details when component mounts
      dispatch(fetchGetCampaignById(campaignId));
    }

    // Reset status when component unmounts
    return () => {
      dispatch(resetGetByIdStatus());
    };
  }, [dispatch, campaignId]);

  // Calculate percentage if campaign data exists
  const percent = currentCampaign
    ? parseFloat(
        Math.min(
          100,
          Math.max(
            0,
            (currentCampaign.currentFund / currentCampaign.totalGoal) * 100,
          ),
        ).toFixed(0),
      )
    : 0;

  // Get all images from campaign media
  const getCampaignImages = () => {
    console.log('Current campaign media:', currentCampaign?.media);

    if (currentCampaign?.media && currentCampaign.media.length > 0) {
      // Handle both populated media objects and media IDs
      const imageMedia = currentCampaign.media.filter(media => {
        console.log('Processing media item:', media, 'Type:', typeof media);
        // If media is populated object
        if (typeof media === 'object' && media !== null) {
          return media.type === 'image';
        }
        // If media is just an ID string, we can't determine type
        // So we'll include it and let the backend handle it
        return true;
      });

      console.log('Filtered image media:', imageMedia);

      if (imageMedia.length > 0) {
        const imageUrls = imageMedia.map(media => {
          // If media is populated object
          if (typeof media === 'object' && media !== null) {
            return media.url;
          }
          // If media is just an ID, construct a URL using BASE_URL
          return `${BASE_URL}media/${media}`;
        });

        console.log('Final image URLs:', imageUrls);
        return imageUrls;
      }
    }
    // Return default image if no images found
    console.log('No media found, using default image');
    return ['https://via.placeholder.com/400x250'];
  };

  // Calculate days since creation
  const getDaysLeft = () => {
    if (currentCampaign?.dateCreated) {
      const daysSinceCreation = Math.ceil(
        (new Date().getTime() -
          new Date(currentCampaign.dateCreated).getTime()) /
          (1000 * 60 * 60 * 24),
      );
      return daysSinceCreation > 0 ? daysSinceCreation : 0;
    }
    return 0;
  };

  // Get campaign type name from ID
  const getCampaignTypeName = (typeId: string) => {
    const typeMapping: {[key: string]: string} = {
      '1': 'Medical Aid',
      '2': 'Disaster Relief',
      '3': 'Education Fund',
      '4': 'Animal Welfare',
      '5': 'Community Projects',
      '6': 'Environmental Causes',
      '7': 'Startup Funding',
      '8': 'Sports & Fitness',
      '9': 'Arts & Culture',
      '10': 'Emergency Assistance',
    };
    return typeMapping[typeId] || typeId;
  };

  if (isLoadingGetById) {
    return (
      <SafeAreaView style={DetailsStyles.container}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: colors.primary}}>
            Loading campaign details...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (isErrorGetById) {
    return (
      <SafeAreaView style={DetailsStyles.container}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: 'red'}}>{errorMessageGetById}</Text>
          <TouchableOpacity
            style={{
              marginTop: 20,
              padding: 10,
              backgroundColor: colors.primary,
              borderRadius: 5,
            }}
            onPress={() => navigation.goBack()}>
            <Text style={{color: 'white'}}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (!currentCampaign) {
    return (
      <SafeAreaView style={DetailsStyles.container}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: 'red'}}>Campaign not found</Text>
          <TouchableOpacity
            style={{
              marginTop: 20,
              padding: 10,
              backgroundColor: colors.primary,
              borderRadius: 5,
            }}
            onPress={() => navigation.goBack()}>
            <Text style={{color: 'white'}}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={DetailsStyles.container}>
      <ScrollView style={DetailsStyles.container}>
        <View style={{width: '100%'}}>
          <DetailImageCarousel
            images={getCampaignImages()}
            height={250}
            width={screenWidth}
          />
          <View
            style={[DetailsStyles.rowSpace, DetailsStyles.rowSpaceAbsolute]}>
            <TouchableOpacity
              style={DetailsStyles.btnRounded}
              onPress={() => navigation.goBack()}>
              <Image
                source={require('../../../assets/icons/back.png')}
                style={DetailsStyles.iconBack}
              />
            </TouchableOpacity>
            <View style={[DetailsStyles.row, DetailsStyles.fourContainer]}>
              <TouchableOpacity>
                <Image
                  source={require('../../../assets/icons/share.png')}
                  style={DetailsStyles.icon}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  source={require('../../../assets/icons/mark.png')}
                  style={DetailsStyles.icon}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={DetailsStyles.secondContainer}>
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={DetailsStyles.textXL}>
            {currentCampaign.campName}
          </Text>
          <View style={DetailsStyles.row}>
            <Text style={[DetailsStyles.textS, {color: colors.primary}]}>
              {currentCampaign.currentFund.toLocaleString()} VNĐ{' '}
            </Text>
            <Text style={DetailsStyles.textS}>Quỹ huy động từ </Text>
            <Text style={[DetailsStyles.textS, {color: colors.primary}]}>
              {currentCampaign.totalGoal.toLocaleString()} VNĐ
            </Text>
          </View>
          <View style={DetailsStyles.row}>
            <View style={DetailsStyles.goal}>
              <View
                style={{
                  height: percent == 0 ? 0 : 3,
                  width: `${percent}%`,
                  backgroundColor: colors.primary,
                  borderRadius: 5,
                  position: 'absolute',
                  top: 0,
                }}></View>
            </View>
            <Text style={[DetailsStyles.textXS, {marginLeft: 15}]}>
              {percent}%
            </Text>
          </View>
          <View style={DetailsStyles.rowSpace}>
            <Text style={DetailsStyles.textS}>
              <Text style={{color: colors.primary}}>
                {currentCampaign.currentFund.toLocaleString()}
              </Text>{' '}
              raised
            </Text>
            <Text style={DetailsStyles.textS}>
              <Text style={{color: colors.primary}}>{getDaysLeft()}</Text> days
              left
            </Text>
          </View>
          <View style={DetailsStyles.rowSpace}>
            <TouchableOpacity style={DetailsStyles.btnSmall}>
              <Text style={[DetailsStyles.textXXS, {color: 'white'}]}>
                {getCampaignTypeName(currentCampaign.campTypeID)}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={DetailsStyles.row}>
              <Text style={[DetailsStyles.textXS, {color: colors.primary}]}>
                {currentCampaign.totalGoal.toLocaleString()} goal
              </Text>
              <Image
                source={require('../../../assets/icons/rightB.png')}
                style={DetailsStyles.smallIcon}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={DetailsStyles.btnLarge}
            onPress={() => navigation.navigate('Donation')}>
            <Text style={[DetailsStyles.textL, {color: 'white'}]}>
              Donation Now
            </Text>
          </TouchableOpacity>
        </View>
        <View style={DetailsStyles.thirdContainer}>
          <View style={DetailsStyles.fourContainer}>
            <Text style={DetailsStyles.textL}>Fundraiser</Text>
            <View style={DetailsStyles.rowSpace}>
              <View style={[DetailsStyles.btnRounded, {width: 46, height: 46}]}>
                <Image
                  source={require('../../../assets/icons/homeB.png')}
                  style={DetailsStyles.smallIcon}
                />
              </View>
              <View style={[DetailsStyles.mgL, {flex: 1}]}>
                <Text style={DetailsStyles.textM}>
                  {currentCampaign.hostType === 'admin'
                    ? 'Organization'
                    : 'Individual'}
                </Text>
                <Text style={DetailsStyles.textXXS}>Verfied ✅</Text>
              </View>
              <TouchableOpacity style={DetailsStyles.btnBorder}>
                <Text style={[DetailsStyles.textXXS, {color: colors.primary}]}>
                  Follow
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={DetailsStyles.fourContainer}>
            <Text style={DetailsStyles.textL}>Patient</Text>
            <View style={DetailsStyles.row}>
              <View style={[DetailsStyles.btnRounded, {width: 46, height: 46}]}>
                <Image
                  source={require('../../../assets/icons/userB.png')}
                  style={DetailsStyles.smallIcon}
                />
              </View>
              <View style={DetailsStyles.mgL}>
                <Text style={DetailsStyles.textM}>Patient (or) Place</Text>
                <Text style={DetailsStyles.textXXS}>
                  Accompanied by medical documents ✅
                </Text>
              </View>
            </View>
          </View>
          <View style={DetailsStyles.fourContainer}>
            <Text style={DetailsStyles.textL}>Story</Text>
            <Text
              style={[
                DetailsStyles.textM,
                {fontWeight: '400', textAlign: 'justify'},
              ]}>
              {currentCampaign.campDescription || 'No description available'}{' '}
              <Text style={[DetailsStyles.textM, {color: colors.primary}]}>
                Read more ...
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
