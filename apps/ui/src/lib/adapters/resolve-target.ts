import type { DevDockBridge } from '@devdock/shared'
import type { RuntimeEnv, RuntimeGlobals } from './environment'

/**
 * Discriminated union so consumers never need `!` or `as`.
 *
 * `tauri` is detected but not implemented yet; the bootstrap rejects it.
 */
export type TargetResolution =
  | { target: 'electron'; bridge: DevDockBridge }
  | { target: 'tauri' }
  | { target: 'bridge'; baseUrl: string }
  | { target: 'mock' }

/**
 * Pure resolver: no globals, no environment, no browser.
 *
 * Precedence: explicit override → Electron → Tauri → bridge → mock.
 */
export function resolveTarget(globals: RuntimeGlobals, env: RuntimeEnv): TargetResolution {
  if (env.forcedTarget === 'mock') return { target: 'mock' }
  if (env.forcedTarget === 'tauri') return { target: 'tauri' }
  if (env.forcedTarget === 'electron' && globals.devdock) {
    return { target: 'electron', bridge: globals.devdock }
  }
  if (env.forcedTarget === 'bridge' && env.bridgeUrl) {
    return { target: 'bridge', baseUrl: env.bridgeUrl }
  }

  if (globals.devdock) return { target: 'electron', bridge: globals.devdock }
  if (globals.tauriInternals) return { target: 'tauri' }
  if (env.bridgeUrl) return { target: 'bridge', baseUrl: env.bridgeUrl }
  return { target: 'mock' }
}
