import type { RequestHandler } from 'express';
import { BridgeError } from '../errors';

/**
 * Catch-all 404.
 *
 * Pathless on purpose: Express 5 removed the bare `'*'` path, and this matches
 * every method and path, including `/`.
 */
export const notFoundHandler: RequestHandler = (req, _res, next) => {
  next(new BridgeError('NOT_FOUND', `No handler for ${req.method} ${req.originalUrl}`, 404));
};
