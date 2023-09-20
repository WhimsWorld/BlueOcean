// eslint-disable-next-line import/extensions
import { executeQuery } from '../db.js';

// eslint-disable-next-line import/prefer-default-export
export const getPosts = async (storyId) => {
  const query = `
    SELECT *
    FROM posts
    WHERE story_id = $1
  `;

  const values = [storyId];
  const result = await executeQuery(query, values);
  console.log(result.rows);
  return result.rows;
};
