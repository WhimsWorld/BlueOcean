import { executeQuery } from '../db.js';

export const addMessage = async (userId, storyId, data) => {
  const query = `
    INSERT INTO chat (user_id, story_id, data)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const values = [userId, storyId, data];
  const result = await executeQuery(query, values);
  return result.rows[0];
};

export const getMessagesByStoryId = async (storyId) => {
  const query = `
    SELECT * 
    FROM chat 
    WHERE story_id = $1 
    ORDER BY date_created DESC;
  `;
  const values = [storyId];
  const result = await executeQuery(query, values);
  return result.rows;
};
