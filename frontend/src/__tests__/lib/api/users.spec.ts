import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from '../../../lib/api/users';
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

    const result = await getUsers();
    expect(Array.isArray(result)).toBe(true);
    expect(result[0].firstName).toBe('Alice');
  });

  it('should throw an error when response is not OK', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

    await expect(getUsers()).rejects.toThrow('Failed to fetch users');
  });
});

describe('createUser', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should create a user when response is OK', async () => {
    const mockUserData: Partial<User> = {
      firstName: 'Bob',
      lastName: 'Jones',
      email: 'bob@example.com',
      acceptedTerms: true,
    };

    const mockResponse = {
      id: 2,
      ...mockUserData,
      dob: '1985-05-01',
      imageUrl: 'https://picsum.photos/id/2/200/200',
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await createUser(mockUserData);
    expect(result).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:3333/api/users',
      expect.objectContaining({
        method: 'POST',
      }),
    );
  });

  it('should throw an error when response is not OK', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

    await expect(createUser({ firstName: 'Fail' })).rejects.toThrow(
      'Failed to create user',
    );
  });
});

describe('updateUser', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should update a user when response is OK', async () => {
    const mockData: Partial<User> = { firstName: 'Updated' };

    const mockResponse: User = {
      id: 1,
      firstName: 'Updated',
      lastName: 'Smith',
      email: 'alice@example.com',
      dob: '1990-01-01',
      imageUrl: 'https://picsum.photos/id/1/200/200',
      acceptedTerms: true,
      bio: 'Frontend engineer',
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = (await updateUser('1', mockData)) as User;
    expect(result.firstName).toBe('Updated');
    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:3333/api/users/1',
      expect.objectContaining({
        method: 'PUT',
      }),
    );
  });

  it('should throw an error when response is not OK', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

    await expect(updateUser('1', { firstName: 'Fail' })).rejects.toThrow(
      'Failed to update user with id 1',
    );
  });
});

describe('deleteUser', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should delete a user and return undefined when status is 204', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      status: 204,
    });

    const result = await deleteUser('1');
    expect(result).toBeUndefined();
    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:3333/api/users/1',
      expect.objectContaining({
        method: 'DELETE',
      }),
    );
  });

  it('should return JSON when deletion response has a body', async () => {
    const responseData = { message: 'User deleted' };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => responseData,
    });

    const result = await deleteUser('2');
    expect(result).toEqual(responseData);
  });

  it('should throw an error when delete response is not OK', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

    await expect(deleteUser('999')).rejects.toThrow(
      'Failed to delete user with id 999',
    );
  });
});
