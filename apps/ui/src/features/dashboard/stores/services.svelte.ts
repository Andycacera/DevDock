import type { DetectedService } from '@devdock/core';
import { devdockApi } from '$lib/services/devdock-api';
import { toUiError, type UiError } from '$lib/services/errors';

/** Model (state) exposed by the services store. */
export interface ServicesState {
  readonly items: DetectedService[];
  readonly loading: boolean;
  readonly error: UiError | null;
  readonly lastScanAt: string | null;
  refresh(): Promise<void>;
}

/** Detected services, loaded through the service API. */
export function createServicesStore(): ServicesState {
  let items = $state<DetectedService[]>([]);
  let loading = $state(false);
  let error = $state<UiError | null>(null);
  let lastScanAt = $state<string | null>(null);

  async function refresh() {
    loading = true;
    error = null;

    try {
      items = await devdockApi.scanPorts();
      lastScanAt = new Date().toISOString();
    } catch (cause) {
      error = toUiError(cause);
      console.error('[dashboard] scan failed', error);
    } finally {
      loading = false;
    }
  }

  return {
    get items() {
      return items;
    },
    get loading() {
      return loading;
    },
    get error() {
      return error;
    },
    get lastScanAt() {
      return lastScanAt;
    },
    refresh
  };
}
