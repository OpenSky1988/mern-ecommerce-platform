import axios from 'axios';

const { API_PATH } = process.env;

const user = JSON.parse(localStorage.getItem('persist:root'))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.accessToken;

export const publicRequest = axios.create({
  baseURL: API_PATH,
});

export const authorizedRequest = axios.create({
  baseURL: API_PATH,
  headers: { token: TOKEN },
});
