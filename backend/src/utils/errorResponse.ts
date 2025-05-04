import { Response } from 'express';

/**
 * Sends a 400 Bad Request error.
 * @param res - Express Response object
 * @param message - Error message to return
 * @returns The response with status 400
 */
export const badRequest = (res: Response, message: string): Response =>
  res.status(400).json({ error: message });

/**
 * Sends a 404 Not Found error.
 * @param res - Express Response object
 * @param message - Error message to return
 * @returns The response with status 404
 */
export const notFound = (res: Response, message: string): Response =>
  res.status(404).json({ error: message });

/**
 * Sends a 500 Internal Server Error.
 * @param res - Express Response object
 * @param message - Error message to return
 * @returns The response with status 500
 */
export const serverError = (res: Response, message: string): Response =>
  res.status(500).json({ error: message });
