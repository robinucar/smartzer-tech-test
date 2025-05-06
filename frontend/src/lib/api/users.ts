import { User } from '@shared-types';

export const getUsers = async (): Promise<User[]> => {
  const res = await fetch('http://localhost:3333/api/users');
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
};
