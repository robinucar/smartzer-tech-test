import { Router, Request, Response } from 'express';
import { UserPayload } from '@shared-types';
import { readUsers, writeUsers } from '../utils/fileStorage';
import { badRequest, notFound, serverError } from '../utils/errorResponse';
import { parseUserId } from '../utils/parseUserId';
import {
  isValidUserPayload,
  buildUserFromBody,
} from '../utils/payloadHandling';

const router = Router();

/**
 * @route GET /api/users
 * @description Fetch all users.
 * @returns {User[]} 200 - An array of user objects
 * @returns {{ error: string }} serverError - 500 - Failed to read users
 */
router.get('/', async (_req: Request, res: Response) => {
  try {
    const users = await readUsers();
    const usersWithOptionalFields = users.map((user) => ({
      ...user,
      bio: user.bio ?? undefined,
    }));

    return res.status(200).json(usersWithOptionalFields);
  } catch {
    return serverError(res, 'Failed to read users');
  }
});

/**
 * @route POST /api/users
 * @description Create a new user
 * @param {object} req.body - The user payload
 * @returns {User} 201 - Created user object
 * @returns {{ error: string }} badRequest - 400 - Invalid user payload
 * @returns {{ error: string }} serverError - 500 - Failed to save user
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    const body: UserPayload = req.body;

    if (!isValidUserPayload(body)) {
      return badRequest(res, 'Invalid user payload');
    }

    const users = await readUsers();
    const emailExists = users.some(
      (u) => u.email.toLowerCase() === body.email.toLowerCase()
    );
    if (emailExists) {
      return badRequest(res, 'Email already exists');
    }

    const newId = Math.max(0, ...users.map((u) => u.id)) + 1;
    const newUser = buildUserFromBody(newId, body);

    users.push(newUser);
    await writeUsers(users);

    return res.status(201).json(newUser);
  } catch (error) {
    console.error('Create user error:', error);
    return serverError(res, 'Failed to save user');
  }
});
/**
 * @route GET /api/users/:id
 * @description Fetch a single user by their ID
 * @param {string} req.params.id - The ID of the user to fetch
 * @returns {User} 200 with user if found,
 * @returns {{ error: string }} badRequest - 400 - Invalid ID
 * @returns {{ error: string }} notFound - 404 - User not found
 * @returns {{ error: string }} serverError - 500 - Failed to update user
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseUserId(req.params.id);
    if (id === null) return badRequest(res, 'Invalid user ID');

    const users = await readUsers();
    const user = users.find((u) => u.id === id);
    if (!user) return notFound(res, 'User not found');

    return res.status(200).json({ ...user, bio: user.bio ?? undefined });
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    return serverError(res, 'Failed to fetch user');
  }
});

/**
 * @route PUT /api/users/:id
 * @description Update a user name, date of birth by id
 * @param {object} req - Express request object
 * @returns {User} 200 - Successfully updated user
 * @returns {{ error: string }} badRequest - 400 - Invalid ID or payload
 * @returns {{ error: string }} notFound - 404 - User not found
 * @returns {{ error: string }} serverError - 500 - Failed to update user
 */
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseUserId(req.params.id);
    if (id === null) return badRequest(res, 'Invalid user ID');

    const body = req.body;
    if (!isValidUserPayload(body)) {
      return badRequest(res, 'Invalid user payload');
    }

    const users = await readUsers();
    const userIndex = users.findIndex((u) => u.id === id);
    if (userIndex === -1) return notFound(res, 'User not found');

    const emailExists = users.some(
      (u) => u.id !== id && u.email.toLowerCase() === body.email.toLowerCase()
    );
    if (emailExists) {
      return badRequest(res, 'Email already exists');
    }

    const updatedUser = buildUserFromBody(id, body);
    users[userIndex] = updatedUser;
    await writeUsers(users);

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Update user error:', error);
    return serverError(res, 'Failed to update user');
  }
});

/**
 * DELETE /api/users/:id
 * @route DELETE /api/users/:id
 * @description Delete a single user by their ID
 * @param req - Express request object containing user ID in params
 * @param res - Express response object
 * @returns 204 if Successfully delete user
 * @returns {{ error: string }} badRequest - 400 - Invalid ID
 * @returns {{ error: string }} notFound - 404 - User not found
 * @returns {{ error: string }} serverError - 500 - Failed to update user
 */
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseUserId(req.params.id);
    if (id === null) return badRequest(res, 'Invalid user ID');

    const users = await readUsers();
    const index = users.findIndex((u) => u.id === id);
    if (index === -1) return notFound(res, 'User not found');

    users.splice(index, 1);
    await writeUsers(users);

    return res.status(204).end();
  } catch (error) {
    console.error('Delete user error:', error);
    return serverError(res, 'Failed to delete user');
  }
});

export default router;
