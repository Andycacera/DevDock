import type {
  DetectedService,
  DevDockAdapter,
  NewRoute,
  ProxyStatus,
  RouteMapping
} from '@devdock/core';
import type { DevDockBridge } from '@devdock/shared';
import { toDetectedService, toProxyStatus, toRouteMapping } from './mappers';

/**
 * Electron adapter: delegates to the preload bridge over IPC.
 *
 * NOTE: The Electron shell is not implemented yet. This adapter is not fully
 * tested and may change. Remove this note once the Electron shell lands.
 */
export function createElectronAdapter(bridge: DevDockBridge): DevDockAdapter {
  return {
    async scanPorts(): Promise<DetectedService[]> {
      const dto = await bridge.scanPorts();
      return dto.services.map(toDetectedService);
    },

    async getRoutes(): Promise<RouteMapping[]> {
      const dto = await bridge.getRoutes();
      return dto.routes.map(toRouteMapping);
    },

    async createRoute(input: NewRoute): Promise<RouteMapping> {
      return toRouteMapping(await bridge.createRoute(input));
    },

    async updateRoute(id: string, patch: Partial<RouteMapping>): Promise<RouteMapping> {
      return toRouteMapping(await bridge.updateRoute(id, patch));
    },

    async deleteRoute(id: string): Promise<void> {
      await bridge.deleteRoute(id);
    },

    async getProxyStatus(): Promise<ProxyStatus> {
      return toProxyStatus(await bridge.getProxyStatus());
    },

    async reloadProxy(): Promise<ProxyStatus> {
      return toProxyStatus(await bridge.reloadProxy());
    },

    async openRoute(id: string): Promise<void> {
      await bridge.openRoute(id);
    }
  };
}
