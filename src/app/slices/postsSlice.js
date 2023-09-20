import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPostsByStoryId } from '../../apis/postsAPI';

// Async thunk to fetch the story by its ID
export const fetchPostsById = createAsyncThunk(
  'posts/fetchPostsById',
  async (storyId) => {
    const data = await fetchPostsByStoryId(storyId);
    return data;
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    storyId: null,
    storyData: null,
  },
  reducers: {
    setPosts: (state, action) => {
      state.storyId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPostsById.fulfilled, (state, action) => {
      state.storyData = action.payload;
    });
  },
});

export const { setPosts } = postsSlice.actions;
export default postsSlice.reducer;
