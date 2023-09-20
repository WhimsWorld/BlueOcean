import axios from 'axios';

export const fetchChatByStoryId = (storyId) => axios.get(`/api/chat/story/${storyId}`)
  .then((response) => response.data)
  .catch((error) => {
    console.log('ServerError', error);
    throw error;
  });

export const postNewMessage = ({ storyId, userId, data }) => axios.post('/api/chat', { storyId, userId, data })
  .then((response) => response.data)
  .catch((error) => {
    console.log('ServerError', error);
    throw error;
  });
