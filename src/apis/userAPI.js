/* eslint-disable import/prefer-default-export */
import axios from 'axios';

export const setPremiumStatus = (userId, premiumStatus) => axios.patch(`/api/users/${userId}/premium`, { premium: premiumStatus })
  .then((response) => response.data)
  .catch((error) => {
    console.log('ServerError', error);
    throw error;
  });
