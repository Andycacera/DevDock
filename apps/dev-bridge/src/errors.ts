import type { DevDockErrorCode } from '@devdock/shared';

/** Error carried across the HTTP boundary as `{ error: { code, message } }`. */
export class BridgeError extends Error {
  readonly code: DevDockErrorCode;
  readonly status: number;
  readonly details: string[];

  constructor(code: DevDockErrorCode, message: string, status = 400, details: string[] = []) {
    super(message);
    this.name = 'BridgeError';
    this.code = code;
    this.status = status;
    this.details = details;
  }
}

export function validationError(messages: string[]): BridgeError {
  return new BridgeError('VALIDATION_FAILED', 'Route validation failed', 400, messages);
}

export function notFound(id: string): BridgeError {
  return new BridgeError('ROUTE_NOT_FOUND', `Route "${id}" not found`, 404);
}
