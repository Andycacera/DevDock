import type { ErrorRequestHandler } from 'express';
import type { ApiErrorDto } from '@devdock/shared';
import { BridgeError } from '../errors';

function isJsonParseError(error: unknown): boolean {
  return (
    typeof error === 'object' &&
    error !== null &&
    (error as { type?: string }).type === 'entity.parse.failed'
  );
}

function toBridgeError(error: unknown): BridgeError {
  if (error instanceof BridgeError) {
    return error;
  }
  if (isJsonParseError(error)) {
    return new BridgeError('VALIDATION_FAILED', 'Request body must be valid JSON', 400);
  }
  const message = error instanceof Error ? error.message : 'Unexpected error';
  return new BridgeError('UNKNOWN', message, 500);
}

/**
 * Single error boundary: every failure becomes `{ error: { code, message } }`.
 *
 * Express 5 routes rejected promises here automatically, so handlers just throw.
 */
export const errorHandler: ErrorRequestHandler = (error, _req, res, next) => {
  if (res.headersSent) {
    next(error);
    return;
  }

  const bridgeError = toBridgeError(error);
  const body: ApiErrorDto = {
    error: {
      code: bridgeError.code,
      message: bridgeError.message,
      details: bridgeError.details.length > 0 ? bridgeError.details : undefined
    }
  };

  res.status(bridgeError.status).json(body);
};
