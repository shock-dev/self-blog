import axios from 'axios';

axios.interceptors.request.use((config) => {
  config.headers.Authorization = localStorage.getItem('authToken');
  return config;
});

export default axios;
