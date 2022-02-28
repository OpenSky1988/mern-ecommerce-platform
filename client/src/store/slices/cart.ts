import { createSlice } from '@reduxjs/toolkit';
import { IProduct } from '../../components/Product';

export interface ICartSlice {
  products: { [key: string]: IProduct };
  quantity: number;
  total: number;
}

const initialState: ICartSlice = {
  products: {},
  quantity: 0,
  total: 0,
};

const cart = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      if (state.products[action.payload._id]) {
        const product = state.products[action.payload._id];
        state.products[action.payload._id] = {
          ...product,
          quantity: product.quantity + 1,
        };
      } else {
        state.products[action.payload._id] = action.payload;
      }

      state.total += action.payload.price * action.payload.quantity;
    },
    removeProduct: (state, action) => {
      state.quantity -= 1;
      if (state.products[action.payload._id].quantity > 1) {
        const product = state.products[action.payload._id];
        state.products[action.payload._id] = {
          ...product,
          quantity: product.quantity - 1,
        };
      } else {
        delete state.products[action.payload._id];
      }

      state.total -= action.payload.price;
    },
    clearCart: () => initialState,
  },
});

export const {
  addProduct,
  clearCart,
  removeProduct,
} = cart.actions;
export default cart.reducer;
