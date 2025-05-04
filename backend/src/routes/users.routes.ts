import { Router, Request, Response } from 'express';
import { User } from '../types/types';
import { readUsers, writeUsers } from '../utils/fileStorage';

const router = Router();
const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;
/**
 * GET / - Fetch all users.
 *
 * @route GET /
 * @returns {User[]} 200 - An array of user objects
 * @returns {{ error: string }} 500 - Failed to read users
 */
router.get(
  '/',
  async (_req: Request, res: Response<User[] | { error: string }>) => {
    try {
      const users = await readUsers();
      res.status(200).json(users);
    } catch {
      res.status(500).json({ error: 'Failed to read users' });
    }
  }
);
/**
 * POST / - Create a new user.
 *
 * @route POST /
 * @param {object} req.body - The user payload
 * @param {number} req.body.id - The user's unique ID
 * @param {string} req.body.name - The user's name
 * @param {string} req.body.dob - The user's date of birth (ISO format: YYYY-MM-DD)
 * @returns {User} 201 - Created user object
 * @returns {{ error: string }} 400 - Invalid user payload
 * @returns {{ error: string }} 500 - Failed to save user
 */
router.post(
  '/',
  async (req: Request, res: Response<User | { error: string }>) => {
    try {
      const body = req.body;

      if (
        !body ||
        typeof body !== 'object' ||
        typeof body.id !== 'number' ||
        typeof body.name !== 'string' ||
        typeof body.dob !== 'string' ||
        !isoDateRegex.test(body.dob)
      ) {
        return res.status(400).json({ error: 'Invalid user payload' });
      }

      const newUser: User = {
        id: body.id,
        name: body.name,
        dob: body.dob,
      };

      const users = await readUsers();
      users.push(newUser);
      await writeUsers(users);

      res.status(201).json(newUser);
    } catch {
      res.status(500).json({ error: 'Failed to save user' });
    }
    return;
  }
);

/**
 * @route GET /api/users/:id
 * @description Fetch a single user by their ID
 * @param {string} req.params.id - The ID of the user to fetch
 * @returns {User | { error: string }} 200 with user if found, 404 if not found, 400 if invalid ID, 500 on failure
 */
router.get(
  '/:id',
  async (req: Request, res: Response<User | { error: string }>) => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid user ID' });
      }
      const users = await readUsers();
      const user = users.find((u) => u.id === id);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      return res.status(200).json(user);
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      return res.status(500).json({ error: 'Failed to fetch user' });
    }
  }
);

/**
 * DELETE /api/users/:id - Deletes a user by ID.
 *
 * @param req - Express request object containing user ID in params
 * @param res - Express response object
 * @returns 204 if deleted, 404 if not found, 400 if invalid ID, 500 if error
 */
router.delete(
  '/:id',
  async (req: Request, res: Response<{ error: string } | void>) => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid user ID' });
      }
      const users = await readUsers();
      const index = users.findIndex((u) => u.id === id);
      if (index === -1) {
        return res.status(404).json({ error: 'User not found' });
      }

      users.splice(index, 1);
      await writeUsers(users);

      return res.status(204).send();
    } catch (error) {
      console.error('Delete user error:', error);
      return res.status(500).json({ error: 'Failed to delete user' });
    }
  }
);
export default router;
