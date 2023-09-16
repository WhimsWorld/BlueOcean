// /src/features/counter is the conventional page for slice
import { createSlice } from '@reduxjs/toolkit';

const countSlice = createSlice({
  name: 'count',
  initialState: 0,
  reducers: {
    increment: (state) => state + 1,
    incrementByAmount: (state, action) => state + action.payload
  }
});

export const { increment, incrementByAmount } = countSlice.actions;
export default countSlice.reducer;