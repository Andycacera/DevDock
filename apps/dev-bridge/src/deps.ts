import type {
  ProxyController,
  RouteMapping,
  RouteRepository,
  ServiceSource
} from '@devdock/core';
import { FIXTURE_PROXY_STATUS } from './fixtures/proxy';
import { FIXTURE_ROUTES } from './fixtures/routes';
import { createFixtureProxyController } from './proxy/fixture-proxy-controller';
import { createInMemoryRouteRepository } from './repositories/in-memory-route-repository';
import { createFixtureSource } from './sources/fixture-source';

/** Everything the HTTP layer needs, injected so the app stays testable. */
export interface BridgeDeps {
  services: ServiceSource;
  routes: RouteRepository;
  proxy: ProxyController;
  openRoute: (route: RouteMapping) => Promise<void> | void;
}

/** Wires fixtures behind the ports. Swap these for OS-backed sources later. */
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
