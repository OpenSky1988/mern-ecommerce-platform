import { AppDispatch } from '..';
import { authorizedRequest } from '../../requestMethods';
import {
  deleteOrderFailure,
  deleteOrderStart,
  deleteOrderSuccess,
  getOrdersFailure,
  getOrdersStart,
  getOrdersSuccess,
  updateOrderFailure,
  updateOrderStart,
  updateOrderSuccess,
} from '../slices/order';

export interface IOrderProduct {
  quantity: number;
  productId: string;
}

export interface IOrder {
  _id?: string;
  userId?: string;
  status?: string;
  amount?: number;
  products?: IOrderProduct[];
}

export const getOrders = async (dispatch: AppDispatch) => {
  dispatch(getOrdersStart());
  try {
    const res = await authorizedRequest.get('/orders');
    dispatch(getOrdersSuccess(res.data));
  } catch (err) {
    dispatch(getOrdersFailure());
  }
};

export const deleteOrder = async (id: string, dispatch: AppDispatch) => {
  dispatch(deleteOrderStart());
  try {
    await authorizedRequest.delete(`/orders/${id}`);
    dispatch(deleteOrderSuccess(id));
  } catch (err) {
    dispatch(deleteOrderFailure());
  }
};

export const updateOrder = async (user: IOrder, dispatch: AppDispatch) => {
  dispatch(updateOrderStart());
  try {
    const updatedUser = await authorizedRequest.put(`/orders/${user._id}`, user);
    dispatch(updateOrderSuccess(updatedUser));
  } catch (err) {
    dispatch(updateOrderFailure());
  }
};
