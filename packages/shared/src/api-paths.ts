/**
 * HTTP paths exposed by dev-bridge.
 *
 * Shared between the bridge (server) and the UI bridge-adapter (client) so the
 * two never drift.
 */
export const API_PATHS = {
  scan: '/scan',
  routes: '/routes',
  route: (id: string) => `/routes/${id}`,
  openRoute: (id: string) => `/routes/${id}/open`,
  proxy: '/proxy',
  proxyStatus: '/proxy/status',
  proxyReload: '/proxy/reload'
} as const;
