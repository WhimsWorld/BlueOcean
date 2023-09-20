/* eslint-disable import/prefer-default-export */
import axios from 'axios';

export const fetchPostsByStoryId = (storyId) => axios.get(`/api/posts/${storyId}`)
  .then((response) => response.data)
  .catch((error) => {
    console.log('ServerError', error);
    throw error;
  });
