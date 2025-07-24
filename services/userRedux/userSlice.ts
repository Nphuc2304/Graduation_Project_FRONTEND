import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {
  SignupRequest,
  SignupResponse,
  LoginRequest,
  LoginResponse,
  MeResponse,
  EditUserRequest,
  EditEmailRequest,
  EditEmailResponse,
  ConfirmEmailRequest,
  ConfirmEmailResponse,
  CreditEditorRequest,
  CreditEditorResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  ConfirmForgotPasswordRequest,
  ConfirmForgotPasswordResponse,
  ConfirmKYCResponse,
  User,
  GoogleLoginRequest,
  GoogleLoginResponse,
  UpdateAvatarRequest,
  UpdateAvatarResponse,
} from './userTypes';
import axiosInstance from '../axiosInstance';
import {API, BASE_URL} from '../api';
import {resetUser} from './userReducer';

// 1. Signup
export const fetchSignup = createAsyncThunk<
  SignupResponse,
  SignupRequest,
  {rejectValue: {message: string}}
>('auth/signup', async ({username, password}, {rejectWithValue}) => {
  try {
    const response = await axiosInstance.post(API.SIGNUP, {
      username,
      password,
    });

    return response.data;
  } catch (error: any) {
    return rejectWithValue({
      message: error.response?.data?.error || 'Đăng ký thất bại',
    });
  }
});

export const fetchGoogleLogin = createAsyncThunk<
  {user: User; refreshToken: string; accessToken: string},
  GoogleLoginRequest,
  {rejectValue: {message: string}}
>('auth/googleLogin', async ({googleToken}, {rejectWithValue}) => {
  try {
    console.log('🔐 Starting Google login process');
    console.log('🌐 Making request to:', BASE_URL + API.GOOGLE_LOGIN);

    // Send Google token to your backend
    const response = await axiosInstance.post(API.GOOGLE_LOGIN, {
      googleToken,
    });

    console.log('✅ Google login response received:', response.data);

    const {accessToken, refreshToken, user: userFromBackend} = response.data;

    console.log(
      '🔑 Tokens extracted - refreshToken:',
      refreshToken ? 'present' : 'missing',
    );

    const userData: User = {
      _id: userFromBackend.id,
      fullName: userFromBackend.fullName,
      credit: 0,
      isKYC: false,
      email: userFromBackend.email,
      username: '', // Google users don't have username
      password: '',
      googleId: userFromBackend.id,
      loginMethod: 'google',
      avatarImg: userFromBackend.avatarImg,
      dateOfBirth: new Date().toISOString(),
      phoneNum: '',
      address: '',
      refreshToken: refreshToken,
      lockedAccount: false,
    };

    console.log('👤 Google user data created:', userData);

    return {
      user: userData,
      refreshToken,
      accessToken,
    };
  } catch (error: any) {
    console.error('❌ Google login error:', error);
    console.error('❌ Error response:', error.response?.data);
    console.error('❌ Error status:', error.response?.status);
    return rejectWithValue({
      message: error.response?.data?.error || 'Google đăng nhập thất bại',
    });
  }
});

// 2. Login
export const fetchLogin = createAsyncThunk<
  {user: User; refreshToken: string; accessToken: string},
  LoginRequest,
  {rejectValue: {message: string}}
>('auth/login', async ({username, password}, {rejectWithValue}) => {
  try {
    console.log('🔐 Starting login process for username:', username);
    console.log('🌐 Making request to:', BASE_URL + API.LOGIN);

    // Login to get tokens
    const loginRes = await axiosInstance.post(API.LOGIN, {
      username,
      password,
    });

    console.log('✅ Login response received:', loginRes.data);

    const refreshToken = loginRes.data.refreshToken;
    const accessToken = loginRes.data.accessToken;

    console.log(
      '🔑 Tokens extracted - refreshToken:',
      refreshToken ? 'present' : 'missing',
    );

    // For now, create a basic user object with the username
    // You can later implement a /users/me endpoint to get full user details
    const userData: User = {
      _id: '', // Will be set when we have a /users/me endpoint
      fullName: username, // Use username as fullName for now
      credit: 0,
      isKYC: false,
      email: '',
      username: username,
      password: '', // We don't store password in frontend
      avatarImg: '',
      dateOfBirth: new Date().toISOString(),
      phoneNum: '',
      address: '',
      refreshToken: refreshToken,
      lockedAccount: false,
    };

    console.log('👤 User data created:', userData);

    return {
      user: userData,
      refreshToken,
      accessToken,
    };
  } catch (error: any) {
    console.error('❌ Login error:', error);
    console.error('❌ Error response:', error.response?.data);
    console.error('❌ Error status:', error.response?.status);
    return rejectWithValue({
      message: error.response?.data?.error || 'Đăng nhập thất bại',
    });
  }
});

