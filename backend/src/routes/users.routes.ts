import { Router, Request, Response } from 'express';
import { badRequest, notFound, serverError } from '../utils/errorResponse';
import { parseUserId } from '../utils/parseUserId';
import {
  emailAlreadyExists,
  normalizeUserPayload,
} from '../utils/validation/userValidationUtils';
import { requireValidUserPayload } from '../middlewares/requireValidUserPayload';

import {
  getAllUsers,
  getUserCount,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../services/userServices';

const router = Router();

/**
 * @route GET /api/users
 * @description Fetch all users with pagination and search
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(
      Math.max(1, parseInt(req.query.limit as string) || 10),
      100,
    );
    const q = (req.query.q as string) || '';

    const [users, total] = await Promise.all([
      getAllUsers({ page, limit, q }),
      getUserCount(q),
    ]);

    return res.status(200).json({
      users,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      q, // ✅ Echo search query (optional)
    });
  } catch (error) {
    console.error('Fetch users error:', error);
    return serverError(res, 'Failed to fetch users');
  }
});

/**
 * @route POST /api/users
 * @description Create a new user
 */
router.post(
  '/',
  requireValidUserPayload,
  async (req: Request, res: Response) => {
    try {
      const input = normalizeUserPayload(req.body);
      const emailConflict = await emailAlreadyExists(input.email);
      if (emailConflict) return badRequest(res, 'Email already exists');

      const newUser = await createUser(input);
      return res.status(201).json(newUser);
    } catch (error) {
      console.error('Create user error:', error);
      return serverError(res, 'Failed to save user');
    }
  },
);

/**
 * @route GET /api/users/:id
 * @description Fetch a single user by their ID
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseUserId(req.params.id, res);
    const user = await getUserById(id);
    if (!user) return notFound(res, 'User not found');
    return res.status(200).json(user);
  } catch (error) {
    console.error('Fetch user by ID error:', error);
    return serverError(res, 'Failed to fetch user');
  }
});

/**
 * @route PUT /api/users/:id
 * @description Update a user by ID
 */
router.put(
  '/:id',
  requireValidUserPayload,
  async (req: Request, res: Response) => {
    try {
      const id = parseUserId(req.params.id, res);

      const existingUser = await getUserById(id);
      if (!existingUser) return notFound(res, 'User not found');

      const input = normalizeUserPayload(req.body);
      const emailConflict = await emailAlreadyExists(input.email, id);
      if (emailConflict) return badRequest(res, 'Email already exists');

      const updatedUser = await updateUser(id, input);
      return res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Update user error:', error);
      return serverError(res, 'Failed to update user');
    }
  },
);

/**
 * @route DELETE /api/users/:id
 * @description Delete a single user by their ID
 */
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseUserId(req.params.id, res);
    await deleteUser(id);
    return res.status(204).end();
  } catch (error) {
    console.error('Delete user error:', error);
    return serverError(res, 'Failed to delete user');
  }
});

export default router;
