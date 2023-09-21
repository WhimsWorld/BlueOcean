// eslint-disable-next-line import/extensions
import { executeQuery } from '../db.js';

// COME BACK TO THIS. Ordering by date_created may not be correct. Date updated??
export const getStories = async (category, filter, myStories, user) => {
  const buildQuery = (categoryStory, filterStory, myStoriesFilter, userId) => {
    let query = `
      SELECT *
      FROM stories
      INNER JOIN images ON images.image_id = stories.main_image_id
    `;

    if (categoryStory) {
      query += `
        INNER JOIN categories ON categories.cat_id = stories.category_id
        WHERE cat_name = '${categoryStory}'
      `;
    }

    if (filterStory === 'Top') {
      if (myStoriesFilter === 'true') {
        query += `
          AND created_by_user_id = '${userId}'
          ORDER BY like_count DESC
        `;
      } else {
        query += `
          ORDER BY like_count DESC
        `;
      }
    } else if (filterStory === 'New') {
      if (myStoriesFilter === 'true') {
        query += `
          AND created_by_user_id = '${userId}'
          ORDER BY date_created DESC
        `;
      } else {
        query += `
          ORDER BY date_created DESC
        `;
      }
    }
    query += 'LIMIT 10';
    return query;
  };

  const query = buildQuery(category, filter, myStories, user);
  const result = await executeQuery(query);
  return result.rows;
};

export const getSearch = async (category, filter, search) => {
  const buildQuery = (categoryStory, filterStory, searchQuery) => {
    let query = `
      SELECT *
      FROM stories
      INNER JOIN images ON images.image_id = stories.main_image_id
    `;

    if (categoryStory) {
      query += `
        INNER JOIN categories ON categories.cat_id = stories.category_id
        WHERE cat_name = '${categoryStory}'
      `;
    }

    if (filterStory === 'Top') {
      query += `
          AND title ILIKE '%${searchQuery}%'
          ORDER BY like_count DESC
        `;
    } else if (filterStory === 'New') {
      query += `
        AND title ILIKE '%${searchQuery}%'
        ORDER BY date_created DESC
      `;
    }
    query += 'LIMIT 10';
    return query;
  };

  const query = buildQuery(category, filter, search);
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
  return response;
};

export const getStoryById = async (storyId) => {
  const query = `
    SELECT stories.*, images.image_url, categories.cat_name
    FROM stories
    INNER JOIN images ON stories.main_image_id = images.image_id
    INNER JOIN categories ON stories.category_id = categories.cat_id
    WHERE stories.story_id = $1
  `;

  const values = [storyId];
  const result = await executeQuery(query, values);
  return result.rows[0];
};

export const getLikedStories = async (user) => {
  const query = `
    SELECT * FROM user_story_likes WHERE user_id = '${user}'
  `;
  const result = await executeQuery(query);
  const response = {};
  for (let i = 0; i < result.rows.length; i += 1) {
    const storyId = result.rows[i].story_id;
    response[storyId] = true;
  }
  return response;
};

export const postLikedStory = async (user, story) => {
  const user_id = user;
  const query = `
  WITH inserted_row AS (
    INSERT INTO user_story_likes (user_id, story_id)
    VALUES ('${user_id}', ${story})
    RETURNING user_id, story_id
  ),
  increment_like_count AS (
    UPDATE stories
    SET like_count = like_count + 1
    WHERE story_id = ${story}
    RETURNING story_id
  )
  SELECT ir.user_id, ir.story_id
  FROM inserted_row ir
  UNION ALL
  SELECT usl.user_id, usl.story_id
  FROM user_story_likes usl
  JOIN users u ON usl.user_id = u.user_id
  WHERE u.user_id = '${user_id}';

`;

  const result = await executeQuery(query);
  const response = {};
  for (let i = 0; i < result.rows.length; i += 1) {
    const storyId = result.rows[i].story_id;
    response[storyId] = true;
  }
  return response;
};

export const deleteLikedStory = async (user, story) => {
  const user_id = user;
  const query = `
  WITH deleted_row AS (
    DELETE FROM user_story_likes
    WHERE user_id = '${user_id}' AND story_id = ${story}
    RETURNING user_id, story_id
  ),
  decrement_like_count AS (
    UPDATE stories
    SET like_count = like_count - 1
    WHERE story_id = ${story}
    RETURNING story_id
  )
  SELECT dr.user_id, dr.story_id
  FROM deleted_row dr
  UNION ALL
  SELECT usl.user_id, usl.story_id
  FROM user_story_likes usl
  JOIN users u ON usl.user_id = u.user_id
  WHERE u.user_id = '${user_id}';
    `;
  const result = await executeQuery(query);
  const response = {};
  for (let i = 0; i < result.rows.length; i += 1) {
    const storyId = result.rows[i].story_id;
    response[storyId] = true;
  }
  return response;
};
