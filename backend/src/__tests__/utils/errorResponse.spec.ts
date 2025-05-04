import { badRequest, notFound, serverError } from '../../utils/errorResponse';
import { Response } from 'express';

describe('errorResponse utilities', () => {
  let mockJson: jest.Mock;
  let mockStatus: jest.Mock;
  let res: Response;

  beforeEach(() => {
    mockJson = jest.fn();
    mockStatus = jest.fn().mockReturnValue({ json: mockJson });

    res = {
      status: mockStatus,
    } as unknown as Response;
  });

  it('should send 400 response with error message', () => {
    badRequest(res, 'Invalid input');
    expect(mockStatus).toHaveBeenCalledWith(400);
    expect(mockJson).toHaveBeenCalledWith({ error: 'Invalid input' });
  });

  it('should send 404 response with error message', () => {
    notFound(res, 'User not found');
    expect(mockStatus).toHaveBeenCalledWith(404);
    expect(mockJson).toHaveBeenCalledWith({ error: 'User not found' });
  });

  it('should send 500 response with error message', () => {
    serverError(res, 'Something went wrong');
    expect(mockStatus).toHaveBeenCalledWith(500);
    expect(mockJson).toHaveBeenCalledWith({ error: 'Something went wrong' });
  });
});
