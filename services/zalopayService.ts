import axiosInstance from './axiosInstance';
import {API} from './api';

export interface ZaloPayCreateRequest {
  amount: number;
  description?: string;
  donorId: string;
  campaignId: string;
  donorName: string;
  isAnonymous?: boolean;
  redirectUrl?: string;
}

export interface ZaloPayCreateResponse {
  return_code: number;
  return_message: string;
  order_url?: string;
  zp_trans_token?: string;
  order_token?: string;
  app_trans_id?: string;
  donation_id?: string;
}

export interface ZaloPayQueryRequest {
  app_trans_id: string;
}

export interface ZaloPayQueryResponse {
  return_code: number;
  return_message: string;
  zp_trans_id?: string;
  amount?: number;
  discount_amount?: number;
  donation?: {
    id: string;
    status: string;
    amount: number;
    message: string;
    isAnonymous: boolean;
    createdAt: string;
    donor?: any;
    campaign?: any;
  };
}

export interface DonationData {
  id: string;
  transactionCode: string;
  amount: number;
  currency: string;
  message: string;
  status: string;
  isAnonymous: boolean;
  createdAt: string;
  updatedAt: string;
  donor?: any;
  campaign?: any;
}

export class ZaloPayService {
  /**
   * Create ZaloPay payment order
   */
  static async createPayment(
    data: ZaloPayCreateRequest,
  ): Promise<ZaloPayCreateResponse> {
    try {
      console.log('🚀 Creating ZaloPay payment:', data);

      const response = await axiosInstance.post(API.ZALOPAY_CREATE, data);

      console.log('✅ ZaloPay payment created:', response.data);
      return response.data;
    } catch (error: any) {
      console.error(
        '❌ ZaloPay payment creation failed:',
        error.response?.data || error.message,
      );
      throw error;
    }
  }

  /**
   * Query payment status
   */
  static async queryPayment(appTransId: string): Promise<ZaloPayQueryResponse> {
    try {
      console.log('🔍 Querying ZaloPay payment status:', appTransId);

      const response = await axiosInstance.post(API.ZALOPAY_QUERY, {
        app_trans_id: appTransId,
      });

      console.log('✅ ZaloPay payment query result:', response.data);
      return response.data;
    } catch (error: any) {
      console.error(
        '❌ ZaloPay payment query failed:',
        error.response?.data || error.message,
      );
      throw error;
    }
  }

  /**
   * Get donation by transaction code
   */
  static async getDonation(transactionCode: string): Promise<{
    return_code: number;
    return_message: string;
    data?: {donation: DonationData};
  }> {
    try {
      console.log('📋 Getting donation by transaction code:', transactionCode);

      const response = await axiosInstance.get(
        `${API.ZALOPAY_DONATION}/${transactionCode}`,
      );

      console.log('✅ Donation retrieved:', response.data);
      return response.data;
    } catch (error: any) {
      console.error(
        '❌ Get donation failed:',
        error.response?.data || error.message,
      );
      throw error;
    }
  }

  /**
   * Get donations by campaign
   */
  static async getDonationsByCampaign(campaignId: string): Promise<any> {
    try {
      console.log('📋 Getting donations by campaign:', campaignId);

      const response = await axiosInstance.get(
        `${API.ZALOPAY_DONATIONS_CAMPAIGN}/${campaignId}`,
      );

      console.log('✅ Campaign donations retrieved:', response.data);
      return response.data;
    } catch (error: any) {
      console.error(
        '❌ Get campaign donations failed:',
        error.response?.data || error.message,
      );
      throw error;
    }
  }

  /**
   * Get donations by user
   */
  static async getDonationsByUser(userId: string): Promise<any> {
    try {
      console.log('📋 Getting donations by user:', userId);

      const response = await axiosInstance.get(
        `${API.ZALOPAY_DONATIONS_USER}/${userId}`,
      );

      console.log('✅ User donations retrieved:', response.data);
      return response.data;
    } catch (error: any) {
      console.error(
        '❌ Get user donations failed:',
        error.response?.data || error.message,
      );
      throw error;
    }
  }

  /**
   * Get donation statistics
   */
  static async getDonationStats(): Promise<any> {
    try {
      console.log('📊 Getting donation statistics');

      const response = await axiosInstance.get(API.ZALOPAY_DONATIONS_STATS);

      console.log('✅ Donation statistics retrieved:', response.data);
      return response.data;
    } catch (error: any) {
      console.error(
        '❌ Get donation stats failed:',
        error.response?.data || error.message,
      );
      throw error;
    }
  }
}
