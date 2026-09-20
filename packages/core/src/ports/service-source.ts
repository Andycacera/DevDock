import type { DetectedService } from '../domain/service';

/**
 * Source of detected services.
 *
 * dev-bridge implements this twice: `fixtureSource` now, `osSource` later.
 * The HTTP API above it never changes, so the UI never notices the swap.
 */
export interface ServiceSource {
  scan(): Promise<DetectedService[]>;
}
