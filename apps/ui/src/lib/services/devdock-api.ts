import type { NewRoute, RouteMapping } from '@devdock/core'
import { getAdapter } from './adapter-registry'

/**
 * Single entry point for the UI.
 *
 * Components and stores call this; they never touch an adapter directly.
 */
export const devdockApi = {
  scanPorts: () => getAdapter().scanPorts(),
  getRoutes: () => getAdapter().getRoutes(),
  createRoute: (input: NewRoute) => getAdapter().createRoute(input),
  updateRoute: (id: string, patch: Partial<RouteMapping>) => getAdapter().updateRoute(id, patch),
  deleteRoute: (id: string) => getAdapter().deleteRoute(id),
  getProxyStatus: () => getAdapter().getProxyStatus(),
  reloadProxy: () => getAdapter().reloadProxy(),
  openRoute: (id: string) => getAdapter().openRoute(id)
}
