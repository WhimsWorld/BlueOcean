// characterSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchCharactersByUserId, fetchCharactersByStoryId } from '../../apis/characterAPI';

export const characterSlice = createSlice({
  name: 'characters',
  initialState: [],
  reducers: {
    setCharacters: (state, action) => action.payload,
  },
});

export const { setCharacters } = characterSlice.actions;

export const loadCharactersByUserId = (userId) => (dispatch) => {
  fetchCharactersByStoryId(userId).then((data) => {
    dispatch(setCharacters(data));
  });
};

export default characterSlice.reducer;
