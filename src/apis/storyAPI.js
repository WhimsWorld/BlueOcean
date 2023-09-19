/* eslint-disable import/prefer-default-export */
import axios from 'axios';

export const fetchStoryByStoryId = (storyId) => axios.get(`/api/story/${storyId}`)
  .then((response) => response.data)
  .catch((error) => console.log('ServerError'));
