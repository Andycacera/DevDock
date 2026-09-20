import type { DevDockAdapter } from '@devdock/core';
import { FIXTURE_PROXY_STATUS } from './fixtures/proxy';
import { FIXTURE_ROUTES } from './fixtures/routes';
import { createFixtureProxyController } from './fixture-proxy-controller';
import { createFixtureSource } from './fixture-source';
import { createInMemoryRouteRepository } from './in-memory-route-repository';

/**
 * In-process `DevDockAdapter` backed by fixtures.
 *
 * No transport and no shell: it is the development fallback for the UI and the
 * reusable mock for tests.
 */
export function createMockAdapter(): DevDockAdapter {
  const routes = createInMemoryRouteRepository(FIXTURE_ROUTES);
  const services = createFixtureSource(() => routes.snapshot());
  const proxy = createFixtureProxyController(FIXTURE_PROXY_STATUS);

  return {
    scanPorts: () => services.scan(),
    getRoutes: () => routes.list(),
    createRoute: (input) => routes.create(input),
    updateRoute: (id, patch) => routes.update(id, patch),
    deleteRoute: (id) => routes.delete(id),
    getProxyStatus: () => proxy.status(),
    reloadProxy: () => proxy.reload(),
    openRoute: async () => {
      // No-op: the mock has no browser to open.
    }
  };
}
