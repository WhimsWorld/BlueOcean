// eslint-disable-next-line import/extensions
import { executeQuery } from '../db.js';

// eslint-disable-next-line import/prefer-default-export
export const getPostsById = async (storyId) => {
  const query = `
    SELECT posts.*, images.image_url, gifs.gif_url, sounds.sound_url
    FROM posts
    INNER JOIN images ON stories.main_image_id = images.image_id
    INNER JOIN categories ON stories.category_id = categories.cat_id
    WHERE stories.story_id = $1
  `;

  const values = [storyId];
  const result = await executeQuery(query, values);
  return result.rows[0];
};
