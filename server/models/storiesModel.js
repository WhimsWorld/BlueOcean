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
  for (let i = 0; i < 10; i += 1) {
    response.push(result.rows[i]);
  }
  return response;
};
