import axios from 'axios';

// create instance
const instance = axios.create({
  baseURL: process.env.VUE_APP_API,
});
// interceptors
instance.interceptors.response.use(undefined, (error) => Promise.reject(error));

export default instance;
