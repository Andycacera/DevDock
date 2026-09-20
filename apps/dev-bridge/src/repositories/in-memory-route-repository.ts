import { validateRoute } from '@devdock/core';
import type { NewRoute, RouteMapping, RoutePatch, RouteRepository } from '@devdock/core';
import { notFound, validationError } from '../errors';

/** `snapshot()` is a sync view used by the fixture source to compute status. */
export interface MutableRouteRepository extends RouteRepository {
  snapshot(): RouteMapping[];
}

function defaultStatus(sourceType: NewRoute['sourceType']): RouteMapping['status'] {
  return sourceType === 'lan' || sourceType === 'vpn' ? 'inactive' : 'active';
}

/**
 * In-memory route store seeded from fixtures.
 *
 * Mirrors the future JSON-backed repository: validate first, never persist an
 * invalid route.
 */
export function createInMemoryRouteRepository(
  seed: readonly RouteMapping[] = []
): MutableRouteRepository {
  const routes: RouteMapping[] = seed.map((route) => ({ ...route }));

  return {
    snapshot() {
      return routes.map((route) => ({ ...route }));
    },

    async list() {
      return routes.map((route) => ({ ...route }));
    },

    async get(id) {
      const route = routes.find((entry) => entry.id === id);
      return route ? { ...route } : undefined;
    },

    async create(input) {
      const result = validateRoute(input, { existingRoutes: routes });
      if (!result.valid) {
        throw validationError(result.issues.map((entry) => entry.message));
      }

      const sourceType = input.sourceType ?? 'local';
      const route: RouteMapping = {
        id: crypto.randomUUID(),
        domain: input.domain.trim().toLowerCase(),
        targetHost: input.targetHost.trim().toLowerCase(),
        targetPort: input.targetPort,
        protocol: input.protocol ?? 'http',
        sourceType,
        status: defaultStatus(sourceType),
        processName: input.processName,
        pid: input.pid,
        label: input.label,
        createdAt: new Date().toISOString()
      };

      routes.push(route);
      return { ...route };
    },

    async update(id, patch: RoutePatch) {
      const index = routes.findIndex((entry) => entry.id === id);
      const current = routes[index];
      if (!current) {
        throw notFound(id);
      }

      const merged: RouteMapping = {
        ...current,
        ...patch,
        id: current.id,
        createdAt: current.createdAt
      };

      const result = validateRoute(merged, { existingRoutes: routes, ignoreRouteId: id });
      if (!result.valid) {
        throw validationError(result.issues.map((entry) => entry.message));
      }

      routes[index] = merged;
      return { ...merged };
    },

    async delete(id) {
      const index = routes.findIndex((entry) => entry.id === id);
      if (index === -1) {
        throw notFound(id);
      }
      routes.splice(index, 1);
    }
  };
}
