import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '@services/api';
import {
  GetUserLikedCampaignsResponse,
  AddFavoriteCampaignRequest,
  AddFavoriteCampaignResponse,
  RemoveFavoriteCampaignRequest,
  RemoveFavoriteCampaignResponse,
  ApiError,
} from './bookmark.types';

// API Configuration
const USER_CAMPAIGN_LIKES_ENDPOINT = `${BASE_URL}user-campaign-likes`;

// Async thunk for getting user liked campaigns
export const fetchGetUserLikedCampaigns = createAsyncThunk<
  GetUserLikedCampaignsResponse,
  { userId: string; page?: number; limit?: number },
  { rejectValue: ApiError }
>(
  'bookmarks/fetchGetUserLikedCampaigns',
  async ({ userId, page = 1, limit = 20 }, { rejectWithValue }) => {
    try {
      const response = await axios.get<GetUserLikedCampaignsResponse>(
        `${USER_CAMPAIGN_LIKES_ENDPOINT}/user/${userId}`,
        {
          params: { page, limit },
          timeout: 15000,
        }
      );

      if (response.data.message === 'success') {
        return response.data;
      } else {
        return rejectWithValue({
          status: 'error',
          message: 'Failed to fetch liked campaigns',
          statusCode: response.status,
        });
      }
    } catch (error: any) {
      return rejectWithValue({
        status: 'error',
        message: error.response?.data?.message || 'Network error',
        statusCode: error.response?.status || 500,
      });
    }
  }
);

// Async thunk for adding campaign to favorites
export const fetchAddFavoriteCampaign = createAsyncThunk<
  AddFavoriteCampaignResponse,
  AddFavoriteCampaignRequest,
  { rejectValue: ApiError }
>(
  'bookmarks/fetchAddFavoriteCampaign',
  async ({ userId, campaignId }, { rejectWithValue }) => {
    try {
      const response = await axios.post<AddFavoriteCampaignResponse>(
        `${USER_CAMPAIGN_LIKES_ENDPOINT}/add`,
        { userId, campaignId },
        { timeout: 15000 }
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue({
        status: 'error',
        message: error.response?.data?.message || 'Failed to add to favorites',
        statusCode: error.response?.status || 500,
      });
    }
  }
);

// Async thunk for removing campaign from favorites
export const fetchRemoveFavoriteCampaign = createAsyncThunk<
  RemoveFavoriteCampaignResponse,
  RemoveFavoriteCampaignRequest,
  { rejectValue: ApiError }
>(
  'bookmarks/fetchRemoveFavoriteCampaign',
  async ({ userId, campaignId }, { rejectWithValue }) => {
    try {
      const response = await axios.post<RemoveFavoriteCampaignResponse>(
        `${USER_CAMPAIGN_LIKES_ENDPOINT}/remove`,
        { userId, campaignId },
        { timeout: 15000 }
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue({
        status: 'error',
        message: error.response?.data?.message || 'Failed to remove from favorites',
        statusCode: error.response?.status || 500,
      });
    }
  }
);
