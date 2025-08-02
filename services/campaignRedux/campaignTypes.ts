export interface Media {
  _id?: string;
  url: string;
  type: 'image' | 'video';
}

export interface Campaign {
  _id: string;
  hostID: string;
  hostType: 'user' | 'admin';
  dateCreated: string;
  status: 'preparing' | 'active' | 'ended';
  totalGoal: number;
  dateEnd?: string;
  currentFund: number;
  campTypeID: string;
  campName: string;
  campDescription: string;
  media: Media[];
  createdAt?: string;
  updatedAt?: string;
  volunteers: string[];
}

export interface CampaignResponse {
  status: string;
  data: {
    campaign: Campaign;
  };
}

export interface CampaignsResponse {
  message: string;
  campaigns: Campaign[];
}

export interface CreateCampaignRequest {
  hostID: string;
  hostType: 'user' | 'admin';
  totalGoal: number;
  dateEnd?: string;
  currentFund?: number;
  campTypeID: string;
  campName: string;
  campDescription: string;
  mediaFiles?: File[];
}

export interface UpdateCampaignRequest {
  _id: string;
  hostID?: string;
  hostType?: 'user' | 'admin';
  status?: 'preparing' | 'active' | 'ended';
  totalGoal?: number;
  dateEnd?: string;
  currentFund?: number;
  campTypeID?: string;
  campName?: string;
  campDescription?: string;
  mediaFiles?: File[];
}

export interface CampaignState {
  campaigns: Campaign[];
  currentCampaign: Campaign | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string;

  // Individual action states
  isLoadingGetAll: boolean;
  isSuccessGetAll: boolean;
  isErrorGetAll: boolean;
  errorMessageGetAll: string;

  isLoadingGetById: boolean;
  isSuccessGetById: boolean;
  isErrorGetById: boolean;
  errorMessageGetById: string;

  isLoadingCreate: boolean;
  isSuccessCreate: boolean;
  isErrorCreate: boolean;
  errorMessageCreate: string;

  isLoadingUpdate: boolean;
  isSuccessUpdate: boolean;
  isErrorUpdate: boolean;
  errorMessageUpdate: string;
}
