import { executeQuery } from '../db.js';

export const getThemeImages = async () => {
  const query = 'SELECT image_url, image_id, category_id FROM images';
  const result = await executeQuery(query);
  return result.rows;
};

export const getThumbnailImages = async () => {
  const query = 'SELECT thumbnail_url, thumbnail_id, category_id FROM thumbnail_images';
  const result = await executeQuery(query);
  return result.rows;
};

export const getGifs = async () => {
  const query = 'SELECT * FROM gifs';
  const result = await executeQuery(query);
  return result.rows;
};

export const createStory = async (storyData) => {
  const query = `INSERT INTO stories (created_by_user_id, category_id, narrator_id, main_image_id, thumbnail_id, title, summary, max_characters)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;
  const values = [storyData.created_by_user_id, storyData.category_id, storyData.narrator_id, storyData.main_image_id, storyData.thumbnail_id, storyData.title, storyData.summary, storyData.max_characters];
  const result = await executeQuery(query, values);
  return result.rows[0];
};
