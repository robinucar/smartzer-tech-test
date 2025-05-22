import {
  validateUserPayloadShape,
  normalizeUserPayload,
  emailAlreadyExists,
} from '../../../utils/validation/userValidationUtils';

import { prisma } from '../../mocks/prismaMock';
import { UserPayload } from '@shared-types';
import { userWithBio } from '../../mocks/userMocks';

jest.mock('../../../utils/prisma', () => ({
  prisma: require('../../mocks/prismaMock').prisma,
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe('userValidationUtils', () => {
  describe('validateUserPayloadShape', () => {
    it('returns true for valid payload', () => {
      const valid: UserPayload = {
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane@example.com',
        dob: '1990-01-01',
        imageUrl: 'https://picsum.photos/200',
        acceptedTerms: true,
        bio: 'Hello there',
      };

      expect(validateUserPayloadShape(valid)).toBe(true);
    });

    it('returns true when optional bio is omitted', () => {
      const validWithoutBio: Omit<UserPayload, 'bio'> = {
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane@example.com',
        dob: '1990-01-01',
        imageUrl: 'https://picsum.photos/200',
        acceptedTerms: true,
      };

      expect(validateUserPayloadShape(validWithoutBio)).toBe(true);
    });

    it('returns false for missing required fields', () => {
      const invalid = {
        firstName: 'John',
        email: 'john@example.com',
      };
      expect(validateUserPayloadShape(invalid)).toBe(false);
    });

    it('returns false for incorrect types', () => {
      const invalid = {
        firstName: 'John',
        lastName: 'Doe',
        email: 123,
        dob: 'not-a-date',
        imageUrl: 'http://example.com',
        acceptedTerms: 'yes',
      };
      expect(validateUserPayloadShape(invalid)).toBe(false);
    });
  });

  describe('normalizeUserPayload', () => {
    it('converts email to lowercase and parses dob', () => {
      const raw: UserPayload = {
        firstName: 'Alice',
        lastName: 'Smith',
        email: 'Alice@Example.Com',
        dob: '2000-01-01',
        imageUrl: 'https://image.com',
        acceptedTerms: true,
        bio: 'hello',
      };

      const result = normalizeUserPayload(raw);

      expect(result.email).toBe('alice@example.com');
      expect(result.dob).toBeInstanceOf(Date);
      expect(result.dob.toISOString()).toContain('2000-01-01');
    });
  });

  describe('emailAlreadyExists', () => {
    const mockFindUnique = prisma.user.findUnique as jest.Mock;

    it('returns false if no user found', async () => {
      mockFindUnique.mockResolvedValue(null);
      const result = await emailAlreadyExists('noone@example.com');
      expect(result).toBe(false);
    });

    it('returns true if user exists with a different ID', async () => {
      mockFindUnique.mockResolvedValue({ ...userWithBio, id: 2 });
      const result = await emailAlreadyExists(userWithBio.email, 1);
      expect(result).toBe(true);
    });

    it('returns false if user exists with same ID (self)', async () => {
      mockFindUnique.mockResolvedValue({ ...userWithBio, id: 1 });
      const result = await emailAlreadyExists(userWithBio.email, 1);
      expect(result).toBe(false);
    });
  });
});
