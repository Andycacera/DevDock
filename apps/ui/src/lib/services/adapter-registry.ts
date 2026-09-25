import type { DevDockAdapter } from '@devdock/core'
import { DevDockError } from '@devdock/shared'

let adapter: DevDockAdapter | null = null

/** Installed once by the bootstrap composition root. */
export function setAdapter(next: DevDockAdapter): void {
  adapter = next
}

/** Returns the active adapter, or throws if the bootstrap has not run. */
export function getAdapter(): DevDockAdapter {
  if (!adapter) {
    throw new DevDockError(
      'UNKNOWN',
      'DevDock adapter is not initialized. Call initDevDock() first.'
    )
  }
  return adapter
}
