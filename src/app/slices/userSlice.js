import React from 'react';
import { createSlice } from '@reduxjs/toolkit';

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
});

export const loggingIn = (userID) => ({
  type: 'setCurrentUser',
  payload: userID,
});

export const { setCurrentUser } = userSlice.actions;
export default userSlice.reducer;
