import { configureStore } from '@reduxjs/toolkit';
import characterReducer from './slices/characterSlice';
import storyReducer from './slices/storySlice';
import chatReducer from './slices/chatSlice';

const store = configureStore({
  reducer: {
    characters: characterReducer,
    story: storyReducer,
    chat: chatReducer,
  },
});

export default store;
