import { AppDispatch } from '..';
import { authorizedRequest } from '../../requestMethods';
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  getUsersFailure,
  getUsersStart,
  getUsersSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from '../slices/user';

export interface IUser {
  _id?: string;
  email?: string;
  img?: string;
  isAdmin?: boolean;
  password?: string;
  transaction?: number;
  username?: string;
}

export const getUsers = async (dispatch: AppDispatch) => {
  dispatch(getUsersStart());
  try {
    const res = await authorizedRequest.get('/users');
    dispatch(getUsersSuccess(res.data));
  } catch (err) {
    dispatch(getUsersFailure());
  }
};

export const deleteUser = async (id: string, dispatch: AppDispatch) => {
  dispatch(deleteUserStart());
  try {
    await authorizedRequest.delete(`/users/${id}`);
    dispatch(deleteUserSuccess(id));
  } catch (err) {
    dispatch(deleteUserFailure());
  }
};

export const updateUser = async (user: IUser, dispatch: AppDispatch) => {
  dispatch(updateUserStart());
  try {
    const updatedUser = await authorizedRequest.put(`/users/${user._id}`, user);
    dispatch(updateUserSuccess(updatedUser));
  } catch (err) {
    dispatch(updateUserFailure());
  }
};
