import { prisma } from '../utils/prisma';
import type { Prisma } from '../generated/client';

/**
 * Get paginated, optionally filtered users.
 * Supports server-side pagination and search.
 */
export const getAllUsers = ({
  page = 1,
  limit = 10,
  q = '',
}: {
  page?: number;
  limit?: number;
  q?: string;
}) => {
  const skip = (page - 1) * limit;

  return prisma.user.findMany({
    where: {
      OR: [
        { firstName: { contains: q, mode: 'insensitive' } },
        { lastName: { contains: q, mode: 'insensitive' } },
        { email: { contains: q, mode: 'insensitive' } },
      ],
    },
    skip,
    take: limit,
    orderBy: { firstName: 'asc' },
  });
};

/**
 * Count total number of users matching optional search query.
 * Useful for pagination metadata.
 */
export const getUserCount = (q = '') => {
  return prisma.user.count({
    where: {
      OR: [
        { firstName: { contains: q, mode: 'insensitive' } },
        { lastName: { contains: q, mode: 'insensitive' } },
        { email: { contains: q, mode: 'insensitive' } },
      ],
    },
  });
};

/**
 * Fetch a user by their ID.
 */
export const getUserById = (id: number) => {
  return prisma.user.findUnique({
    where: { id },
  });
};

/**
 * Create a new user.
 */
export const createUser = (data: Prisma.UserCreateInput) => {
  return prisma.user.create({
    data,
  });
};

/**
 * Update an existing user by ID.
 */
export const updateUser = (id: number, data: Prisma.UserUpdateInput) => {
  return prisma.user.update({
    where: { id },
    data,
  });
};

/**
 * Delete a user by ID.
 */
export const deleteUser = (id: number) => {
  return prisma.user.delete({
    where: { id },
  });
};
