import { executeQuery } from '../db.js';

export const getStories = async () => {
  const query = 'SELECT * FROM stories INNER JOIN images on images.image_id = stories.main_image_id';
  const result = await executeQuery(query);
  return result.rows;
};

export const getCategories = async () => {
  const query = 'SELECT * FROM categories';
  const result = await executeQuery(query);
  return result.rows;
};

export const getLeaderboard = async () => {
  const query = 'SELECT * FROM stories INNER JOIN thumbnail_images on thumbnail_images.thumbnail_id = stories.thumbnail_id ORDER BY like_count DESC';
  const result = await executeQuery(query);
  const response = [];
  if (result.rows.length < 10) {
    for (let i = 0; i < result.rows.length; i += 1) {
      response.push(result.rows[i]);
    }
  } else {
    for (let i = 0; i < 10; i += 1) {
      response.push(result.rows[i]);
    }
  }
//check
  return response;
};
