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
LEFT JOIN
  sounds
ON
  posts.sound_id = sounds.sound_id
LEFT JOIN
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
  posts.story_id = $1
ORDER BY
  date_created
ASC;

  `;

  const values = [storyId];
  const result = await executeQuery(query, values);
  return result.rows;
};

export const getChars = async () => {
  const query = 'SELECT * FROM characters';
  const result = await executeQuery(query);
  return result.rows;
};

export const getAllData = async (storyId) => {
  const query = `
    SELECT
      images.image_id,
      images.image_url,
      sounds.sound_id,
      sounds.sound_url,
      sounds.sound_name,
      gifs.gif_id,
      gifs.gif_url
    FROM stories
    JOIN images ON stories.category_id = images.category_id
    JOIN sounds ON stories.category_id = sounds.category_id
    JOIN gifs ON stories.category_id = gifs.category_id
    WHERE stories.story_id = $1;
  `;

  const result = await executeQuery(query, [storyId]);

  const dataResponse = {
    images: {},
    gifs: {},
    sounds: {},
  };

  for (let i = 0; i < result.rows.length; i += 1) {
    const row = result.rows[i];

    if (row.gif_url) {
      dataResponse.gifs[row.gif_id] = row.gif_url;
    }

    if (row.sound_url) {
      dataResponse.sounds[row.sound_id] = {
        url: row.sound_url,
        name: row.sound_name, // Include sound_name in the response
      };
    }

    if (row.image_url) {
      dataResponse.images[row.image_id] = row.image_url;
    }
  }

  const newDataObject = {
    images: [],
    sounds: [],
    gifs: [],
  };

  Object.keys(dataResponse.images).forEach((id) => {
    newDataObject.images.push({ id, url: dataResponse.images[id] });
  });

  Object.keys(dataResponse.sounds).forEach((id) => {
    newDataObject.sounds.push({ id, url: dataResponse.sounds[id].url, name: dataResponse.sounds[id].name });
  });

  Object.keys(dataResponse.gifs).forEach((id) => {
    newDataObject.gifs.push({ id, url: dataResponse.gifs[id] });
  });

  return { newDataObject };
};

export const getNarrator = async (storyid, userid) => {
  const query = `
    SELECT EXISTS (
      SELECT 1
      FROM stories
      WHERE story_id = $1 AND narrator_id = $2
    ) AS is_narrator;
  `;
  const result = await executeQuery(query, [storyid, userid]);
  return result.rows[0].is_narrator;
};

export const addPost = async (
  storyId,
  userId,
  gifId,
  soundId,
  imageId,
  narratorPost,
  content,
) => {
  const query = `
  INSERT INTO posts (story_id, created_by_user_id, gif_id, sound_id, narrator_image_id, narrator_post, content)
  VALUES ($1, $2, $3, $4, $5, $6, $7)
  RETURNING *;
  `;
  const values = [storyId, userId, gifId, soundId, imageId, narratorPost, content];
  const response = await executeQuery(query, values);

  return response.rows[0];
};
