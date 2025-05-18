import { parseUserId } from '../../utils/parseUserId';
import { badRequest } from '../../utils/errorResponse';
import type { Response } from 'express';

jest.mock('../../utils/errorResponse', () => ({
  badRequest: jest.fn(),
}));

const mockResponse = () => {
  return {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as Response;
};

describe('parseUserId', () => {
  let res: Response;

  beforeEach(() => {
    res = mockResponse();
    jest.clearAllMocks();
  });

  it('should parse a valid numeric string ID', () => {
    const result = parseUserId('42', res);
    expect(result).toBe(42);
  });

  it('should trim whitespace and parse ID', () => {
    const result = parseUserId('  7 ', res);
    expect(result).toBe(7);
  });

  it('should call badRequest and throw error if ID is missing', () => {
    expect(() => parseUserId('', res)).toThrow('Invalid user ID');
    expect(badRequest).toHaveBeenCalledWith(res, 'User ID is required');
  });

  it('should call badRequest and throw error if ID is not a number', () => {
    expect(() => parseUserId('abc', res)).toThrow('Invalid user ID');
    expect(badRequest).toHaveBeenCalledWith(
      res,
      'User ID must be a valid non-negative integer',
    );
  });

  it('should call badRequest and throw error if ID is negative', () => {
    expect(() => parseUserId('-5', res)).toThrow('Invalid user ID');
    expect(badRequest).toHaveBeenCalledWith(
      res,
      'User ID must be a valid non-negative integer',
    );
  });

  it('should call badRequest and throw error if ID is a float', () => {
    expect(() => parseUserId('3.14', res)).toThrow('Invalid user ID');
    expect(badRequest).toHaveBeenCalledWith(
      res,
      'User ID must be a valid non-negative integer',
    );
  });
});
