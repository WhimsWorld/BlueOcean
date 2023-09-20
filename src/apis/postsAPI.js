/* eslint-disable import/prefer-default-export */
import axios from 'axios';

export const fetchPostsByStoryId = (storyId) => axios.get(`/api/posts/${storyId}`)
  .then((response) => response.data)
  .catch((error) => {
    console.log('ServerError', error);
    throw error;
  });

export const addPost = ({ storyId, userId, data }) => axios.post('/api/post', { storyId, userId, data })
  .then((response) => response.data)
  .catch((error) => {
    console.log('ServerError', error);
    throw error;
  });
