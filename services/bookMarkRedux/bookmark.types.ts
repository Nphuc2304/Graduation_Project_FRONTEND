// Campaign interface matching backend response
export interface Campaign {
  id: string;
  name: string;
  images: string[];
  priceCurrent: number;
  pricegoal: number;
  donators: number;
  totalGoal: number;
  dayLeft: string;
}

// Like interface
export interface Like {
  id: string;
  campaign: {
    _id: string;
    campName: string;
    campDescription: string;
    totalGoal: number;
    currentFund: number;
  };
  likedAt: string;
}

// Pagination interface
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

// API Response interfaces
export interface GetUserLikedCampaignsResponse {
  message: string;
  results: number;
  pagination: Pagination;
  data: Campaign[];
}

export interface AddFavoriteCampaignRequest {
  userId: string;
  campaignId: string;
}

export interface AddFavoriteCampaignResponse {
  message: string;
  data: {
    like: Like;
  };
}

export interface RemoveFavoriteCampaignRequest {
  userId: string;
  campaignId: string;
}

export interface RemoveFavoriteCampaignResponse {
  message: string;
  data: {
    removedAt: string;
  };
}

// API Error interface
export interface ApiError {
  status: string;
  message: string;
  statusCode?: number;
}

// Simplified Redux State interface
export interface BookmarkState {
  // Data
  likedCampaigns: Campaign[];
  pagination: Pagination | null;

  // Simple loading states
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;

  // UI states
  hasMore: boolean;
}