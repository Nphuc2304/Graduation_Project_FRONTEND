import axiosClient from './axiosClient';

// 1. signup API
export const signup = async ({ username, password }) => {
  const payload = { username, password };
  return axiosClient.post('/users/signup', payload);
};

// 2.1. login API
export const login = async ({ username, password }) => {
  const payload = { username, password };
  return axiosClient.post('/users/login', payload);
};

// 2.2. get all user's details 
export const getMe = () =>
    axiosClient.get('/users/me');