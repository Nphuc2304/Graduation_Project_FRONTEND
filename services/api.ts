export const BASE_URL = 'http://192.168.1.6:3000/api/';
// export const BASE_URL = 'http://localhost:3000/api/'; // For iOS simulator

export const API = {
  //// Auth - Updated to match backend routes
  SIGNUP: 'users/signup',
  LOGIN: 'users/login',
  GET_ME: 'users/me',
  EDIT_USER: 'users/edit-user',
  EDIT_EMAIL: 'users/edit-email',
  CONFIRM_EMAIL: 'users/confirm-email',
  CREDIT_EDITOR: 'users/credit-editor',
  FORGOT_PASSWORD: 'users/forgot-password',
  CONFIRM_FORGOT_PASSWORD: 'users/confirm-forgot-password',
  CONFIRM_KYC: 'users/confirm-kyc',
  CHECK_REFRESH_TOKEN: 'users/check-refresh-token',
  CHECK_EMAIL: 'users/check-email',
  ////Logout
  POST_LOGOUT: 'users/logout',

  //// Register
  REGISTER: 'users/register',
  /// User
  GET_PUBLIC_PROFILE: '/users/public',
  GET_USER_ID_BY_HANDLE: '/users/username-by-handle',
  CHANGE_PASSWORD: '/users/password',

  //// Auth
  GET_ACCESS_TOKEN: 'users/refresh-access-token',
};
