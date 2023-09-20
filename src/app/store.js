import { configureStore } from '@reduxjs/toolkit';
import characterReducer from './slices/characterSlice';
import storyReducer from './slices/storySlice';
import postsReducer from './slices/postsSlice';

const store = configureStore({
  reducer: {
    characters: characterReducer,
    story: storyReducer,
    posts: postsReducer,

  },
});

export default store;
