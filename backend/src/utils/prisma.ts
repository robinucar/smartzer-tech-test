import { PrismaClient } from '../generated/client';

/**
 * A single instance of PrismaClient used throughout the backend.
 */
export const prisma = new PrismaClient();
