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