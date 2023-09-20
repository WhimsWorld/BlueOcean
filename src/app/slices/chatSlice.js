import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchChatByStoryId, postNewMessage } from '../../apis/chatAPI';

// Async thunk to fetch chat messages by story ID
export const fetchChat = createAsyncThunk(
  'chat/fetchChat',
  async (storyId) => {
    const response = await fetchChatByStoryId(storyId);
    return response;
  },
);

// Async thunk to post a new chat message
export const postMessage = createAsyncThunk(
  'chat/postMessage',
  async ({ storyId, userId, data }) => {
    try {
      console.log(storyId, userId, data);
      const response = await postNewMessage({ storyId, userId, data });
      return response;
    } catch (error) {
      console.error('Error in postMessage:', error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchChat.fulfilled, (state, action) => {
      state.messages = action.payload;
    });
    builder.addCase(postMessage.fulfilled, (state, action) => {
      state.messages.push(action.payload);
    });
  },
});

export default chatSlice.reducer;
