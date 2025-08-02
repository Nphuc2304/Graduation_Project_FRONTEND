import {createSlice} from '@reduxjs/toolkit';
import {
  fetchSignup,
  fetchLogin,
  fetchMe,
  fetchEditUser,
  fetchEditEmail,
  fetchConfirmEmail,
  fetchCreditEditor,
  fetchForgotPassword,
  fetchConfirmForgotPassword,
  fetchConfirmKYC,
  fetchUpdateAvatar,
  fetchLogout,
  fetchCheckRefreshToken,
  fetchCheckEmail,
  getPublicProfile,
  fetchGoogleLogin,
  fetchVolunteer
} from './userSlice';
import {User, PublicUserRes} from './userTypes';

interface UserState {
  user: User | null;
  publicProfile: PublicUserRes | null;
  refreshToken: string;
  accessToken: string;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string;
  isLoadingPublicProfile: boolean;
  isSuccessPublicProfile: boolean;
  isErrorPublicProfile: boolean;
  errorMessagePublicProfile: string;
  loggedInUsers: User[];
  isLoadingSignup: boolean;
  isSuccessSignup: boolean;
  isErrorSignup: boolean;
  errorMessageSignup: string;
  isLoadingMe: boolean;
  isSuccessMe: boolean;
  isErrorMe: boolean;
  errorMessageMe: string;
  isLoadingEditEmail: boolean;
  isSuccessEditEmail: boolean;
  isErrorEditEmail: boolean;
  errorMessageEditEmail: string;
  isLoadingConfirmEmail: boolean;
  isSuccessConfirmEmail: boolean;
  isErrorConfirmEmail: boolean;
  errorMessageConfirmEmail: string;
  isLoadingCreditEditor: boolean;
  isSuccessCreditEditor: boolean;
  isErrorCreditEditor: boolean;
  errorMessageCreditEditor: string;
  isLoadingForgotPassword: boolean;
  isSuccessForgotPassword: boolean;
  isErrorForgotPassword: boolean;
  errorMessageForgotPassword: string;
  isLoadingConfirmForgotPassword: boolean;
  isSuccessConfirmForgotPassword: boolean;
  isErrorConfirmForgotPassword: boolean;
  errorMessageConfirmForgotPassword: string;
  isLoadingConfirmKYC: boolean;
  isSuccessConfirmKYC: boolean;
  isErrorConfirmKYC: boolean;
  errorMessageConfirmKYC: string;
  isLoadingGoogleLogin: boolean;
  isSuccessGoogleLogin: boolean;
  isErrorGoogleLogin: boolean;
  errorMessageGoogleLogin: string;
  isLoadingUpdateAvatar: boolean;
  isSuccessUpdateAvatar: boolean;
  isErrorUpdateAvatar: boolean;
  errorMessageUpdateAvatar: string;
}

const initialState: UserState = {
  user: null,
  publicProfile: null,
  refreshToken: '',
  accessToken: '',
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
  isLoadingPublicProfile: false,
  isSuccessPublicProfile: false,
  isErrorPublicProfile: false,
  errorMessagePublicProfile: '',
  loggedInUsers: [],
  isLoadingSignup: false,
  isSuccessSignup: false,
  isErrorSignup: false,
  errorMessageSignup: '',
  isLoadingMe: false,
  isSuccessMe: false,
  isErrorMe: false,
  errorMessageMe: '',
  isLoadingEditEmail: false,
  isSuccessEditEmail: false,
  isErrorEditEmail: false,
  errorMessageEditEmail: '',
  isLoadingConfirmEmail: false,
  isSuccessConfirmEmail: false,
  isErrorConfirmEmail: false,
  errorMessageConfirmEmail: '',
  isLoadingCreditEditor: false,
  isSuccessCreditEditor: false,
  isErrorCreditEditor: false,
  errorMessageCreditEditor: '',
  isLoadingForgotPassword: false,
  isSuccessForgotPassword: false,
  isErrorForgotPassword: false,
  errorMessageForgotPassword: '',
  isLoadingConfirmForgotPassword: false,
  isSuccessConfirmForgotPassword: false,
  isErrorConfirmForgotPassword: false,
  errorMessageConfirmForgotPassword: '',
  isLoadingConfirmKYC: false,
  isSuccessConfirmKYC: false,
  isErrorConfirmKYC: false,
  errorMessageConfirmKYC: '',
  isLoadingGoogleLogin: false,
  isSuccessGoogleLogin: false,
  isErrorGoogleLogin: false,
  errorMessageGoogleLogin: '',
  isLoadingUpdateAvatar: false,
  isSuccessUpdateAvatar: false,
  isErrorUpdateAvatar: false,
  errorMessageUpdateAvatar: '',
};

const UserReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetStatus: state => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = '';
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    resetUser: state => {
      state.user = null;
      state.refreshToken = '';
      state.accessToken = '';
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = '';
      Object.assign(state, initialState);
    },
    resetPublicProfileStatus: state => {
      state.isLoadingPublicProfile = false;
      state.isErrorPublicProfile = false;
      state.isSuccessPublicProfile = false;
      state.errorMessagePublicProfile = '';
    },
    clearPublicProfile: state => {
      state.publicProfile = null;
      state.isLoadingPublicProfile = false;
      state.isSuccessPublicProfile = false;
      state.isErrorPublicProfile = false;
      state.errorMessagePublicProfile = '';
    },
    removeLoggedInUser: (state, action) => {
      state.loggedInUsers = state.loggedInUsers.filter(
        user => user._id !== action.payload,
      );
    },
    resetSignupStatus: state => {
      state.isLoadingSignup = false;
      state.isErrorSignup = false;
      state.isSuccessSignup = false;
      state.errorMessageSignup = '';
    },
    resetMeStatus: state => {
      state.isLoadingMe = false;
      state.isErrorMe = false;
      state.isSuccessMe = false;
      state.errorMessageMe = '';
    },
    resetEditEmailStatus: state => {
      state.isLoadingEditEmail = false;
      state.isErrorEditEmail = false;
      state.isSuccessEditEmail = false;
      state.errorMessageEditEmail = '';
    },
    resetConfirmEmailStatus: state => {
      state.isLoadingConfirmEmail = false;
      state.isErrorConfirmEmail = false;
      state.isSuccessConfirmEmail = false;
      state.errorMessageConfirmEmail = '';
    },
    resetCreditEditorStatus: state => {
      state.isLoadingCreditEditor = false;
      state.isErrorCreditEditor = false;
      state.isSuccessCreditEditor = false;
      state.errorMessageCreditEditor = '';
    },
    resetForgotPasswordStatus: state => {
      state.isLoadingForgotPassword = false;
      state.isErrorForgotPassword = false;
      state.isSuccessForgotPassword = false;
      state.errorMessageForgotPassword = '';
    },
    resetConfirmForgotPasswordStatus: state => {
      state.isLoadingConfirmForgotPassword = false;
      state.isErrorConfirmForgotPassword = false;
      state.isSuccessConfirmForgotPassword = false;
      state.errorMessageConfirmForgotPassword = '';
    },
    resetConfirmKYCStatus: state => {
      state.isLoadingConfirmKYC = false;
      state.isErrorConfirmKYC = false;
      state.isSuccessConfirmKYC = false;
      state.errorMessageConfirmKYC = '';
    },
    resetGoogleLoginStatus: state => {
      state.isLoadingGoogleLogin = false;
      state.isErrorGoogleLogin = false;
      state.isSuccessGoogleLogin = false;
      state.errorMessageGoogleLogin = '';
    },
    resetUpdateAvatarStatus: state => {
      state.isLoadingUpdateAvatar = false;
      state.isErrorUpdateAvatar = false;
      state.isSuccessUpdateAvatar = false;
      state.errorMessageUpdateAvatar = '';
    },
  },
  extraReducers: builder => {
    builder
      // Signup cases
      .addCase(fetchSignup.pending, state => {
        state.isLoadingSignup = true;
        state.isErrorSignup = false;
        state.isSuccessSignup = false;
      })
      .addCase(fetchSignup.fulfilled, (state, action) => {
        state.isLoadingSignup = false;
        state.isSuccessSignup = true;
        state.errorMessageSignup = '';
      })
      .addCase(fetchSignup.rejected, (state, action) => {
        state.isLoadingSignup = false;
        state.isErrorSignup = true;
        state.errorMessageSignup =
          action.payload?.message || 'Đăng ký thất bại';
      })

      // Add Google Login cases
      .addCase(fetchGoogleLogin.pending, state => {
        state.isLoadingGoogleLogin = true;
        state.isErrorGoogleLogin = false;
        state.isSuccessGoogleLogin = false;
      })
      .addCase(fetchGoogleLogin.fulfilled, (state, action) => {
        state.isLoadingGoogleLogin = false;
        state.isSuccessGoogleLogin = true;
        state.user = action.payload.user;
        state.refreshToken = action.payload.refreshToken;
        state.accessToken = action.payload.accessToken;
        state.errorMessageGoogleLogin = '';

        // Add to logged in users if not already present
        const userId = action.payload.user._id;
        const alreadyLoggedIn = state.loggedInUsers.some(u => u._id === userId);
        if (!alreadyLoggedIn) {
          state.loggedInUsers.push(action.payload.user);
        }
      })
      .addCase(fetchGoogleLogin.rejected, (state, action) => {
        state.isLoadingGoogleLogin = false;
        state.isErrorGoogleLogin = true;
        state.errorMessageGoogleLogin =
          action.payload?.message || 'Google đăng nhập thất bại';
        state.user = null;
        state.refreshToken = '';
        state.accessToken = '';
      })

      // Login cases
      .addCase(fetchLogin.pending, state => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.user;
        state.refreshToken = action.payload.refreshToken;
        state.accessToken = action.payload.accessToken;

        const userId = action.payload.user._id;
        const alreadyLoggedIn = state.loggedInUsers.some(u => u._id === userId);
        if (!alreadyLoggedIn) {
          state.loggedInUsers.push(action.payload.user);
        }
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload?.message || 'Đăng nhập thất bại';
        state.user = null;
        state.refreshToken = '';
        state.accessToken = '';
      })

      // Me cases
      .addCase(fetchMe.pending, state => {
        state.isLoadingMe = true;
        state.isErrorMe = false;
        state.isSuccessMe = false;
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.isLoadingMe = false;
        state.isSuccessMe = true;
        state.user = action.payload;
        state.errorMessageMe = '';
      })
      .addCase(fetchMe.rejected, (state, action) => {
        state.isLoadingMe = false;
        state.isErrorMe = true;
        state.errorMessageMe =
          action.payload?.message || 'Lấy thông tin người dùng thất bại';
      })

      // Edit user cases
      .addCase(fetchEditUser.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchEditUser.fulfilled, (state, action) => {
        state.isLoading = false;
        if (state.user) {
          state.user = {...state.user, ...action.payload};
        } else {
          state.user = action.payload;
        }
      })
      .addCase(fetchEditUser.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload?.message || 'Cập nhật thất bại';
      })

      // Edit email cases
      .addCase(fetchEditEmail.pending, state => {
        state.isLoadingEditEmail = true;
        state.isErrorEditEmail = false;
        state.isSuccessEditEmail = false;
      })
      .addCase(fetchEditEmail.fulfilled, (state, action) => {
        state.isLoadingEditEmail = false;
        state.isSuccessEditEmail = true;
        state.errorMessageEditEmail = '';
      })
      .addCase(fetchEditEmail.rejected, (state, action) => {
        state.isLoadingEditEmail = false;
        state.isErrorEditEmail = true;
        state.errorMessageEditEmail =
          action.payload?.message || 'Gửi mã xác nhận thất bại';
      })

      // Confirm email cases
      .addCase(fetchConfirmEmail.pending, state => {
        state.isLoadingConfirmEmail = true;
        state.isErrorConfirmEmail = false;
        state.isSuccessConfirmEmail = false;
      })
      .addCase(fetchConfirmEmail.fulfilled, (state, action) => {
        state.isLoadingConfirmEmail = false;
        state.isSuccessConfirmEmail = true;
        if (state.user) {
          state.user = {...state.user, ...action.payload.user};
        }
        state.errorMessageConfirmEmail = '';
      })
      .addCase(fetchConfirmEmail.rejected, (state, action) => {
        state.isLoadingConfirmEmail = false;
        state.isErrorConfirmEmail = true;
        state.errorMessageConfirmEmail =
          action.payload?.message || 'Xác nhận email thất bại';
      })

      // Credit editor cases
      .addCase(fetchCreditEditor.pending, state => {
        state.isLoadingCreditEditor = true;
        state.isErrorCreditEditor = false;
        state.isSuccessCreditEditor = false;
      })
      .addCase(fetchCreditEditor.fulfilled, (state, action) => {
        state.isLoadingCreditEditor = false;
        state.isSuccessCreditEditor = true;
        if (state.user) {
          state.user.credit = action.payload.credit;
        }
        state.errorMessageCreditEditor = '';
      })
      .addCase(fetchCreditEditor.rejected, (state, action) => {
        state.isLoadingCreditEditor = false;
        state.isErrorCreditEditor = true;
        state.errorMessageCreditEditor =
          action.payload?.message || 'Cập nhật credit thất bại';
      })

      // Forgot password cases
      .addCase(fetchForgotPassword.pending, state => {
        state.isLoadingForgotPassword = true;
        state.isErrorForgotPassword = false;
        state.isSuccessForgotPassword = false;
      })
      .addCase(fetchForgotPassword.fulfilled, (state, action) => {
        state.isLoadingForgotPassword = false;
        state.isSuccessForgotPassword = true;
        state.errorMessageForgotPassword = '';
      })
      .addCase(fetchForgotPassword.rejected, (state, action) => {
        state.isLoadingForgotPassword = false;
        state.isErrorForgotPassword = true;
        state.errorMessageForgotPassword =
          action.payload?.message || 'Gửi mã xác nhận thất bại';
      })

      // Confirm forgot password cases
      .addCase(fetchConfirmForgotPassword.pending, state => {
        state.isLoadingConfirmForgotPassword = true;
        state.isErrorConfirmForgotPassword = false;
        state.isSuccessConfirmForgotPassword = false;
      })
      .addCase(fetchConfirmForgotPassword.fulfilled, (state, action) => {
        state.isLoadingConfirmForgotPassword = false;
        state.isSuccessConfirmForgotPassword = true;
        state.errorMessageConfirmForgotPassword = '';
      })
      .addCase(fetchConfirmForgotPassword.rejected, (state, action) => {
        state.isLoadingConfirmForgotPassword = false;
        state.isErrorConfirmForgotPassword = true;
        state.errorMessageConfirmForgotPassword =
          action.payload?.message || 'Xác nhận mật khẩu thất bại';
      })

      // Confirm KYC cases
      .addCase(fetchConfirmKYC.pending, state => {
        state.isLoadingConfirmKYC = true;
        state.isErrorConfirmKYC = false;
        state.isSuccessConfirmKYC = false;
      })
      .addCase(fetchConfirmKYC.fulfilled, (state, action) => {
        state.isLoadingConfirmKYC = false;
        state.isSuccessConfirmKYC = true;
        if (state.user) {
          state.user.isKYC = true;
        }
        state.errorMessageConfirmKYC = '';
      })
      .addCase(fetchConfirmKYC.rejected, (state, action) => {
        state.isLoadingConfirmKYC = false;
        state.isErrorConfirmKYC = true;
        state.errorMessageConfirmKYC =
          action.payload?.message || 'Xác nhận KYC thất bại';
      })

      // Update avatar cases
      .addCase(fetchUpdateAvatar.pending, state => {
        state.isLoadingUpdateAvatar = true;
        state.isErrorUpdateAvatar = false;
        state.isSuccessUpdateAvatar = false;
      })
      .addCase(fetchUpdateAvatar.fulfilled, (state, action) => {
        state.isLoadingUpdateAvatar = false;
        state.isSuccessUpdateAvatar = true;
        if (state.user) {
          state.user.avatarImg = action.payload.avatarUrl;
        }
        state.errorMessageUpdateAvatar = '';
      })
      .addCase(fetchUpdateAvatar.rejected, (state, action) => {
        state.isLoadingUpdateAvatar = false;
        state.isErrorUpdateAvatar = true;
        state.errorMessageUpdateAvatar =
          action.payload?.message || 'Cập nhật ảnh đại diện thất bại';
      })

      // Logout cases
      .addCase(fetchLogout.pending, state => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(fetchLogout.fulfilled, (state) => {
        // Reset to complete initial state on successful logout
        Object.assign(state, initialState);
      })
      .addCase(fetchLogout.rejected, (state, action) => {
        // Even if logout fails on server, clear client state
        Object.assign(state, {
          ...initialState,
          isLoading: false,
          isError: true,
          errorMessage: action.payload?.message || 'Đăng xuất thất bại',
        });
      })
      
      // Check refresh token cases
      .addCase(fetchCheckRefreshToken.pending, state => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(fetchCheckRefreshToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = action.payload.valid;
        if (!action.payload.valid) {
          state.user = null;
          state.refreshToken = '';
        }
      })
      .addCase(fetchCheckRefreshToken.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage =
          action.payload?.message || 'Kiểm tra token thất bại';
        state.user = null;
        state.refreshToken = '';
      })

      // Public profile cases
      .addCase(getPublicProfile.pending, state => {
        state.isLoadingPublicProfile = true;
        state.isErrorPublicProfile = false;
        state.isSuccessPublicProfile = false;
        state.errorMessagePublicProfile = '';
      })
      .addCase(getPublicProfile.fulfilled, (state, action) => {
        state.isLoadingPublicProfile = false;
        state.isSuccessPublicProfile = true;
        state.publicProfile = action.payload;
      })
      .addCase(getPublicProfile.rejected, (state, action) => {
        state.isLoadingPublicProfile = false;
        state.isErrorPublicProfile = true;
        state.errorMessagePublicProfile =
          action.payload?.message || 'Lấy thông tin người dùng thất bại';
        state.publicProfile = null;
      })
      // Volunteer campaign
      .addCase(fetchVolunteer.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = '';
      })
      .addCase(fetchVolunteer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (state.user && state.isSuccess === true) {
          if (!state.user.joinedCampaigns) state.user.joinedCampaigns = [];
          state.user.joinedCampaigns.push(action.payload.campaignId!);
        }
      })
      .addCase(fetchVolunteer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload?.message || 'Đăng ký thất bại';
      });
  },
});

export const {
  resetStatus,
  setUser,
  resetUser,
  resetPublicProfileStatus,
  clearPublicProfile,
  removeLoggedInUser,
  resetSignupStatus,
  resetMeStatus,
  resetEditEmailStatus,
  resetConfirmEmailStatus,
  resetCreditEditorStatus,
  resetForgotPasswordStatus,
  resetConfirmForgotPasswordStatus,
  resetConfirmKYCStatus,
  resetGoogleLoginStatus,
  resetUpdateAvatarStatus,
} = UserReducer.actions;
export default UserReducer.reducer;
