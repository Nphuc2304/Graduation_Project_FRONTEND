import axios from 'axios';
import {BASE_URL} from './api';
import {getRefreshToken, getAccessToken} from './getRefreshToken';
import {saveTokens, clearTokens} from '../src/utils/tokenStorage';
import {API} from './api';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Flag to prevent multiple refresh requests
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(({resolve, reject}) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });

  failedQueue = [];
};

axiosInstance.interceptors.request.use(
  async config => {
    if (!config.headers) {
      config.headers = {};
    }

    // Skip token for login and refresh endpoints
    if (
      config.url?.includes(API.LOGIN) ||
      config.url?.includes(API.GET_ACCESS_TOKEN) ||
      config.url?.includes(API.CHECK_REFRESH_TOKEN)
    ) {
      delete config.headers.token;
      return config;
    }

    if (config.headers.Authorization) {
      // If Authorization header is already set, use it
    } else if (config.headers.token === 'refresh') {
      const refreshToken = await getRefreshToken();
      if (refreshToken) {
        config.headers.Authorization = `Bearer ${refreshToken}`;
      }
    } else {
      // Automatically add access token for all other requests
      const accessToken = await getAccessToken();
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }

    delete config.headers.token;

    console.log(
      '📤 Request:',
      JSON.stringify(
        {
          url: config.url,
          method: config.method,
          // params: config.params,
          // data: config.data,
          // headers: config.headers,
        },
        null,
        2,
      ),
    );

    return config;
  },
  error => {
    console.log('❌ Request error:', JSON.stringify(error, null, 2));
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  response => {
    console.log(
      '📥 Response:',
      JSON.stringify(
        {
          url: response.config.url,
          status: response.status,
          data: response.data,
        },
        null,
        2,
      ),
    );
    return response;
  },
  async error => {
    const originalRequest = error.config;

    if (error.response) {
      console.log(
        '❌ Response error:',
        JSON.stringify(
          {
            url: error.config?.url,
            status: error.response?.status,
            data: error.response?.data,
          },
          null,
          2,
        ),
      );

      // Handle 401 Unauthorized errors (token expired)
      if (error.response.status === 401 && !originalRequest._retry) {
        // Skip refresh for login and refresh token endpoints to avoid infinite loops
        if (
          originalRequest.url?.includes(API.LOGIN) ||
          originalRequest.url?.includes(API.GET_ACCESS_TOKEN) ||
          originalRequest.url?.includes(API.CHECK_REFRESH_TOKEN)
        ) {
          return Promise.reject(error);
        }

        if (isRefreshing) {
          // If already refreshing, queue this request
          return new Promise((resolve, reject) => {
            failedQueue.push({resolve, reject});
          })
            .then(token => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return axiosInstance(originalRequest);
            })
            .catch(err => {
              return Promise.reject(err);
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          console.log('🔄 Token expired, attempting to refresh...');

          // Get refresh token
          const refreshToken = await getRefreshToken();
          if (!refreshToken) {
            throw new Error('No refresh token available');
          }

          // Call refresh token endpoint
          const response = await axios.post(
            `${BASE_URL}${API.GET_ACCESS_TOKEN}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${refreshToken}`,
                'Content-Type': 'application/json',
              },
            },
          );

          const {accessToken, refreshToken: newRefreshToken} = response.data;

          // Save new tokens
          await saveTokens({accessToken, refreshToken: newRefreshToken});

          console.log('✅ Token refreshed successfully');

          // Process queued requests
          processQueue(null, accessToken);

          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          console.error('❌ Token refresh failed:', refreshError);

          // Process queued requests with error
          processQueue(refreshError, null);

          // Clear tokens when refresh fails
          try {
            await clearTokens();
            console.log('✅ Tokens cleared due to refresh failure');
          } catch (clearError) {
            console.error('❌ Failed to clear tokens:', clearError);
          }

          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }
    } else {
      console.log(
        '❌ Response error (no response):',
        JSON.stringify(error.message, null, 2),
      );
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
