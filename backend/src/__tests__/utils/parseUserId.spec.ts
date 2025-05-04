import { parseUserId } from '../../utils/parseUserId';

describe('parseUserId', () => {
  it('should return a number if valid', () => {
    expect(parseUserId('123')).toBe(123);
  });

  it('should return null for invalid input', () => {
    expect(parseUserId('abc')).toBeNull();
    expect(parseUserId('')).toBeNull();
    expect(parseUserId('12.34')).toBe(12.34);
  });
});
