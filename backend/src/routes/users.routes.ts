import { Router, Request, Response } from 'express';
import { User } from '../types/types';
import { readUsers, writeUsers } from '../utils/fileStorage';
import { badRequest, notFound, serverError } from '../utils/errorResponse';
import { parseUserId } from '../utils/parseUserId';

const router = Router();
const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;
/**
 * @route GET /
 * @description Fetch all users.
 * @returns {User[]} 200 - An array of user objects
 * @returns {{ error: string }} serverError - 500 - Failed to read users
 */
router.get(
  '/',
  async (_req: Request, res: Response<User[] | { error: string }>) => {
    try {
      const users = await readUsers();
      return res.status(200).json(users);
    } catch {
      return serverError(res, 'Failed to read users');
    }
  }
);
/**
 * @route POST /
 * @description Create a new user
 * @param {object} req.body - The user payload
 * @param {number} req.body.id - The user's unique ID
 * @param {string} req.body.name - The user's name
 * @param {string} req.body.dob - The user's date of birth (ISO format: YYYY-MM-DD)
 * @returns {User} 201 - Created user object
 * @returns {{ error: string }} badRequest - 400 - Invalid user payload
 * @returns {{ error: string }} serverError - 500 - Failed to save user
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
        return badRequest(res, 'Invalid user payload');
      }

      const newUser: User = {
        id: body.id,
        name: body.name,
        dob: body.dob,
      };

      const users = await readUsers();
      users.push(newUser);
      await writeUsers(users);

      return res.status(201).json(newUser);
    } catch {
      return serverError(res, 'Failed to save user');
    }
  }
);

/**
 * @route GET /api/users/:id
 * @description Fetch a single user by their ID
 * @param {string} req.params.id - The ID of the user to fetch
 * @returns {User} 200 with user if found,
 * @returns {{ error: string }} badRequest - 400 - Invalid ID
 * @returns {{ error: string }} notFound - 404 - User not found
 * @returns {{ error: string }} serverError - 500 - Failed to update user
 */
router.get(
  '/:id',
  async (req: Request, res: Response<User | { error: string }>) => {
    try {
      const id = parseUserId(req.params.id);
      if (id === null) {
        return badRequest(res, 'Invalid user ID');
      }
      const users = await readUsers();
      const user = users.find((u) => u.id === id);

      if (!user) {
        return notFound(res, 'User not found');
      }
      return res.status(200).json(user);
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      return serverError(res, 'Failed to fetch user');
    }
  }
);

/**
 * @route PUT /api/users/:id
 * @description Update a user name, date of birth by id
 * @param {object} req - Express request object
 * @param {string} req.params.id - The ID of the user to update
 * @param {string} req.body.name - The new name for the user
 * @param {string} req.body.dob - The new date of birth in ISO format (YYYY-MM-DD)
 * @returns {User} 200 - Successfully updated user
 * @returns {{ error: string }} badRequest - 400 - Invalid ID or payload
 * @returns {{ error: string }} notFound - 404 - User not found
 * @returns {{ error: string }} serverError - 500 - Failed to update user
 */
router.put(
  '/:id',
  async (req: Request, res: Response<User | { error: string }>) => {
    try {
      const id = parseUserId(req.params.id);
      if (id === null) {
        return badRequest(res, 'Invalid user ID');
      }

      const { name, dob } = req.body;
      if (
        typeof name !== 'string' ||
        typeof dob !== 'string' ||
        !isoDateRegex.test(dob)
      ) {
        return badRequest(res, 'Invalid user payload');
      }

      const users = await readUsers();
      const userIndex = users.findIndex((u) => u.id === id);

      if (userIndex === -1) {
        return notFound(res, 'User not found');
      }

      const updatedUser: User = { id, name, dob };
      users[userIndex] = updatedUser;
      await writeUsers(users);

      return res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Update user error:', error);
      return serverError(res, 'Failed to update user.');
    }
  }
);
/**
 * DELETE /api/users/:id - Deletes a user by ID.
 * @route DELETE /api/users/:id
 * @description Delete a single user by their ID
 * @param req - Express request object containing user ID in params
 * @param res - Express response object
 * @returns 204 if Successfully delete user
 * @returns {{ error: string }} badRequest - 400 - Invalid ID
 * @returns {{ error: string }} notFound - 404 - User not found
 * @returns {{ error: string }} serverError - 500 - Failed to update user
 */
router.delete(
  '/:id',
  async (req: Request, res: Response<{ error: string } | void>) => {
    try {
      const id = parseUserId(req.params.id);
      if (id === null) {
        return badRequest(res, 'Invalid user ID');
      }
      const users = await readUsers();
      const index = users.findIndex((u) => u.id === id);
      if (index === -1) {
        return notFound(res, 'User not found');
      }

      users.splice(index, 1);
      await writeUsers(users);

      return res.status(204).send();
    } catch (error) {
      console.error('Delete user error:', error);
      return serverError(res, 'Failed to delete user');
    }
  }
);
export default router;
