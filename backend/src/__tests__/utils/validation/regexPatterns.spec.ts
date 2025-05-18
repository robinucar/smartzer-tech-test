import { patterns } from '../../../utils/validation/regexPatterns';

describe('patterns', () => {
  describe('isoDate', () => {
    it('should match valid ISO date format', () => {
      expect(patterns.isoDate.test('2024-12-31')).toBe(true);
    });

    it('should not match invalid date formats', () => {
      expect(patterns.isoDate.test('31-12-2024')).toBe(false);
      expect(patterns.isoDate.test('2024/12/31')).toBe(false);
      expect(patterns.isoDate.test('')).toBe(false);
    });
  });

  describe('email', () => {
    it('should match valid email format', () => {
      expect(patterns.email.test('test@example.com')).toBe(true);
    });

    it('should not match invalid email formats', () => {
      expect(patterns.email.test('not-an-email')).toBe(false);
      expect(patterns.email.test('missing@domain')).toBe(false);
      expect(patterns.email.test('missing.com')).toBe(false);
    });
  });
});
