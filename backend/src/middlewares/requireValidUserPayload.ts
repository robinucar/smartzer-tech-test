import { Request, Response, NextFunction } from 'express';
import { validateUserPayloadShape } from '../utils/validation/userValidationUtils';
import { badRequest } from '../utils/errorResponse';

/**
 * Middleware to ensure that the incoming request body matches the expected `UserPayload` shape.
 *
 * - Validates presence and types of required fields.
 * - Sends a 400 Bad Request with a descriptive message if validation fails.
 * - Proceeds to the next middleware if valid.
 *
 * @param req - Express Request containing the user payload in the body
 * @param res - Express Response used to send an error response if invalid
 * @param next - Express NextFunction to continue request processing
 * @returns void or an early response if validation fails
 */
export const requireValidUserPayload = (
  req: Request,
  res: Response,
  next: NextFunction,
): void | Response => {
  if (!validateUserPayloadShape(req.body)) {
    return badRequest(res, 'Missing or invalid fields in user payload');
  }

  return next();
};
