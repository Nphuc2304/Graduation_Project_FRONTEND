export interface User {
  _id: string;
  fullName: string;
  credit: number;
  isKYC: boolean;
  email: string;
  username: string;
  password: string;
  avatarImg: string;
  googleId?: string;
  loginMethod?: 'traditional' | 'google';
  dateOfBirth: Date | string;
  phoneNum: string;
  address: string;
  refreshToken: string;
  lockedAccount: boolean;
  createdAt?: string;
  updatedAt?: string;
  joinedCampaigns?: string[];
}

export interface GoogleLoginRequest {
  googleToken: string;
}

export interface GoogleLoginResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    fullName: string;
    username: string;
    avatarImg: string;
  };
}

export interface UserRes {
  user: User;
}

export interface SignupRequest {
  username: string;
  password: string;
}

export interface SignupResponse {
  message: string;
  user: {
    id: string;
    username: string;
  };
  accessToken: string;
  newRefreshToken: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
}

export interface MeResponse {
  message: string;
  user: {
    id: string;
    fullName: string;
    credit: number;
    isKYC: boolean;
    email: string;
    username: string;
    avatarImg: string;
    dateOfBirth: Date | string;
    phoneNum: string;
    address: string;
  };
}

export interface EditUserRequest {
  fullName?: string;
  username?: string;
  email?: string;
  password?: string;
  dateOfBirth?: string; // dd/MM/yyyy format
  phoneNum?: string;
  address?: string;
  lockedAccount?: boolean;
}

export interface EditEmailRequest {
  email: string;
}

export interface EditEmailResponse {
  message: string;
  emailToken: string;
}

export interface ConfirmEmailRequest {
  emailToken: string;
  confirmationCode: string;
}

export interface ConfirmEmailResponse {
  message: string;
  user: User;
}

export interface CreditEditorRequest {
  keyword: string;
}

export interface CreditEditorResponse {
  message: string;
  credit: number;
}

export interface ForgotPasswordRequest {
  email: string;
  newPassword: string;
}

export interface ForgotPasswordResponse {
  message: string;
  emailToken: string;
}

export interface ConfirmForgotPasswordRequest {
  emailToken: string;
  confirmationCode: string;
}

export interface ConfirmForgotPasswordResponse {
  message: string;
  email: string;
}

export interface ConfirmKYCResponse {
  success: boolean;
}

export interface UpdateAvatarRequest {
  avatar: any; // FormData file object
}

export interface UpdateAvatarResponse {
  message: string;
  visual: {
    _id: string;
    visualID: string;
    link: string;
    mediaType: string;
    usedBy: string;
    usage: string;
  };
  avatarUrl: string;
}

export interface PublicUserRes {
  username: string;
  phoneNumber: string;
  handleName: string;
  bio: string;
  address: string;
  gender: string;
  profilePic: string;
  isVip: boolean;
  userFollowing: boolean;
  userBlocked: boolean;
}

export interface VolunteerRequest {
  campaignId: string;
}

export interface VolunteerResponse {
  isSuccess: boolean;
  message: string;
  campaignId?: string;
  userId?: string;
  missingFields?: string;
}