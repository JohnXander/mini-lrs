import { createSlice } from "@reduxjs/toolkit";
import { GuestUserState } from "./guestUser.types";

const initialState: GuestUserState = {
  currentGuestUser: null,
  error: null,
  loading: false,
};

const guestUserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    createGuestUserStart: (state) => {
      state.loading = true;
    },
    createGuestUserSuccess: (state, action) => {
      state.currentGuestUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    createGuestUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  }
});

export const {
  createGuestUserStart,
  createGuestUserSuccess,
  createGuestUserFailure,
} = guestUserSlice.actions;

export default guestUserSlice.reducer;
