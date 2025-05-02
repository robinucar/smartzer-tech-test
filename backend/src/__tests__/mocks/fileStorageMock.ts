
/// <reference types="jest" />

export const mockReadUsers = jest.fn().mockResolvedValue([
  { id: 1, name: 'Test User', dob: '1990-01-01' },
]);


export const mockWriteUsers = jest.fn().mockResolvedValue(undefined);

jest.mock('../../utils/fileStorage', () => ({
  readUsers: mockReadUsers,
  writeUsers: mockWriteUsers,
}));
