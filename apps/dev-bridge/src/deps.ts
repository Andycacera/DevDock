import type {
  ProxyController,
  RouteMapping,
  RouteRepository,
  ServiceSource
} from '@devdock/core';
import {
  FIXTURE_PROXY_STATUS,
  FIXTURE_ROUTES,
  createFixtureProxyController,
  createFixtureSource,
  createInMemoryRouteRepository
} from '@devdock/mock';

/** Everything the HTTP layer needs, injected so the app stays testable. */
export interface BridgeDeps {
  services: ServiceSource;
  routes: RouteRepository;
  proxy: ProxyController;
  openRoute: (route: RouteMapping) => Promise<void> | void;
}

/** Wires the shared mock package behind the ports. */
export function createDefaultDeps(): BridgeDeps {
  const routes = createInMemoryRouteRepository(FIXTURE_ROUTES);

  return {
    routes,
    services: createFixtureSource(() => routes.snapshot()),
    proxy: createFixtureProxyController(FIXTURE_PROXY_STATUS),
    openRoute: (route) => {
      console.log(
        `[dev-bridge] open route ${route.domain} -> ${route.protocol}://${route.targetHost}:${route.targetPort}`
      );
    }
  };
}