// 3. Get user details (me)
export const fetchMe = createAsyncThunk<
  User,
  void,
  {rejectValue: {message: string}}
>('auth/me', async (_, {rejectWithValue}) => {
  try {
    const response = await axiosInstance.get<MeResponse>(API.GET_ME);

    // Transform the user data to match our User interface
    const userData: User = {
      _id: response.data.user.id,
      fullName: response.data.user.fullName,
      credit: response.data.user.credit,
      isKYC: response.data.user.isKYC,
      email: response.data.user.email,
      username: response.data.user.username,
      password: '', // We don't store password in frontend
      avatarImg: response.data.user.avatarImg,
      dateOfBirth: response.data.user.dateOfBirth,
      phoneNum: response.data.user.phoneNum,
      address: response.data.user.address,
      refreshToken: '', // This will be updated from state
      lockedAccount: false, // This will be updated when we get user data
    };

    return userData;
  } catch (error: any) {
    return rejectWithValue({
      message:
        error.response?.data?.error || 'Lấy thông tin người dùng thất bại',
    });
  }
});

// 4. Edit user
export const fetchEditUser = createAsyncThunk<
  User,
  EditUserRequest,
  {rejectValue: {message: string}}
>('user/editUser', async (userData, {rejectWithValue}) => {
  try {
    const response = await axiosInstance.put(API.EDIT_USER, userData);

    // Handle different response structures
    if (response.data.user) {
      return response.data.user;
    } else if (response.data) {
      // If the response is the user data directly
      return response.data;
    } else {
      throw new Error('Invalid response format');
    }
  } catch (error: any) {
    return rejectWithValue({
      message: error.response?.data?.error || 'Cập nhật thông tin thất bại',
    });
  }
});

// 5. Edit email (send confirmation code)
export const fetchEditEmail = createAsyncThunk<
  EditEmailResponse,
  EditEmailRequest,
  {rejectValue: {message: string}}
>('user/editEmail', async ({email}, {rejectWithValue}) => {
  try {
    const response = await axiosInstance.put(API.EDIT_EMAIL, {email});

    return response.data;
  } catch (error: any) {
    return rejectWithValue({
      message: error.response?.data?.error || 'Gửi mã xác nhận thất bại',
    });
  }
});

// 6. Confirm email
export const fetchConfirmEmail = createAsyncThunk<
  ConfirmEmailResponse,
  ConfirmEmailRequest,
  {rejectValue: {message: string}}
>(
  'user/confirmEmail',
  async ({emailToken, confirmationCode}, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.put(API.CONFIRM_EMAIL, {
        emailToken,
        confirmationCode,
      });

      return response.data;
    } catch (error: any) {
      return rejectWithValue({
        message: error.response?.data?.error || 'Xác nhận email thất bại',
      });
    }
  },
);

// 7. Credit editor
export const fetchCreditEditor = createAsyncThunk<
  CreditEditorResponse,
  CreditEditorRequest,
  {rejectValue: {message: string}}
>('user/creditEditor', async ({keyword}, {rejectWithValue}) => {
  try {
    const response = await axiosInstance.post(API.CREDIT_EDITOR, {keyword});

    return response.data;
  } catch (error: any) {
    return rejectWithValue({
      message: error.response?.data?.error || 'Cập nhật credit thất bại',
    });
  }
});

// 8. Forgot password
export const fetchForgotPassword = createAsyncThunk<
  ForgotPasswordResponse,
  ForgotPasswordRequest,
  {rejectValue: {message: string}}
>('auth/forgotPassword', async ({email, newPassword}, {rejectWithValue}) => {
  try {
    const response = await axiosInstance.put(API.FORGOT_PASSWORD, {
      email,
      newPassword,
    });

    return response.data;
  } catch (error: any) {
    return rejectWithValue({
      message: error.response?.data?.error || 'Gửi mã xác nhận thất bại',
    });
  }
});

// 9. Confirm forgot password
export const fetchConfirmForgotPassword = createAsyncThunk<
  ConfirmForgotPasswordResponse,
  ConfirmForgotPasswordRequest,
  {rejectValue: {message: string}}
