import { executeQuery } from '../db.js';

export const getAllUsers = async () => {
  const query = 'SELECT * FROM users';
  const result = await executeQuery(query);
  return result.rows;
};

export const getUserById = async (userId) => {
  const query = 'SELECT * FROM users WHERE user_id = $1';
  const values = [userId];
  const result = await executeQuery(query, values);
  return result.rows[0];
};

export const addUser = async (userId, username) => {
  const query = 'INSERT INTO users (user_id, username) VALUES ($1, $2) RETURNING *';
  const values = [userId, username];
  const result = await executeQuery(query, values);
  return result.rows[0];
};
