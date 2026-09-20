import type { ProxyStatus, RouteMapping } from '@devdock/core';
import { devdockApi } from '$lib/services/devdock-api';
import { toUiError, type UiError } from '$lib/services/errors';

/** Model (state) exposed by the routes store. */
export interface RoutesState {
  readonly items: RouteMapping[];
  readonly proxyStatus: ProxyStatus | null;
  readonly loading: boolean;
  readonly error: UiError | null;
  refresh(): Promise<void>;
}

/** Assigned routes and proxy status, loaded through the service API. */
export function createRoutesStore(): RoutesState {
  let items = $state<RouteMapping[]>([]);
  let proxyStatus = $state<ProxyStatus | null>(null);
  let loading = $state(false);
  let error = $state<UiError | null>(null);

  async function refresh() {
    loading = true;
    error = null;

    try {
      const [routes, proxy] = await Promise.all([
        devdockApi.getRoutes(),
        devdockApi.getProxyStatus()
      ]);
      items = routes;
      proxyStatus = proxy;
    } catch (cause) {
      error = toUiError(cause);
      console.error('[dashboard] routes refresh failed', error);
    } finally {
      loading = false;
    }
  }

  return {
    get items() {
      return items;
    },
    get proxyStatus() {
      return proxyStatus;
    },
    get loading() {
      return loading;
    },
    get error() {
      return error;
    },
    refresh
  };
}
