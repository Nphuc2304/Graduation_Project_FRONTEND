import {createAsyncThunk} from '@reduxjs/toolkit';
import {
  Campaign,
  CampaignResponse,
  CampaignsResponse,
  CreateCampaignRequest,
  UpdateCampaignRequest,
  FilterParams,
  FilterCampaignsResponse,
} from './campaignTypes';
import axiosInstance from '../axiosInstance';
import {API} from '../api';

// 1. Get all campaigns
export const fetchGetAllCampaigns = createAsyncThunk<
  Campaign[],
  void,
  {rejectValue: {message: string}}
>('campaigns/getAll', async (_, {rejectWithValue}) => {
  try {
    const response = await axiosInstance.get<CampaignsResponse>(
      API.GET_ALL_CAMPAIGNS,
    );

    return response.data.campaigns;
  } catch (error: any) {
    return rejectWithValue({
      message:
        error.response?.data?.error || 'Lấy danh sách chiến dịch thất bại',
    });
  }
});

// 1.1. Get all campaigns with media populated
export const fetchGetAllCampaignsWithMedia = createAsyncThunk<
  Campaign[],
  void,
  {rejectValue: {message: string}}
>('campaigns/getAllWithMedia', async (_, {rejectWithValue}) => {
  try {
    const response = await axiosInstance.get<CampaignsResponse>(
      `${API.GET_ALL_CAMPAIGNS}?populate=media`,
    );

    return response.data.campaigns;
  } catch (error: any) {
    return rejectWithValue({
      message:
        error.response?.data?.error || 'Lấy danh sách chiến dịch thất bại',
    });
  }
});

// 2. Get campaign by ID
export const fetchGetCampaignById = createAsyncThunk<
  Campaign,
  string,
  {rejectValue: {message: string}}
>('campaigns/getById', async (campaignId, {rejectWithValue}) => {
  try {
    const response = await axiosInstance.get<CampaignResponse>(
      `${API.GET_CAMPAIGN_BY_ID}/${campaignId}?populate=media`,
    );

    return response.data.data.campaign;
  } catch (error: any) {
    return rejectWithValue({
      message:
        error.response?.data?.error || 'Lấy thông tin chiến dịch thất bại',
    });
  }
});

// 3. Create campaign
export const fetchCreateCampaign = createAsyncThunk<
  Campaign,
  CreateCampaignRequest,
  {rejectValue: {message: string}}
