import { formatDate } from '../../utils/dateUtils';

describe('formatDate', () => {
  it('returns YYYY-MM-DD for a full ISO string', () => {
    expect(formatDate('1990-01-01T00:00:00.000Z')).toBe('1990-01-01');
  });

  it('returns correct format for any ISO-like string', () => {
    expect(formatDate('2025-05-18T12:34:56.789Z')).toBe('2025-05-18');
  });

  it('returns full string if exactly 10 chars', () => {
    expect(formatDate('2024-01-30')).toBe('2024-01-30');
  });
});
