import React, { memo } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { ButtonActive } from '@components';
import CampaignList from '@home/components/CampaignList';
import colors from '@/Color';
import { BookmarkStyles } from '@styles';
import { Campaign } from '@services/bookMarkRedux';

interface BookmarkContentProps {
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
  filteredCampaigns: Campaign[];
  selectedCategory: string;
  onSelectItem: (id: string) => void;
  onLongPress: (campaign: Campaign) => void;
  onRetry: () => void;
}

export const BookmarkContent = memo<BookmarkContentProps>(({
  isLoading,
  isError,
  errorMessage,
  filteredCampaigns,
  selectedCategory,
  onSelectItem,
  onLongPress,
  onRetry,
}) => {
  if (isLoading) {
    return (
      <View style={BookmarkStyles.emptyState}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[BookmarkStyles.emptyStateText, { marginTop: 10 }]}>
          Loading bookmarks...
        </Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={BookmarkStyles.emptyState}>
        <Text style={[BookmarkStyles.emptyStateText, { color: '#FF0000' }]}>
          {errorMessage}
        </Text>
        <ButtonActive
          text="Retry"
          color={colors.white}
          bgColor={colors.primary}
          width="40%"
          radius={25}
          func={onRetry}
        />
      </View>
    );
  }

  if (filteredCampaigns.length > 0) {
    console.log('BookmarkContent: Rendering CampaignList with', filteredCampaigns.length, 'campaigns');
    return (
      <CampaignList
        data={filteredCampaigns as any}
        onSelectItem={onSelectItem}
        onLongPress={onLongPress as any}
      />
    );
  }

  return (
    <View style={BookmarkStyles.emptyState}>
      <Text style={BookmarkStyles.emptyStateText}>
        {selectedCategory === 'all'
          ? 'No bookmarked campaigns yet.\nStart exploring and bookmark your favorite campaigns!'
          : 'No bookmarked campaigns in this category'
        }
      </Text>
    </View>
  );
});