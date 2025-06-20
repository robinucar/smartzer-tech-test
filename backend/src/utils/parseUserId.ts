import { Response } from 'express';
import { badRequest } from './errorResponse';

/**
 * Parses and validates a user ID from a string.
 * Throws a 400 error response if the ID is missing or invalid.
 *
 * @param rawId - The user ID string from request parameters
 * @param res - Express Response object to send the error response
 * @returns The valid parsed user ID as a number
 * @throws Sends a 400 Bad Request response and throws Error if invalid
 */
export const parseUserId = (rawId: string, res: Response): number => {
  const trimmed = rawId.trim();

  if (!trimmed) {
    badRequest(res, 'User ID is required');
    throw new Error('Invalid user ID');
  }

  const id = Number(trimmed);

  if (!Number.isInteger(id) || id < 0) {
    badRequest(res, 'User ID must be a valid non-negative integer');
    throw new Error('Invalid user ID');
  }

  return id;
};
