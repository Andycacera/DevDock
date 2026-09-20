/** Reason a route failed validation. */
export type ValidationCode =
  | 'RESERVED_DOMAIN'
  | 'PUBLIC_TLD'
  | 'INVALID_LABEL'
  | 'DUPLICATE_DOMAIN'
  | 'INVALID_HOST'
  | 'INVALID_PORT'
  | 'TARGET_UNREACHABLE';

/** Codes that block persisting a route. `TARGET_UNREACHABLE` only warns. */
export const BLOCKING_CODES: readonly ValidationCode[] = [
  'RESERVED_DOMAIN',
  'PUBLIC_TLD',
  'INVALID_LABEL',
  'DUPLICATE_DOMAIN',
  'INVALID_HOST',
  'INVALID_PORT'
];

export interface ValidationIssue {
  code: ValidationCode;
  message: string;
  blocksSave: boolean;
}

export interface ValidationResult {
  valid: boolean;
  issues: ValidationIssue[];
}

export function isBlocking(code: ValidationCode): boolean {
  return BLOCKING_CODES.includes(code);
}
