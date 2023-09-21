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

export const getCharactersByStoryId = async (storyId) => {
  const query = `
    SELECT characters.*, images.image_url
    FROM characters
    LEFT JOIN images ON characters.image_id = images.image_id
    WHERE characters.story_id = $1;
  `;
  const values = [storyId];
  const result = await executeQuery(query, values);
  return result.rows;
};

export const addCharacter = async (characterData) => {
  // console.log('charcter data', characterData);
  const {
    story_id, user_id, image_id, sound_id, char_name, strength,
    weakness, backstory, characterRace, characterSex,
  } = characterData;
  // const story_id = 1;
  const query = `
    INSERT INTO characters (story_id, user_id, image_id, sound_id, char_name, strength, weakness, backstory, char_race, char_sex)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING *`;
  const values = [story_id, user_id, image_id, sound_id, char_name, strength,
    weakness, backstory, characterRace, characterSex];
  const result = await executeQuery(query, values);
  return result.rows[0];
};

export const getImages = async () => {
  const query = 'SELECT * from images WHERE category_id = 5';
  const result = await executeQuery(query);
  return result.rows;
};

export const getSounds = async () => {
  const query = 'SELECT * from sounds WHERE category_id = 5';
  const result = await executeQuery(query);
  return result.rows;
};
