/**
 * Unified error codes used by every adapter and by dev-bridge responses.
 *
 * The UI handles errors uniformly: any transport failure becomes a
 * `DevDockError` carrying one of these codes.
 */
export type DevDockErrorCode =
  | 'SCAN_FAILED'
  | 'ROUTES_FETCH_FAILED'
  | 'ROUTE_CREATE_FAILED'
  | 'ROUTE_UPDATE_FAILED'
  | 'ROUTE_DELETE_FAILED'
  | 'ROUTE_NOT_FOUND'
  | 'NOT_FOUND'
  | 'PROXY_STATUS_FAILED'
  | 'PROXY_RELOAD_FAILED'
  | 'OPEN_ROUTE_FAILED'
  | 'VALIDATION_FAILED'
  | 'PERMISSION_DENIED'
  | 'COMMAND_FAILED'
  | 'NETWORK_ERROR'
  | 'INVALID_RESPONSE'
  | 'NO_SHELL_IN_PRODUCTION'
  | 'UNKNOWN';

/**
 * Error type shared by all adapters.
 *
 * Adapters translate transport-specific failures into this type so the UI
 * never has to know whether it is talking to HTTP, IPC or fixtures.
 */
export class DevDockError extends Error {
  readonly code: DevDockErrorCode;
  readonly details: string[];

  constructor(code: DevDockErrorCode, message?: string, details: string[] = []) {
    super(message ?? code);
    this.name = 'DevDockError';
    this.code = code;
    this.details = details;
  }
}
