import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPostsByStoryId } from '../../apis/postsAPI';

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

export default postsSlice.reducer;
