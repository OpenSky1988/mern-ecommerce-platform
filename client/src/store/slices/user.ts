import { createSlice } from '@reduxjs/toolkit';

interface IUserSlice {
  currentUser: any;
  error: boolean;
  isFetching: boolean;
}

const initialState: IUserSlice = {
  currentUser: {},
  error: false,
  isFetching: false,
};

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logoutSuccess: (state) => {
      state.currentUser = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logoutSuccess,
} = user.actions;
export default user.reducer;
