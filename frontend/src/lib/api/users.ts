import { User } from '@shared-types';
import { BASE_URL } from '../config';

export const getUsers = async (): Promise<User[]> => {
  const res = await fetch(`${BASE_URL}/users`);

  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
};

export const updateUser = async (id: string, userData: Partial<User>) => {
  const res = await fetch(`${BASE_URL}/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!res.ok) throw new Error(`Failed to update user with id ${id}`);
  return res.json();
};
