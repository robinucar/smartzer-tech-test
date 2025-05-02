import { Router, Request, Response } from 'express';

const router = Router();

type User = {
  id: number;
  name: string;
  dob: string;
};

const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/; // it is just for validate the date format YYYY-MM-DD


router.get('/', (_req: Request, res: Response<User[]>) => {
  const users: User[] = [{ id: 1, name: 'John Doe', dob: '1988-03-29' }];
  res.status(200).json(users);
});

router.post('/', (req: Request, res: Response<User | { error: string }>) => {
  try {
    const body = req.body;

    if (
      typeof body !== 'object' ||
      body === null ||
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

    return res.status(201).json(newUser);
  } catch (error) {
    console.error('Unexpected error in POST /api/users:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
