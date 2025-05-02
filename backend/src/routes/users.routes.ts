import { Router, Request, Response } from 'express';
import { User } from '../types/types';
import { readUsers, writeUsers } from '../utils/fileStorage';

const router = Router();
const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;

router.get('/', async (_req: Request, res: Response<User[] | { error: string }>) => {
  try {
    const users = await readUsers();
    res.status(200).json(users);
  } catch {
    res.status(500).json({ error: 'Failed to read users' });
  }
});

router.post('/', async (req: Request, res: Response<User | { error: string }>) => {
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
  return
});

export default router;
