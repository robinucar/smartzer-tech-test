import {
  isValidUserPayload,
  buildUserFromBody,
} from '../../utils/payloadHandling';

describe('userUtils', () => {
  describe('isValidUserPayload', () => {
    const validPayload = {
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      dob: '1990-01-01',
      imageUrl: 'https://example.com/image.jpg',
      acceptedTerms: true,
    };

    it('should return true for valid payload without bio', () => {
      expect(isValidUserPayload(validPayload)).toBe(true);
    });

    it('should return true for valid payload with bio', () => {
      expect(isValidUserPayload({ ...validPayload, bio: 'Bio text' })).toBe(
        true
      );
    });

    it('should return false for invalid email', () => {
      expect(isValidUserPayload({ ...validPayload, email: 'invalid' })).toBe(
        false
      );
    });

    it('should return false for invalid dob', () => {
      expect(isValidUserPayload({ ...validPayload, dob: '01-01-1990' })).toBe(
        false
      );
    });

    it('should return false for bio of wrong type', () => {
      expect(isValidUserPayload({ ...validPayload, bio: 123 })).toBe(false);
    });
  });

  describe('buildUserFromBody', () => {
    const payload = {
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      dob: '1990-01-01',
      imageUrl: 'https://example.com/image.jpg',
      acceptedTerms: true,
    };

    it('should construct a User object without bio', () => {
      const user = buildUserFromBody(1, payload);
      expect(user).toEqual({ id: 1, ...payload, bio: undefined });
    });

    it('should construct a User object with bio', () => {
      const user = buildUserFromBody(2, { ...payload, bio: 'Hello' });
      expect(user).toEqual({ id: 2, ...payload, bio: 'Hello' });
    });
  });
});
