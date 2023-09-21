import axios from 'axios';

export const fetchCharactersByUserId = (userId) => axios.get(`/api/characters/user/${userId}`)
  .then((response) => response.data)
  .catch((error) => {});

export const fetchCharactersByStoryId = (storyId) => axios.get(`/api/characters/${storyId}`)
  .then((response) => response.data)
  .catch((error) => {});

export const addCharacterByUserId = () => {
};
