import { configureStore } from '@reduxjs/toolkit';
import characterReducer from './slices/characterSlice';
import userReducer from './slices/userSlice';

const store = configureStore({
  reducer: {
    characters: characterReducer,
    user: userReducer,

  },
});

export default store;
