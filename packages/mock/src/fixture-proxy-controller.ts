import type { ProxyController, ProxyStatus } from '@devdock/core';

/** Mock proxy: `reload()` bumps `lastReloadAt`. No real Caddy involved. */
export function createFixtureProxyController(initial: ProxyStatus): ProxyController {
  let current: ProxyStatus = { ...initial };

  return {
    async status() {
      return { ...current };
    },

    async reload() {
      current = {
        ...current,
        running: true,
        lastReloadAt: new Date().toISOString(),
        lastError: undefined
      };
      return { ...current };
    }
  };
}
