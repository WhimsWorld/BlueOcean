/* eslint-disable import/prefer-default-export */

import { config } from 'dotenv';
import pg from 'pg';

const { Pool } = pg;

config();

const pool = new Pool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE_NAME,
  port: 5432,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,

});

export const executeQuery = async (query, values) => {
  try {
    return await pool.query(query, values);
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }
};
