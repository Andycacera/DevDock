import { DevDockError } from '@devdock/shared';
import { createBridgeAdapter } from '../adapters/bridge-adapter';
import { createElectronAdapter } from '../adapters/electron-adapter';
import { readRuntimeEnv, readRuntimeGlobals } from '../adapters/environment';
import { createMockAdapter } from '../adapters/mock-adapter';
import { resolveTarget } from '../adapters/resolve-target';
import { setAdapter } from './adapter-registry';

let initialization: Promise<void> | null = null;

/** Resolves and installs the adapter. Safe to call more than once. */
export function initDevDock(): Promise<void> {
  initialization ??= initialize();
  return initialization;
}

async function initialize(): Promise<void> {
  const globals = readRuntimeGlobals();
  const env = readRuntimeEnv();
  const resolution = resolveTarget(globals, env);

  // Exhaustive switch: adding a target forces a compile-time update here.
  switch (resolution.target) {
    case 'electron':
      setAdapter(createElectronAdapter(resolution.bridge));
      return;
    case 'tauri':
      throw new DevDockError('UNKNOWN', 'The Tauri target is not implemented yet.');
    case 'bridge':
      setAdapter(createBridgeAdapter(resolution.baseUrl));
      return;
    case 'mock':
      if (!env.isDev) {
        throw new DevDockError('NO_SHELL_IN_PRODUCTION', 'No shell detected in production.');
      }
      setAdapter(createMockAdapter());
      return;
  }
}
