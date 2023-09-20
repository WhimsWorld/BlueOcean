import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPostsByStoryId, addPost } from '../../apis/postsAPI';

export const postsSlice = createSlice({
  name: 'posts',
  initialState: [],
  reducers: {
    setPosts: (state, action) => action.payload,
  },
});

export const { setPosts } = postsSlice.actions;

export const fetchPostsById = (storyId) => (dispatch) => {
  fetchPostsByStoryId(storyId).then((data) => {
    dispatch(setPosts(data));
  });
};

// Async thunk to post a new chat message
export const postMessage = createAsyncThunk(
  'post/addPost',
  async ({ storyId, userId, data }) => {
    try {
      console.log(storyId, userId, data);
      const response = await addPost({ storyId, userId, data });
      return response;
    } catch (error) {
      console.error('Error in addPost:', error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export default postsSlice.reducer;
