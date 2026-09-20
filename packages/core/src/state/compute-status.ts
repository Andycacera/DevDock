import type { RouteStatus } from '../domain/common';

export interface StatusInput {
  /** A route exists for this target. */
  hasRoute: boolean;
  /** Domain is reserved or collides with a public TLD. */
  isReserved: boolean;
  /** Duplicate domain or invalid config. */
  hasConflict: boolean;
  /** Target responds. `null` means unknown (not checked yet). */
  targetResponds: boolean | null;
}

/**
 * Computes the user-visible state.
 *
 * Precedence: reserved -> conflict -> unassigned -> active/inactive.
 */
export function computeStatus(input: StatusInput): RouteStatus {
  if (input.isReserved) return 'reserved';
  if (input.hasConflict) return 'conflict';
  if (!input.hasRoute) return 'unassigned';
  return input.targetResponds ? 'active' : 'inactive';
}
