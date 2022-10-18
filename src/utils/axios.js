import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
});

export const setAuthHeaders = () => {
  instance.defaults.headers.common['uid'] = localStorage.getItem('uid');
  instance.defaults.headers.common['client'] = localStorage.getItem('client');
  instance.defaults.headers.common['access-token'] = localStorage.getItem('token');
};

setAuthHeaders();
export const axiosInstance = instance;
