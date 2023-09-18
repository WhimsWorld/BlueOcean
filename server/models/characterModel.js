import { executeQuery } from '../db.js';

export const getAllCharacters = async () => {
  const query = 'SELECT * FROM characters';
  const result = await executeQuery(query);
  return result.rows;
};

export const getCharactersByUserId = async (userId) => {
  const query = 'SELECT * FROM characters WHERE user_id = $1';
  const values = [userId];
  const result = await executeQuery(query, values);
  return result.rows;
};

export const addCharacter = async (characterData) => {
  const {
    story_id, user_id, image_id, name, strength, weakness, backstory,
  } = characterData;

  const query = `
    INSERT INTO characters (story_id, user_id, image_id, name, strength, weakness, backstory)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *`;
  const values = [story_id, user_id, image_id, name, strength, weakness, backstory];
  const result = await executeQuery(query, values);
  return result.rows[0];
};
