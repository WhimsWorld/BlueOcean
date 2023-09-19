// characterSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchStoryByStoryId } from '../../apis/storyAPI';

export const storySlice = createSlice({
  name: 'story',
  initialState: [],
  reducers: {
    setStory: (state, action) => action.payload,
  },
});

export const { setStory } = storySlice.actions;

export const loadStoryByStoryId = (storyId) => (dispatch) => {
  fetchStoryByStoryId(storyId).then((data) => {
    dispatch(setStory(data));
  });
};

export default storySlice.reducer;
