import { getUsers } from '../../../lib/api/users';

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

    const result = await getUsers();

    expect(result).toHaveLength(1);
    expect(result[0].firstName).toBe('Alice');
    expect(result[0].acceptedTerms).toBe(true);
  });

  it('should throw an error when response is not OK', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

    await expect(getUsers()).rejects.toThrow('Failed to fetch users');
  });
});
