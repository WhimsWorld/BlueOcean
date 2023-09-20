// eslint-disable-next-line import/extensions
import { executeQuery } from '../db.js';

// eslint-disable-next-line import/prefer-default-export
export const getPosts = async (storyId) => {
  const query = `
  SELECT
    posts.*,
    images.image_url AS narrator_image_url,
    sounds.sound_url,
    gifs.gif_url,
    characters.char_name,
    char_images.image_url AS char_image_url
  FROM
    posts
  LEFT JOIN
    images
  ON
    posts.narrator_image_id = images.image_id
  INNER JOIN
    sounds
  ON
    posts.sound_id = sounds.sound_id
  INNER JOIN
    gifs
  ON
    posts.gif_id = gifs.gif_id
  LEFT JOIN
    characters
  ON
    posts.char_id = characters.char_id
  LEFT JOIN
    images AS char_images
  ON
    characters.image_id = char_images.image_id
  WHERE
  posts. story_id = $1;

  `;

  const values = [storyId];
  const result = await executeQuery(query, values);
  return result.rows;
};
