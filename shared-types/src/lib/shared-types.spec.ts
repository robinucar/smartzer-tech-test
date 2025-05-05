import { User } from './shared-types.js';

describe('User type', () => {
  it('should have required fields', () => {
    const mockUser: User = {
      id: 1,
      firstName: 'Alice',
      lastName: 'Smith',
      email: 'alice@example.com',
      dob: '1990-01-01',
      imageUrl: 'https://picsum.photos/200',
      acceptedTerms: true,
    };
    expect(mockUser.firstName).toBe('Alice');
  });
});
