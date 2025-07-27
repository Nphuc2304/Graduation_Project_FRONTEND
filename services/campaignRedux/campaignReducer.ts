import {createSlice} from '@reduxjs/toolkit';
import {
  fetchGetAllCampaigns,
  fetchGetAllCampaignsWithMedia,
  fetchGetCampaignById,
  fetchCreateCampaign,
  fetchUpdateCampaign,
  fetchFilterCampaigns,
} from './campaignSlice';
import {Campaign, CampaignState} from './campaignTypes';

const initialState: CampaignState = {
  campaigns: [],
  currentCampaign: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',

  // Individual action states
  isLoadingGetAll: false,
  isSuccessGetAll: false,
  isErrorGetAll: false,
  errorMessageGetAll: '',

  isLoadingGetById: false,
  isSuccessGetById: false,
  isErrorGetById: false,
  errorMessageGetById: '',

  isLoadingCreate: false,
  isSuccessCreate: false,
  isErrorCreate: false,
  errorMessageCreate: '',

  isLoadingUpdate: false,
  isSuccessUpdate: false,
  isErrorUpdate: false,
  errorMessageUpdate: '',

  // Filter campaigns states
  isLoadingFilter: false,
  isSuccessFilter: false,
  isErrorFilter: false,
  errorMessageFilter: '',
  filteredCampaigns: [],
  filterPagination: null,
  appliedFilters: null,
};

