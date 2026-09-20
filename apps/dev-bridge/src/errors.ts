import { DevDockError } from '@devdock/shared';
import type { DevDockErrorCode } from '@devdock/shared';

/**
 * HTTP-aware error: adds a status code on top of the shared `DevDockError`.
 *
 * Domain/in-memory layers throw plain `DevDockError`; the HTTP layer maps it to
 * a status in the error handler.
 */
export class BridgeError extends DevDockError {
  readonly status: number;

  constructor(code: DevDockErrorCode, message: string, status = 400, details: string[] = []) {
    super(code, message, details);
    this.name = 'BridgeError';
    this.status = status;
  }
}

export function notFound(id: string): BridgeError {
  return new BridgeError('ROUTE_NOT_FOUND', `Route "${id}" not found`, 404);
}
