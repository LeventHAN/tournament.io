import axios from 'axios';
import { auth } from '@clerk/nextjs';

axios.defaults.baseURL = 'http://localhost:3000';

axios.interceptors.request.use(
  async (config) => {
    const { getToken } = auth();
    const access_token = await getToken();
    console.log({ access_token });
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
