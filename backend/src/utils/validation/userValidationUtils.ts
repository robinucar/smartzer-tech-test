import { UserPayload } from '@shared-types';
import { prisma } from '../prisma';
import { patterns } from './regexPatterns';

/**
 * Checks whether an email is already associated with an existing user.
 * Optionally excludes a user by ID (used during updates).
 *
 * @param email - The email address to check (should be lowercase)
 * @param excludeId - Optional user ID to exclude from the uniqueness check
 * @returns True if another user already uses the email, false otherwise
 */
export const emailAlreadyExists = async (
  email: string,
  excludeId?: number,
): Promise<boolean> => {
  const existing = await prisma.user.findUnique({ where: { email } });
  return Boolean(existing && existing.id !== excludeId);
};

/**
 * Normalizes raw user input for database insertion.
 * - Converts email to lowercase
 * - Parses `dob` from string to Date
 *
 * @param payload - Raw UserPayload from the client
 * @returns A normalized version of the user payload
 */
export const normalizeUserPayload = (payload: UserPayload) => ({
  ...payload,
  email: payload.email.toLowerCase(),
  dob: new Date(payload.dob),
});

/**
 * Validates whether the given object structurally matches the expected UserPayload shape.
 *
 * @param input - Unknown input (typically from `req.body`)
 * @returns True if input is structurally a valid UserPayload, false otherwise
 */
export const validateUserPayloadShape = (
  input: unknown,
): input is UserPayload => {
  if (typeof input !== 'object' || input === null) return false;

  const b = input as Partial<UserPayload>;

  return (
    typeof b.firstName === 'string' &&
    typeof b.lastName === 'string' &&
    typeof b.email === 'string' &&
    patterns.email.test(b.email) &&
    typeof b.dob === 'string' &&
    patterns.isoDate.test(b.dob) &&
    typeof b.imageUrl === 'string' &&
    typeof b.acceptedTerms === 'boolean' &&
    (b.bio === undefined || typeof b.bio === 'string')
  );
};
