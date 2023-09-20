import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPostsByStoryId } from '../../apis/postsAPI';

// Async thunk to fetch the story by its ID
// export const fetchPostsById = createAsyncThunk(
//   'posts/fetchPostsByStoryId',
//   async (storyId) => {
//     const data = await fetchPostsByStoryId(storyId);
//     console.log("slice", data);
//     return data;
//   },
// );

// const postsSlice = createSlice({
//   name: 'posts',
//   initialState: [],
//   reducers: {
//     setPosts: (state, action) => action.payload,
//   },
// });

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
