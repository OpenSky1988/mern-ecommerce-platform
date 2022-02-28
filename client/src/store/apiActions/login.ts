import { AppDispatch } from '..';
import { publicRequest } from '../../requestMethods';
import { IUser } from '../../types';
import { loginFailure, loginStart, loginSuccess, logoutSuccess } from '../slices/user';

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

  logout: async (dispatch: AppDispatch) => {
    localStorage.removeItem('persist:root');

    dispatch(logoutSuccess());
  },

  register: async (dispatch: AppDispatch, user: IUser) => {
    dispatch(loginStart());
    try {
      const res = await publicRequest.post('/auth/register', user);
      dispatch(loginSuccess(res.data));
    } catch (err) {
      dispatch(loginFailure());
    }
  },
};
