import axios from 'axios';
import { store } from './store';

const { API_PATH } = process.env;

export const getToken = () => {
  // const user = JSON.parse(localStorage.getItem('persist:root'))?.user;
  // const currentUser = user && JSON.parse(user).currentUser;
  // const TOKEN = currentUser?.accessToken;

  const currentUser = store.getState().user.currentUser;
  const TOKEN = currentUser?.accessToken;

  return TOKEN;
}

export const publicRequest = axios.create({
  baseURL: API_PATH,
});

export const authorizedRequest = axios.create({
  baseURL: API_PATH,
});

authorizedRequest.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.token = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
