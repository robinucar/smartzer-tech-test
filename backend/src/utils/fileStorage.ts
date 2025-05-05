import { promises as fs } from 'fs';
import path from 'path';
import { User } from '@shared-types';

const isProd = process.env.NODE_ENV === 'production';

const USERS_PATH = isProd
  ? path.resolve(__dirname, 'assets/users.json') // for dist
  : path.resolve(__dirname, '../src/assets/users.json'); // for dev

/**
 * Reads the users from the users.json file.
 * If the file does not exist, it initializes an empty array and creates the file.
 *
 * @returns {Promise<User[]>} A promise that resolves to an array of User objects.
 */
export const readUsers = async (): Promise<User[]> => {
  try {
    const data = await fs.readFile(USERS_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      await writeUsers([]);
      return [];
    }
    console.error('Failed to read users.json:', error);
    throw error;
  }
};

/**
 * Writes the given users array to the users.json file.
 * Ensures the file and its directory exist.
 *
 * @param {User[]} users - An array of User objects to be saved.
 * @returns {Promise<void>} A promise that resolves when the file has been written.
 */
export const writeUsers = async (users: User[]): Promise<void> => {
  try {
    await fs.mkdir(path.dirname(USERS_PATH), { recursive: true });

    await fs.writeFile(USERS_PATH, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error('Failed to write to users.json:', error);
    throw error;
  }
};
