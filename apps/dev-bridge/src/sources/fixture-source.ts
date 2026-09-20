import { computeStatus } from '@devdock/core';
import type { DetectedService, RouteMapping, ServiceSource } from '@devdock/core';
import { FIXTURE_SERVICES } from '../fixtures/services';

/**
 * Serves fixture services and derives `hasDomain`/`status` from the current
 * route list using `core`, so the mock behaves like the real source will.
 */
export function createFixtureSource(getRoutes: () => readonly RouteMapping[]): ServiceSource {
  return {
    async scan(): Promise<DetectedService[]> {
      const routes = getRoutes();

      return FIXTURE_SERVICES.map((service) => {
        const route = routes.find(
          (entry) => entry.targetHost === service.host && entry.targetPort === service.port
        );

        const status = computeStatus({
          hasRoute: Boolean(route),
          isReserved: route?.status === 'reserved',
          hasConflict: route?.status === 'conflict',
          targetResponds: route ? route.status === 'active' : null
        });

        return { ...service, hasDomain: Boolean(route), status };
      });
    }
  };
}
