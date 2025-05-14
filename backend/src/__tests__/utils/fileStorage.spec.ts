import { readUsers, writeUsers } from '../../utils/fileStorage';
import { promises as fs } from 'fs';
import { User } from '@shared-types';

jest.mock('fs', () => ({
  promises: {
    readFile: jest.fn(),
    writeFile: jest.fn(),
    mkdir: jest.fn(),
  },
}));

const mockUsers: User[] = [
  {
    id: 1,
    firstName: 'Mock',
    lastName: 'User',
    email: 'mock@example.com',
    dob: '1995-06-21',
    imageUrl: 'https://example.com/avatar.jpg',
    acceptedTerms: true,
    bio: 'Mock bio',
  },
];

describe('fileStorage utility', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('reads users from file', async () => {
    (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockUsers));
    const users = await readUsers();
    expect(fs.readFile).toHaveBeenCalledWith(
      expect.stringContaining('users.json'),
      'utf-8',
    );
    expect(users).toEqual(mockUsers);
  });

  it('writes users to file', async () => {
    await writeUsers(mockUsers);
    expect(fs.mkdir).toHaveBeenCalledWith(expect.any(String), {
      recursive: true,
    });
    expect(fs.writeFile).toHaveBeenCalledWith(
      expect.stringContaining('users.json'),
      JSON.stringify(mockUsers, null, 2),
    );
  });

  it('throws error if readFile fails with non-ENOENT error', async () => {
    (fs.readFile as jest.Mock).mockRejectedValue(new Error('Read failed'));
    await expect(readUsers()).rejects.toThrow('Read failed');
  });

  it('creates users.json if it does not exist (ENOENT)', async () => {
    const enoentError = new Error('File not found') as NodeJS.ErrnoException;
    enoentError.code = 'ENOENT';
    (fs.readFile as jest.Mock).mockRejectedValue(enoentError);

    const users = await readUsers();

    expect(fs.readFile).toHaveBeenCalled();
    expect(fs.writeFile).toHaveBeenCalledWith(
      expect.stringContaining('users.json'),
      JSON.stringify([], null, 2),
    );
    expect(users).toEqual([]);
  });

  it('throws error if writeFile fails', async () => {
    (fs.writeFile as jest.Mock).mockRejectedValue(new Error('Write failed'));
    await expect(writeUsers(mockUsers)).rejects.toThrow('Write failed');
  });
});
