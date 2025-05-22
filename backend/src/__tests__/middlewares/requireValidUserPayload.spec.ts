import { Request, Response } from 'express';
import { requireValidUserPayload } from '../../middlewares/requireValidUserPayload';
import * as utils from '../../utils/validation/userValidationUtils';
import * as errorResponse from '../../utils/errorResponse';

describe('requireValidUserPayload middleware', () => {
  const mockReq = { body: {} } as Request;
  const mockRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as Response;
  const mockNext = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call next() if payload is valid', () => {
    jest.spyOn(utils, 'validateUserPayloadShape').mockReturnValue(true);

    requireValidUserPayload(mockReq, mockRes, mockNext);

    expect(utils.validateUserPayloadShape).toHaveBeenCalledWith(mockReq.body);
    expect(mockNext).toHaveBeenCalled();
  });

  it('should return 400 if payload is invalid', () => {
    jest.spyOn(utils, 'validateUserPayloadShape').mockReturnValue(false);
    const badRequestSpy = jest.spyOn(errorResponse, 'badRequest');

    requireValidUserPayload(mockReq, mockRes, mockNext);

    expect(utils.validateUserPayloadShape).toHaveBeenCalledWith(mockReq.body);
    expect(badRequestSpy).toHaveBeenCalledWith(
      mockRes,
      'Missing or invalid fields in user payload',
    );
    expect(mockNext).not.toHaveBeenCalled();
  });
});
