import axios from 'axios';
import { getAuthToken } from '../utils/helpers';

axios.defaults.baseURL = 'http://localhost:3000';

axios.interceptors.request.use(
  async (config) => {
    const access_token = await getAuthToken();
    if (access_token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      config.headers['Authorization'] = `Bearer ${access_token}`;
    }
    return config;
  },
  async (error) => {
    return Promise.reject(error);
  }
);
// Add a response interceptor
axios.interceptors.response.use(
  async function (response) {
    return response;
  },
  async function (error) {
    return Promise.reject(error);
  }
);
export default axios;
