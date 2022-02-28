import { publicRequest } from 'src/requestMethods';
import { AppDispatch } from '..';
import {
  authFailure,
  authStart,
  authSuccess,
  loginFailure,
  loginStart,
  loginSuccess,
  logoutSuccess,
} from '../slices/user';
import { IUser } from './users';

export const auth = {
  login: async (dispatch: AppDispatch, user: IUser) => {
    dispatch(loginStart());
    try {
      const res = await publicRequest.post('/auth/login', user);
      dispatch(loginSuccess(res.data));
    } catch (err) {
      dispatch(loginFailure());
    }
  },

  register: async (dispatch: AppDispatch, user: IUser) => {
    dispatch(authStart());
    try {
      await publicRequest.post('/auth/register', user);
      dispatch(authSuccess());
    } catch (err) {
      dispatch(authFailure());
    }
  },

  logout: async (dispatch: AppDispatch) => {
    localStorage.removeItem('persist:root');

    dispatch(logoutSuccess());
  },
};
