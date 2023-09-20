import { configureStore } from '@reduxjs/toolkit';
import characterReducer from './slices/characterSlice';
import storyReducer from './slices/storySlice';

const store = configureStore({
  reducer: {
    characters: characterReducer,
    story: storyReducer,
  },
});

export default store;
