import { User } from '@shared-types';
import { BASE_URL } from '../config';

export interface UserListResponse {
  users: User[];
  total: number;
  page: number;
  totalPages: number;
  q: string;
}

interface GetUsersParams {
  page?: number;
  limit?: number;
  q?: string;
}

export const getUsers = async ({
  page = 1,
  limit = 10,
  q = '',
}: GetUsersParams): Promise<UserListResponse> => {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    q,
  });

  const res = await fetch(`${BASE_URL}/users?${params.toString()}`);

  if (!res.ok) {
    throw new Error('Failed to fetch users');
  }

  return res.json();
};

export const createUser = async (userData: Partial<User>): Promise<User> => {
  const res = await fetch(`${BASE_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!res.ok) {
    throw new Error('Failed to create user');
  }

  return res.json();
};

export const updateUser = async (
  id: string,
  userData: Partial<User>,
): Promise<User> => {
  const res = await fetch(`${BASE_URL}/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!res.ok) {
    throw new Error(`Failed to update user with id ${id}`);
  }

  return res.json();
};

export const deleteUser = async (id: string): Promise<any> => {
  const res = await fetch(`${BASE_URL}/users/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error(`Failed to delete user with id ${id}`);
  }

  if (res.status !== 204) {
    try {
      return await res.json();
    } catch {
      return undefined;
    }
  }

  return undefined;
};
