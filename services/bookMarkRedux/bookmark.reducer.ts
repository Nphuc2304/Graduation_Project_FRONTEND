import { createSlice } from '@reduxjs/toolkit';
import { BookmarkState } from './bookmark.types';
import {
  fetchGetUserLikedCampaigns,
  fetchAddFavoriteCampaign,
  fetchRemoveFavoriteCampaign,
} from './bookmark.slice';

const initialState: BookmarkState = {
  // Data
  likedCampaigns: [],
  pagination: null,

  // Simple loading states
  isLoading: false,
  isError: false,
  errorMessage: '',

  // UI states
  hasMore: true,
};

const BookmarkReducer = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {
    // Reset states
    resetBookmarkStates: (state) => {
      state.isError = false;
      state.errorMessage = '';
    },
    // Clear liked campaigns
    clearLikedCampaigns: (state) => {
      state.likedCampaigns = [];
      state.pagination = null;
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get user liked campaigns cases
      .addCase(fetchGetUserLikedCampaigns.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = '';
      })
      .addCase(fetchGetUserLikedCampaigns.fulfilled, (state, action) => {
        state.isLoading = false;
        state.likedCampaigns = action.payload.data;
        state.pagination = action.payload.pagination;
        state.hasMore = action.payload.pagination.page < action.payload.pagination.pages;
        state.isError = false;
        state.errorMessage = '';
      })
      .addCase(fetchGetUserLikedCampaigns.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload?.message || 'Lấy danh sách yêu thích thất bại';
      })

      // Add favorite campaign cases
      .addCase(fetchAddFavoriteCampaign.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = '';
      })
      .addCase(fetchAddFavoriteCampaign.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.errorMessage = '';
      })
      .addCase(fetchAddFavoriteCampaign.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload?.message || 'Thêm vào yêu thích thất bại';
      })

      // Remove favorite campaign cases
      .addCase(fetchRemoveFavoriteCampaign.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = '';
      })
      .addCase(fetchRemoveFavoriteCampaign.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.errorMessage = '';
        // Remove the campaign from liked campaigns list
        const campaignId = action.meta.arg.campaignId;
        state.likedCampaigns = state.likedCampaigns.filter(campaign => campaign.id !== campaignId);
      })
      .addCase(fetchRemoveFavoriteCampaign.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload?.message || 'Xóa khỏi yêu thích thất bại';
      });
  },
});

export const { resetBookmarkStates, clearLikedCampaigns } = BookmarkReducer.actions;
export default BookmarkReducer.reducer;