>(
  'auth/confirmForgotPassword',
  async ({emailToken, confirmationCode}, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.put(API.CONFIRM_FORGOT_PASSWORD, {
        emailToken,
        confirmationCode,
      });

      return response.data;
    } catch (error: any) {
      return rejectWithValue({
        message: error.response?.data?.error || 'Xác nhận mật khẩu thất bại',
      });
    }
  },
);

// 10. Confirm KYC
export const fetchConfirmKYC = createAsyncThunk<
  ConfirmKYCResponse,
  void,
  {rejectValue: {message: string}}
>('user/confirmKYC', async (_, {rejectWithValue}) => {
  try {
    const response = await axiosInstance.post(API.CONFIRM_KYC, {});

    return response.data;
  } catch (error: any) {
    return rejectWithValue({
      message: error.response?.data?.error || 'Xác nhận KYC thất bại',
    });
  }
});

// 11. Update Avatar
export const fetchUpdateAvatar = createAsyncThunk<
  UpdateAvatarResponse,
  UpdateAvatarRequest,
  {rejectValue: {message: string}}
>('user/updateAvatar', async ({avatar}, {rejectWithValue}) => {
  try {
    // Create FormData for file upload
    const formData = new FormData();
    formData.append('avatar', avatar);

    const response = await axiosInstance.post(API.UPDATE_AVATAR, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error: any) {
    return rejectWithValue({
      message: error.response?.data?.error || 'Cập nhật ảnh đại diện thất bại',
    });
  }
});

// 12. Check refresh token
export const fetchCheckRefreshToken = createAsyncThunk<
  {valid: boolean; message: string},
  void,
  {rejectValue: {message: string}}
>('auth/checkRefreshToken', async (_, {rejectWithValue}) => {
  try {
    const res = await axiosInstance.post(
      API.CHECK_REFRESH_TOKEN,
      {},
      {
        headers: {
          token: 'refresh',
        },
      },
    );

    return res.data;
  } catch (error: any) {
    return rejectWithValue({
      message: error.response?.data?.message || 'Kiểm tra token thất bại',
    });
  }
});

// 13. Logout
export const fetchLogout = createAsyncThunk<
  void,
  void,
  {rejectValue: {message: string}}
>('auth/logout', async (_, {dispatch, rejectWithValue}) => {
  try {
    await axiosInstance.post(
      API.POST_LOGOUT,
      {},
      {
        headers: {
          token: 'refresh',
        },
      },
    );

    dispatch(resetUser());

    return;
  } catch (error: any) {
    const message = error.response?.data?.message || 'Đăng xuất thất bại';
    return rejectWithValue({message});
  }
});

// 14. Get access token from refresh
export const getAccessTokenFromRefresh = async (): Promise<string | null> => {
  try {
    const response = await axiosInstance.post(
      API.GET_ACCESS_TOKEN,
      {},
      {
        headers: {
          token: 'refresh',
        },
      },
    );

    const {accessToken} = response.data;

    return accessToken;
  } catch (error) {
    console.error('Thất bại khi lấy token', error);
    return null;
  }
};

// Legacy functions for backward compatibility
export const fetchRegister = fetchSignup;
export const fetchCheckEmail = createAsyncThunk<
  {exists: boolean; message?: string},
  {email: string},
  {rejectValue: {message: string}}
>('auth/checkEmail', async ({email}, {rejectWithValue}) => {
  try {
    const res = await axiosInstance.post(API.CHECK_EMAIL, {email});

    return res.data;
  } catch (error: any) {
    return rejectWithValue({
      message: error.response?.data?.message || 'Kiểm tra email thất bại',
    });
  }
});

// Public profile functions (if still needed)
export const getPublicProfile = createAsyncThunk<
  any,
  {userId: string},
  {rejectValue: {message: string}}
>('users/public', async ({userId}, {rejectWithValue}) => {
  try {
    const res = await axiosInstance.get(`${API.GET_PUBLIC_PROFILE}/${userId}`);

    return res.data;
  } catch (error: any) {
    return rejectWithValue({
      message:
        error.response?.data?.message || 'Lấy thông tin người dùng thất bại',
    });
  }
});

export const fetchUserIdByHandleName = createAsyncThunk<
  {userId: string},
  {handleName: string},
  {rejectValue: {message: string}}
>('users/fetchUserIdByHandleName', async ({handleName}, {rejectWithValue}) => {
  try {
    const res = await axiosInstance.get(
      `${API.GET_USER_ID_BY_HANDLE}/${handleName}`,
    );

    return {userId: res.data.userId};
  } catch (error: any) {
    return rejectWithValue({
      message: error.response?.data?.message || 'Lấy ID người dùng thất bại',
    });
  }
});
