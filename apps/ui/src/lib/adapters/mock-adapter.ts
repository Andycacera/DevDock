import type { DevDockAdapter } from '@devdock/core'
import { createMockAdapter as createInMemoryMockAdapter } from '@devdock/mock'

/**
 * Mock adapter: in-memory fixtures, no transport and no shell.
 *
 * It is the development fallback and the reusable adapter for tests.
 */
export function createMockAdapter(): DevDockAdapter {
  return createInMemoryMockAdapter()
}
