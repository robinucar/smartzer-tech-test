import { User, UserPayload } from '../types/types';

/**
 * Regular expression to validate ISO 8601 date strings in the format YYYY-MM-DD.
 *
 * Used to ensure that the `dob` (date of birth) field matches the expected format.
 * Example: '1990-01-01' is valid, '01/01/1990' is not.
 */
const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Regular expression to validate a basic email format.
 *
 * Used to check that the `email` field conforms to a standard email structure.
 * Example: 'user@example.com' is valid.
 */
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/**
 * Validates the structure of a user payload.
 */
export const isValidUserPayload = (body: unknown): body is UserPayload => {
  if (typeof body !== 'object' || body === null) return false;

  const b = body as Partial<UserPayload>;

  return (
    typeof b.firstName === 'string' &&
    typeof b.lastName === 'string' &&
    typeof b.email === 'string' &&
    emailRegex.test(b.email) &&
    typeof b.dob === 'string' &&
    isoDateRegex.test(b.dob) &&
    typeof b.imageUrl === 'string' &&
    typeof b.acceptedTerms === 'boolean' &&
    (b.bio === undefined || typeof b.bio === 'string')
  );
};

/**
 * Builds a complete User object from request body and id.
 */
export const buildUserFromBody = (id: number, body: UserPayload): User => ({
  id,
  firstName: body.firstName,
  lastName: body.lastName,
  email: body.email,
  dob: body.dob,
  imageUrl: body.imageUrl,
  acceptedTerms: body.acceptedTerms,
  bio: typeof body.bio === 'string' ? body.bio : undefined,
});
