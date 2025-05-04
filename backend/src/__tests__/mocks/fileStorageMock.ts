/// <reference types="jest" />

/**
 * In-memory mock user data used by read and write mocks.
 * Shared across test cases.
 */
export const mockUsers = [{ id: 1, name: 'Test User', dob: '1990-01-01' }];

/**
 * Resets the mockUsers array to its initial state.
 * This should be called before each test to ensure isolation.
 */
export const resetMockUsers = (): void => {
  mockUsers.length = 0;
  mockUsers.push({ id: 1, name: 'Test User', dob: '1990-01-01' });
};

/**
 * Mock implementation of readUsers.
 * Simulates reading users from a file by resolving the in-memory array.
 */
export const mockReadUsers = jest.fn(() => Promise.resolve(mockUsers));

/**
 * Mock implementation of writeUsers.
 * Simulates writing to a file by replacing the in-memory mockUsers array.
 *
 * @param users - The updated list of users to store.
 */
export const mockWriteUsers = jest.fn((users) => {
  mockUsers.length = 0;
  mockUsers.push(...users);
  return Promise.resolve();
});

// Override the actual fileStorage methods with mocks
jest.mock('../../utils/fileStorage', () => ({
  readUsers: mockReadUsers,
  writeUsers: mockWriteUsers,
}));
