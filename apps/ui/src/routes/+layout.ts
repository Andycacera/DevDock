import { browser } from '$app/environment'
import { initDevDock } from '$lib/services/bootstrap'

/**
 * Initializes the data layer on the client.
 *
 * Guarded by `browser` so it never runs during prerendering.
 */
export async function load(): Promise<Record<string, never>> {
  if (browser) {
    await initDevDock()
  }
  return {}
}
