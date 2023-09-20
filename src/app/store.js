import { configureStore } from '@reduxjs/toolkit';
import characterReducer from './slices/characterSlice';

const store = configureStore({
  reducer: {
    characters: characterReducer,
    story: storyReducer,
    chat: chatReducer,
    user: userReducer,

  },
});

export default store;
