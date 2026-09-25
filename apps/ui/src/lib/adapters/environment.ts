import { dev } from '$app/environment'
import { PUBLIC_DD_BRIDGE_URL, PUBLIC_DD_TARGET } from '$env/static/public'
import type { DevDockBridge } from '@devdock/shared'

export type DevDockTarget = 'electron' | 'tauri' | 'bridge' | 'mock'

export interface RuntimeGlobals {
  devdock?: DevDockBridge
  tauriInternals?: unknown
}

export interface RuntimeEnv {
  forcedTarget?: DevDockTarget
  bridgeUrl?: string
  isDev: boolean
}

/**
 * The only place in the project that reads untyped globals.
 *
 * Everything else consumes the typed results returned from here.
 */
export function readRuntimeGlobals(): RuntimeGlobals {
  const globals = globalThis as Record<string, unknown>
  return {
    devdock: globals['devdock'] as DevDockBridge | undefined,
    tauriInternals: globals['__TAURI_INTERNALS__']
  }
}

function parseTarget(value: string): DevDockTarget | undefined {
  if (value === 'electron' || value === 'tauri' || value === 'bridge' || value === 'mock') {
    return value
  }
  return undefined
}

/**
 * The only place in the project that reads environment variables.
 *
 * `DD` stands for DevDock: the app's public env vars use this short prefix.
 * `PUBLIC_DD_TARGET` is an optional override used for manual testing.
 */
export function readRuntimeEnv(): RuntimeEnv {
  return {
    forcedTarget: parseTarget(PUBLIC_DD_TARGET),
    bridgeUrl: PUBLIC_DD_BRIDGE_URL || undefined,
    isDev: dev
  }
}
