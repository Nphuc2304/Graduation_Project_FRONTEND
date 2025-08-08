import React, { useState, useCallback, useMemo, memo, useEffect } from 'react';
import { SafeAreaView, View, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from '@components';
import { BookmarkStyles } from '@styles';
import {
  fetchGetUserLikedCampaigns,
  fetchRemoveFavoriteCampaign,
  Campaign,
} from '@services/bookMarkRedux';
import { RootState, AppDispatch } from '@services/store/store';
import { CategoryFilter, BookmarkContent, BookmarkModal } from './components';

// Types
interface Category {
  id: string;
  name: string;
}

export const Bookmark = memo<{ navigation: any }>(({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { likedCampaigns, isLoading, isError, errorMessage } = useSelector(
    (state: RootState) => state.bookmarks
  );
  const { user } = useSelector((state: RootState) => state.user);

  // State management
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

  // Load bookmarks on component mount
  useEffect(() => {
    if (user?._id) {
      dispatch(fetchGetUserLikedCampaigns({ userId: user._id, page: 1, limit: 20 }));
    }
  }, [dispatch, user?._id]);

  // Memoized static data
  const categories = useMemo<Category[]>(() => [
    { id: 'all', name: 'All' },
    { id: '1', name: 'Medical Aid' },
    { id: '2', name: 'Disaster Relief' },
    { id: '3', name: 'Education Fund' },
    { id: '4', name: 'Animal Welfare' },
    { id: '5', name: 'Community Projects' },
    { id: '6', name: 'Environmental Causes' },
    { id: '7', name: 'Startup Funding' },
    { id: '8', name: 'Sports & Fitness' },
    { id: '9', name: 'Arts & Culture' },
    { id: '10', name: 'Emergency Assistance' },
  ], []);

  // Memoized filtered campaigns based on selected category
  const filteredCampaigns = useMemo(() => {
    if (selectedCategory === 'all') {
      return likedCampaigns;
    }
    // TODO: Implement category filtering when backend supports it
    return likedCampaigns;
  }, [likedCampaigns, selectedCategory]);

  // Event handlers
  const handleCategoryChange = useCallback((categoryId: string) => {
    setSelectedCategory(categoryId);
  }, []);

  const handleSelectItem = useCallback((id: string) => {
    navigation.navigate('Detail', { campaignId: id });
  }, [navigation]);

  const handleLongPress = useCallback((campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setModalVisible(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalVisible(false);
    setSelectedCampaign(null);
  }, []);

  const handleRemoveBookmark = useCallback(async () => {
    if (selectedCampaign && user?._id) {
      try {
        await dispatch(fetchRemoveFavoriteCampaign({
          userId: user._id,
          campaignId: selectedCampaign.id
        })).unwrap();
      } catch (error) {
        console.error('Error removing bookmark:', error);
      }
    }
    handleCloseModal();
  }, [selectedCampaign, dispatch, handleCloseModal, user?._id]);

  const handleRetry = useCallback(() => {
    if (user?._id) {
      dispatch(fetchGetUserLikedCampaigns({ userId: user._id, page: 1, limit: 20 }));
    }
  }, [dispatch, user?._id]);

  return (
    <>
      <SafeAreaView style={BookmarkStyles.container}>
        <Header
          iconBack={require('@assets/icons/back.png')}
          title="Bookmark"
          icon={require('@assets/icons/vertical_dots.png')}
          mg={20}
          navigation={navigation}
        />

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />

        <View style={BookmarkStyles.campaignSection}>
          <BookmarkContent
            isLoading={isLoading}
            isError={isError}
            errorMessage={errorMessage}
            filteredCampaigns={filteredCampaigns}
            selectedCategory={selectedCategory}
            onSelectItem={handleSelectItem}
            onLongPress={handleLongPress}
            onRetry={handleRetry}
          />
        </View>
      </SafeAreaView>
      <View>
        <BookmarkModal
          visible={modalVisible}
          selectedCampaign={selectedCampaign}
          onClose={handleCloseModal}
          onRemove={handleRemoveBookmark}
        />
      </View>
    </>
  );
});