>('campaigns/create', async (campaignData, {rejectWithValue}) => {
  try {
    // Create FormData for file upload
    const formData = new FormData();

    // Add text fields
    formData.append('hostID', campaignData.hostID);
    formData.append('hostType', campaignData.hostType);
    formData.append('totalGoal', campaignData.totalGoal.toString());
    formData.append('campTypeID', campaignData.campTypeID);
    formData.append('campName', campaignData.campName);
    formData.append('campDescription', campaignData.campDescription);

    if (campaignData.dateEnd) {
      formData.append('dateEnd', campaignData.dateEnd);
    }

    if (campaignData.currentFund) {
      formData.append('currentFund', campaignData.currentFund.toString());
    }

    // Add media files if any
    if (campaignData.mediaFiles && campaignData.mediaFiles.length > 0) {
      campaignData.mediaFiles.forEach((file, index) => {
        formData.append('mediaFiles', file);
      });
    }

    const response = await axiosInstance.post<CampaignResponse>(
      API.CREATE_CAMPAIGN,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    return response.data.data.campaign;
  } catch (error: any) {
    return rejectWithValue({
      message: error.response?.data?.error || 'Tạo chiến dịch thất bại',
    });
  }
});

// 4. Update campaign
export const fetchUpdateCampaign = createAsyncThunk<
  Campaign,
  UpdateCampaignRequest,
  {rejectValue: {message: string}}
>('campaigns/update', async (campaignData, {rejectWithValue}) => {
  try {
    // Create FormData for file upload
    const formData = new FormData();

    // Add text fields
    if (campaignData.hostID) formData.append('hostID', campaignData.hostID);
    if (campaignData.hostType)
      formData.append('hostType', campaignData.hostType);
    if (campaignData.status) formData.append('status', campaignData.status);
    if (campaignData.totalGoal)
      formData.append('totalGoal', campaignData.totalGoal.toString());
    if (campaignData.campTypeID)
      formData.append('campTypeID', campaignData.campTypeID);
    if (campaignData.campName)
      formData.append('campName', campaignData.campName);
    if (campaignData.campDescription)
      formData.append('campDescription', campaignData.campDescription);

    if (campaignData.dateEnd) {
      formData.append('dateEnd', campaignData.dateEnd);
    }

    if (campaignData.currentFund !== undefined) {
      formData.append('currentFund', campaignData.currentFund.toString());
    }

    // Add media files if any
    if (campaignData.mediaFiles && campaignData.mediaFiles.length > 0) {
      campaignData.mediaFiles.forEach((file, index) => {
        formData.append('mediaFiles', file);
      });
    }

    const response = await axiosInstance.put<CampaignResponse>(
      `${API.UPDATE_CAMPAIGN}/${campaignData._id}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    return response.data.data.campaign;
  } catch (error: any) {
    return rejectWithValue({
      message: error.response?.data?.error || 'Cập nhật chiến dịch thất bại',
    });
  }
});

// 5. Filter campaigns
export const fetchFilterCampaigns = createAsyncThunk<
  {
    campaigns: Campaign[];
    pagination: any;
    filters: any;
  },
  FilterParams,
  {rejectValue: {message: string}}
>('campaigns/filter', async (filterParams, {rejectWithValue}) => {
  try {
    // Build query string from filter parameters
    const queryParams = new URLSearchParams();

    if (filterParams.campName) {
      queryParams.append('campName', filterParams.campName);
    }
    if (filterParams.minProgress !== undefined) {
      queryParams.append('minProgress', filterParams.minProgress.toString());
    }
    if (filterParams.maxProgress !== undefined) {
      queryParams.append('maxProgress', filterParams.maxProgress.toString());
    }
    if (filterParams.minGoal !== undefined) {
      queryParams.append('minGoal', filterParams.minGoal.toString());
    }
    if (filterParams.maxGoal !== undefined) {
      queryParams.append('maxGoal', filterParams.maxGoal.toString());
    }
    if (filterParams.minRemaining !== undefined) {
      queryParams.append('minRemaining', filterParams.minRemaining.toString());
    }
    if (filterParams.maxRemaining !== undefined) {
      queryParams.append('maxRemaining', filterParams.maxRemaining.toString());
    }
    if (filterParams.status) {
      queryParams.append('status', filterParams.status);
    }
    if (filterParams.page) {
      queryParams.append('page', filterParams.page.toString());
    }
    if (filterParams.limit) {
      queryParams.append('limit', filterParams.limit.toString());
    }
    if (filterParams.sortBy) {
      queryParams.append('sortBy', filterParams.sortBy);
    }
    if (filterParams.sortOrder) {
      queryParams.append('sortOrder', filterParams.sortOrder);
    }
    if (filterParams.populate) {
      queryParams.append('populate', filterParams.populate);
    }

    const queryString = queryParams.toString();
    const url = queryString
      ? `${API.FILTER_CAMPAIGNS}?${queryString}`
      : API.FILTER_CAMPAIGNS;

    const response = await axiosInstance.get<FilterCampaignsResponse>(url);

    return {
      campaigns: response.data.data.campaigns,
      pagination: response.data.data.pagination,
      filters: response.data.data.filters,
    };
  } catch (error: any) {
    return rejectWithValue({
      message: error.response?.data?.error || 'Lọc chiến dịch thất bại',
    });
  }
});
