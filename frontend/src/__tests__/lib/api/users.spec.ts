import { getUsers, updateUser } from '../../../lib/api/users';
import { User } from '@shared-types';

jest.mock('../../../lib/config', () => ({
  BASE_URL: 'http://localhost:3333/api',
}));

global.fetch = jest.fn();

describe('getUsers', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return users when response is OK', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [
        {
          id: 1,
          firstName: 'Alice',
          lastName: 'Smith',
          email: 'alice@example.com',
          dob: '1990-01-01',
          imageUrl: 'https://picsum.photos/id/1/200/200',
          acceptedTerms: true,
          bio: 'Frontend engineer',
        },
      ],
    });

    const result = (await getUsers()) as User[];

    expect(Array.isArray(result)).toBe(true);
    expect(result[0].firstName).toBe('Alice');
    expect(result[0].acceptedTerms).toBe(true);
  });

  it('should throw an error when response is not OK', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

    await expect(getUsers()).rejects.toThrow('Failed to fetch users');
  });
});

describe('updateUser', () => {
  it('should update a user when response is OK', async () => {
    const mockData: Partial<User> = {
      firstName: 'Updated',
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        id: 1,
        firstName: 'Updated',
        lastName: 'Smith',
        email: 'alice@example.com',
        dob: '1990-01-01',
        acceptedTerms: true,
      }),
    });

    const result = (await updateUser('1', mockData)) as User;
    expect(result.firstName).toBe('Updated');
  });
});
