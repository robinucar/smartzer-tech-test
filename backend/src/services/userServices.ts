import { prisma } from '../utils/prisma';
import type { Prisma } from '../generated/client';

/**
 * Fetch all users.
 */
export const getAllUsers = () => prisma.user.findMany();

/**
 * Fetch a user by their ID.
 */
export const getUserById = (id: number) =>
  prisma.user.findUnique({ where: { id } });

/**
 * Create a new user.
 */
export const createUser = (data: Prisma.UserCreateInput) =>
  prisma.user.create({ data });

/**
 * Update an existing user by ID.
 */
export const updateUser = (id: number, data: Prisma.UserUpdateInput) =>
  prisma.user.update({ where: { id }, data });

/**
 * Delete a user by ID.
 */
export const deleteUser = (id: number) => prisma.user.delete({ where: { id } });
