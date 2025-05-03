import { promises as fs } from 'fs';
import path from 'path';
import { User } from '../types/types';

const isProd = process.env.NODE_ENV === 'production';

const USERS_PATH = isProd
  ? path.resolve(__dirname, 'assets/users.json') // for dist
  : path.resolve(__dirname, '../src/assets/users.json'); // for dev

/**
 * Reads the users from the users.json file.
 *
 * @async
 * @function
 * @returns {Promise<User[]>} A promise that resolves to an array of User objects
 * @throws Will throw an error if reading or parsing the file fails
 */
export const readUsers = async (): Promise<User[]> => {
  try {
    const data = await fs.readFile(USERS_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Failed to read users.json:', error);
    throw error;
  }
};
/**
 * Writes the given users array to the users.json file.
 *
 * @async
 * @function
 * @param {User[]} users - An array of User objects to be saved
 * @returns {Promise<void>} A promise that resolves when the file has been written
 * @throws Will throw an error if writing to the file fails
 */
export const writeUsers = async (users: User[]): Promise<void> => {
  try {
    await fs.writeFile(USERS_PATH, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error('Failed to write to users.json:', error);
    throw error;
  }
};