const CampaignReducer = createSlice({
  name: 'campaigns',
  initialState,
  reducers: {
    resetStatus: state => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = '';
    },
    setCurrentCampaign: (state, action) => {
      state.currentCampaign = action.payload;
    },
    clearCurrentCampaign: state => {
      state.currentCampaign = null;
    },
    clearCampaigns: state => {
      state.campaigns = [];
      state.currentCampaign = null;
    },

    // Reset individual action states
    resetGetAllStatus: state => {
      state.isLoadingGetAll = false;
      state.isErrorGetAll = false;
      state.isSuccessGetAll = false;
      state.errorMessageGetAll = '';
    },
    resetGetByIdStatus: state => {
      state.isLoadingGetById = false;
      state.isErrorGetById = false;
      state.isSuccessGetById = false;
      state.errorMessageGetById = '';
    },
    resetCreateStatus: state => {
      state.isLoadingCreate = false;
      state.isErrorCreate = false;
      state.isSuccessCreate = false;
      state.errorMessageCreate = '';
    },
    resetUpdateStatus: state => {
      state.isLoadingUpdate = false;
      state.isErrorUpdate = false;
      state.isSuccessUpdate = false;
      state.errorMessageUpdate = '';
    },
    resetFilterStatus: state => {
      state.isLoadingFilter = false;
      state.isErrorFilter = false;
      state.isSuccessFilter = false;
      state.errorMessageFilter = '';
    },
    clearFilteredCampaigns: state => {
      state.filteredCampaigns = [];
      state.filterPagination = null;
      state.appliedFilters = null;
    },
  },
  extraReducers: builder => {
    builder
      // Get all campaigns cases
      .addCase(fetchGetAllCampaigns.pending, state => {
        state.isLoadingGetAll = true;
        state.isErrorGetAll = false;
        state.isSuccessGetAll = false;
      })
      .addCase(fetchGetAllCampaigns.fulfilled, (state, action) => {
        state.isLoadingGetAll = false;
        state.isSuccessGetAll = true;
        state.campaigns = action.payload;
        state.errorMessageGetAll = '';
      })
      .addCase(fetchGetAllCampaigns.rejected, (state, action) => {
        state.isLoadingGetAll = false;
        state.isErrorGetAll = true;
        state.errorMessageGetAll =
          action.payload?.message || 'Lấy danh sách chiến dịch thất bại';
      })

      // Get all campaigns with media cases
      .addCase(fetchGetAllCampaignsWithMedia.pending, state => {
        state.isLoadingGetAll = true;
        state.isErrorGetAll = false;
        state.isSuccessGetAll = false;
      })
      .addCase(fetchGetAllCampaignsWithMedia.fulfilled, (state, action) => {
        state.isLoadingGetAll = false;
        state.isSuccessGetAll = true;
        state.campaigns = action.payload;
        state.errorMessageGetAll = '';
      })
      .addCase(fetchGetAllCampaignsWithMedia.rejected, (state, action) => {
        state.isLoadingGetAll = false;
        state.isErrorGetAll = true;
        state.errorMessageGetAll =
          action.payload?.message || 'Lấy danh sách chiến dịch thất bại';
      })

      // Get campaign by ID cases
      .addCase(fetchGetCampaignById.pending, state => {
        state.isLoadingGetById = true;
        state.isErrorGetById = false;
        state.isSuccessGetById = false;
      })
      .addCase(fetchGetCampaignById.fulfilled, (state, action) => {
        state.isLoadingGetById = false;
        state.isSuccessGetById = true;
        state.currentCampaign = action.payload;
        state.errorMessageGetById = '';
      })
      .addCase(fetchGetCampaignById.rejected, (state, action) => {
        state.isLoadingGetById = false;
        state.isErrorGetById = true;
        state.errorMessageGetById =
          action.payload?.message || 'Lấy thông tin chiến dịch thất bại';
      })

      // Create campaign cases
      .addCase(fetchCreateCampaign.pending, state => {
        state.isLoadingCreate = true;
        state.isErrorCreate = false;
        state.isSuccessCreate = false;
      })
      .addCase(fetchCreateCampaign.fulfilled, (state, action) => {
        state.isLoadingCreate = false;
        state.isSuccessCreate = true;
        // Add new campaign to the list
        state.campaigns.unshift(action.payload);
        state.currentCampaign = action.payload;
        state.errorMessageCreate = '';
      })
      .addCase(fetchCreateCampaign.rejected, (state, action) => {
        state.isLoadingCreate = false;
        state.isErrorCreate = true;
        state.errorMessageCreate =
          action.payload?.message || 'Tạo chiến dịch thất bại';
      })

      // Update campaign cases
      .addCase(fetchUpdateCampaign.pending, state => {
        state.isLoadingUpdate = true;
        state.isErrorUpdate = false;
        state.isSuccessUpdate = false;
      })
      .addCase(fetchUpdateCampaign.fulfilled, (state, action) => {
        state.isLoadingUpdate = false;
        state.isSuccessUpdate = true;

        // Update campaign in the list
        const index = state.campaigns.findIndex(
          campaign => campaign._id === action.payload._id,
        );
        if (index !== -1) {
          state.campaigns[index] = action.payload;
        }

        // Update current campaign if it's the same one
        if (
          state.currentCampaign &&
          state.currentCampaign._id === action.payload._id
        ) {
          state.currentCampaign = action.payload;
        }

        state.errorMessageUpdate = '';
      })
      .addCase(fetchUpdateCampaign.rejected, (state, action) => {
        state.isLoadingUpdate = false;
        state.isErrorUpdate = true;
        state.errorMessageUpdate =
          action.payload?.message || 'Cập nhật chiến dịch thất bại';
      })

      // Filter campaigns cases
      .addCase(fetchFilterCampaigns.pending, state => {
        state.isLoadingFilter = true;
        state.isErrorFilter = false;
        state.isSuccessFilter = false;
      })
      .addCase(fetchFilterCampaigns.fulfilled, (state, action) => {
        state.isLoadingFilter = false;
        state.isSuccessFilter = true;
        state.filteredCampaigns = action.payload.campaigns;
        state.filterPagination = action.payload.pagination;
        state.appliedFilters = action.payload.filters;
        state.errorMessageFilter = '';
      })
      .addCase(fetchFilterCampaigns.rejected, (state, action) => {
        state.isLoadingFilter = false;
        state.isErrorFilter = true;
        state.errorMessageFilter =
          action.payload?.message || 'Lọc chiến dịch thất bại';
      });
  },
});

export const {
  resetStatus,
  setCurrentCampaign,
  clearCurrentCampaign,
  clearCampaigns,
  resetGetAllStatus,
  resetGetByIdStatus,
  resetCreateStatus,
  resetUpdateStatus,
  resetFilterStatus,
  clearFilteredCampaigns,
} = CampaignReducer.actions;

export default CampaignReducer.reducer;
