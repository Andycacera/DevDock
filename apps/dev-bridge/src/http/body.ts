import { BridgeError } from '../errors';

/**
 * Reads a JSON object body.
 *
 * Express 5 leaves `req.body` as `undefined` when no parser matched, so the
 * guard is required before trusting the shape.
 */
export function readBody<T extends object>(body: unknown): T {
  if (body === undefined || body === null || typeof body !== 'object' || Array.isArray(body)) {
    throw new BridgeError('VALIDATION_FAILED', 'Request body must be a JSON object', 400);
  }
  return body as T;
}
