import axiosClient from './axiosClient';

export const refreshToken = ({ refreshToken }) =>
  axiosClient.post('/user/refresh-token', { refreshToken });
