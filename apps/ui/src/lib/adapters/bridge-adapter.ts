import type {
  DetectedService,
  DevDockAdapter,
  NewRoute,
  ProxyStatus,
  RouteMapping
} from '@devdock/core';
import type {
  ApiErrorDto,
  NewRouteDto,
  ProxyStatusDto,
  RouteDto,
  RoutesDto,
  ScanDto,
  UpdateRouteDto
} from '@devdock/shared';
import { API_PATHS, DevDockError } from '@devdock/shared';
import { toDetectedService, toProxyStatus, toRouteMapping } from './mappers';

function jsonInit(method: string, body: unknown): RequestInit {
  return {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  };
}

async function readError(response: Response): Promise<DevDockError> {
  try {
    const body = (await response.json()) as ApiErrorDto;
    if (body.error?.code) {
      return new DevDockError(body.error.code, body.error.message, body.error.details ?? []);
    }
  } catch {
    // Fall through to the generic error below.
  }
  return new DevDockError('INVALID_RESPONSE', `Unexpected response (HTTP ${response.status})`);
}

/**
 * HTTP adapter for dev-bridge.
 *
 * It is not a pass-through: it maps DTOs to domain types and unifies every
 * transport failure into `DevDockError`.
 */
export function createBridgeAdapter(baseUrl: string): DevDockAdapter {
  const base = baseUrl.replace(/\/+$/, '');

  async function request<T>(path: string, init?: RequestInit): Promise<T> {
    let response: Response;
    try {
      response = await fetch(`${base}${path}`, init);
    } catch {
      throw new DevDockError('NETWORK_ERROR', `Cannot reach dev-bridge at ${base}`);
    }

    if (!response.ok) {
      throw await readError(response);
    }
    if (response.status === 204) {
      return undefined as T;
    }
    return (await response.json()) as T;
  }

  return {
    async scanPorts(): Promise<DetectedService[]> {
      const dto = await request<ScanDto>(API_PATHS.scan);
      return dto.services.map(toDetectedService);
    },

    async getRoutes(): Promise<RouteMapping[]> {
      const dto = await request<RoutesDto>(API_PATHS.routes);
      return dto.routes.map(toRouteMapping);
    },

    async createRoute(input: NewRoute): Promise<RouteMapping> {
      const body: NewRouteDto = input;
      return toRouteMapping(await request<RouteDto>(API_PATHS.routes, jsonInit('POST', body)));
    },

    async updateRoute(id: string, patch: Partial<RouteMapping>): Promise<RouteMapping> {
      const body = patch as UpdateRouteDto;
      return toRouteMapping(await request<RouteDto>(API_PATHS.route(id), jsonInit('PUT', body)));
    },

    async deleteRoute(id: string): Promise<void> {
      await request<void>(API_PATHS.route(id), { method: 'DELETE' });
    },

    async getProxyStatus(): Promise<ProxyStatus> {
      return toProxyStatus(await request<ProxyStatusDto>(API_PATHS.proxyStatus));
    },

    async reloadProxy(): Promise<ProxyStatus> {
      return toProxyStatus(
        await request<ProxyStatusDto>(API_PATHS.proxyReload, { method: 'POST' })
      );
    },

    async openRoute(id: string): Promise<void> {
      await request<void>(API_PATHS.openRoute(id), { method: 'POST' });
    }
  };
}
