import { AppDispatch } from '..';
import { authorizedRequest, publicRequest } from '../../requestMethods';
import {
  addProductFailure,
  addProductStart,
  addProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  getProductsFailure,
  getProductsStart,
  getProductsSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess
} from '../slices/product';

export interface IProduct {
  _id?: string;
  categories?: string[];
  color?: string[];
  desc?: string;
  img?: string[];
  inStock?: boolean;
  price?: number;
  size?: string[];
  title?: string;
}

export const product = {
  getList: async (dispatch: AppDispatch) => {
    dispatch(getProductsStart());
    try {
      const res = await publicRequest.get('/products');
      dispatch(getProductsSuccess(res.data));
    } catch (err) {
      dispatch(getProductsFailure());
    }
  },

  delete: async (id: string, dispatch: AppDispatch) => {
    dispatch(deleteProductStart());
    try {
      await authorizedRequest.delete(`/products/${id}`);
      dispatch(deleteProductSuccess(id));
    } catch (err) {
      dispatch(deleteProductFailure());
    }
  },

  update: async (id: string, product: IProduct, dispatch: AppDispatch) => {
    dispatch(updateProductStart());
    try {
      await authorizedRequest.put(`/products/${id}`, product);
      dispatch(updateProductSuccess({ id, product }));
    } catch (err) {
      dispatch(updateProductFailure());
    }
  },

  add: async (product: IProduct, dispatch: AppDispatch) => {
    dispatch(addProductStart());
    try {
      const res = await authorizedRequest.post(`/products`, product);
      dispatch(addProductSuccess(res.data));
    } catch (err) {
      dispatch(addProductFailure());
    }
  },
};
