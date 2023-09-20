import React from 'react';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setPremiumStatus } from '../../apis/userAPI';

export const updateUserPremium = createAsyncThunk(
  'user/updatePremium',
  async ({ userId, premiumStatus }) => {
    const response = await setPremiumStatus(userId, premiumStatus);
    return response;
  },
);
export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
  },
  reducers: {
    setCurrentUser: (state, action) => {
    // action.payload,
      console.log('action', action.payload);
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateUserPremium.fulfilled, (state, action) => {
      if (state.user && state.user.user_id === action.payload.user_id) {
        state.user.premium = action.payload.premium;
      }
    });
  },
});

export const loggingIn = (userID) => ({
  type: 'setCurrentUser',
  payload: userID,
});

export const { setCurrentUser } = userSlice.actions;
export default userSlice.reducer;
