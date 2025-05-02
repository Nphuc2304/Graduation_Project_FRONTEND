import axios from 'axios';
import { loadTokens, saveTokens, clearTokens } from '../utils/tokenStorage';
import { refreshToken } from './auth';

const axiosClient = axios.create({
  baseURL: 'http://192.168.100.157:3000/api', // replace with your pc's IPv4 address instead of mine. open windows powershell and type "ipconfig" then look for IPv4 address under your network adapter
  // adb reverse tcp:3000 tcp:3000 might be able to access localhost:3000 with just an usb connection, but untested
  headers: {
    'Content-Type': 'application/json',
  },
});

let isRefreshing = false;
let queue = [];

// Attach accessToken
axiosClient.interceptors.request.use(async config => {
  const tokens = await loadTokens();
  if (tokens?.accessToken) {
    config.headers.Authorization = `Bearer ${tokens.accessToken}`;
  }
  return config;
});

// Handle refresh on 401
axiosClient.interceptors.response.use(
  res => res,
  async err => {
    const { response, config } = err;
    if (response?.status === 401 && !config._retry) {
      config._retry = true;

      if (isRefreshing) {
        // queue requests until refresh finishes
        return new Promise(resolve =>
          queue.push(() => resolve(axiosClient(config)))
        );
      }

      isRefreshing = true;
      try {
        const { refreshToken: oldRefresh } = (await loadTokens()) || {};
        if (!oldRefresh) throw new Error('No refresh token stored');

        // call renew endpoint
        const { data } = await refreshToken({ refreshToken: oldRefresh });
        // update storage
        await saveTokens({
          accessToken: data.accessToken,
          refreshToken: oldRefresh,
        });
        // apply new header
        axiosClient.defaults.headers.Authorization = `Bearer ${data.accessToken}`;
        // replay queued requests
        queue.forEach(cb => cb());
        queue = [];

        return axiosClient(config);
      } catch (_refreshError) {
        // give up, clear tokens & force sign-in
        await clearTokens();
        // TODO: navigate to SignIn screen
        return Promise.reject(_refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(err);
  }
);

export default axiosClient;
