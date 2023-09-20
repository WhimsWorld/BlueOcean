import { configureStore } from '@reduxjs/toolkit';
import characterReducer from './slices/characterSlice';
import userReducer from './slices/userSlice';
import storyReducer from './slices/storySlice';
import chatReducer from './slices/chatSlice';

const store = configureStore({
  reducer: {
    characters: characterReducer,
    story: storyReducer,
    chat: chatReducer,
    user: userReducer,

  },
});

export default store;
