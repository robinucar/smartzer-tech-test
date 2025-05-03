/**
 * Represents a user object.
 *
 * @typedef {Object} User
 * @property {number} id - The unique identifier for the user
 * @property {string} name - The name of the user
 * @property {string} dob - The date of birth of the user in ISO format (YYYY-MM-DD)
 */
export type User = {
  id: number;
  name: string;
  dob: string;
};
