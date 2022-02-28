import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    isFetching: false,
    error: false,
    orders: [],
  },
  reducers: {
    getOrdersStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getOrdersSuccess: (state, action) => {
      state.isFetching = false;
      state.orders = action.payload;
    },
    getOrdersFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    // DELETE
    deleteOrderStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteOrderSuccess: (state, action) => {
      state.isFetching = false;
      state.orders.splice(
        state.orders.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteOrderFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    // UPDATE
    updateOrderStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateOrderSuccess: (state, action) => {
      state.isFetching = false;
      state.orders[
        state.orders.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.product;
    },
    updateOrderFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  deleteOrderFailure,
  deleteOrderStart,
  deleteOrderSuccess,
  getOrdersFailure,
  getOrdersStart,
  getOrdersSuccess,
  updateOrderFailure,
  updateOrderStart,
  updateOrderSuccess,
} = orderSlice.actions;
export default orderSlice.reducer;
