import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchStoryByStoryId } from '../../apis/storyAPI';

// Async thunk to fetch the story by its ID
export const fetchStoryById = createAsyncThunk(
  'story/fetchStoryById',
  async (storyId) => {
    const data = await fetchStoryByStoryId(storyId);
    return data;
  },
);

const storySlice = createSlice({
  name: 'story',
  initialState: {
    storyId: null,
    storyData: null,
  },
  reducers: {
    setStory: (state, action) => {
      state.storyId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchStoryById.fulfilled, (state, action) => {
      state.storyData = action.payload;
    });
  },
});

export const { setStory } = storySlice.actions;
export default storySlice.reducer;
