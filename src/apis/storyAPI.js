/* eslint-disable import/prefer-default-export */
import axios from 'axios';

export const fetchStoryByStoryId = (storyId) => axios.get(`/api/stories/${storyId}`)
  .then((response) => response.data)
  .catch((error) => {
    console.log('ServerError', error);
    throw error;
  });
