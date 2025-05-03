import { readUsers, writeUsers } from '../../utils/fileStorage';
import { promises as fs } from 'fs';
import { User } from '../../types/types';

jest.mock('fs', () => ({
  promises: {
    readFile: jest.fn(),
    writeFile: jest.fn(),
  },
}));

const mockUsers: User[] = [{ id: 1, name: 'Mock User', dob: '1995-06-21' }];

describe('fileStorage utility', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('reads users from file', async () => {
    (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockUsers));
    const users = await readUsers();
    expect(fs.readFile).toHaveBeenCalledWith(
      expect.stringContaining('users.json'),
      'utf-8'
    );
    expect(users).toEqual(mockUsers);
  });

  it('writes users to file', async () => {
    await writeUsers(mockUsers);
    expect(fs.writeFile).toHaveBeenCalledWith(
      expect.stringContaining('users.json'),
      JSON.stringify(mockUsers, null, 2)
    );
  });

  it('throws error if readFile fails', async () => {
    (fs.readFile as jest.Mock).mockRejectedValue(new Error('Read failed'));
    await expect(readUsers()).rejects.toThrow('Read failed');
  });

  it('throws error if writeFile fails', async () => {
    (fs.writeFile as jest.Mock).mockRejectedValue(new Error('Write failed'));
    await expect(writeUsers(mockUsers)).rejects.toThrow('Write failed');
  });
});
