import { describe, expect, it, vi } from 'vitest'
import type { DevDockAdapter } from '@devdock/core'
import { setAdapter } from './adapter-registry'
import { devdockApi } from './devdock-api'

function fakeAdapter(overrides: Partial<DevDockAdapter> = {}): DevDockAdapter {
  return {
    scanPorts: async () => [],
    getRoutes: async () => [],
    createRoute: async input => ({
      id: 'route-1',
      domain: input.domain,
      targetHost: input.targetHost,
      targetPort: input.targetPort,
      protocol: input.protocol ?? 'http',
      sourceType: input.sourceType ?? 'local',
      status: 'active',
      createdAt: '2026-09-20T00:00:00.000Z'
    }),
    updateRoute: async () => {
      throw new Error('not used')
    },
    deleteRoute: async () => undefined,
    getProxyStatus: async () => ({ backend: 'caddy', running: true }),
    reloadProxy: async () => ({ backend: 'caddy', running: true }),
    openRoute: async () => undefined,
    ...overrides
  }
}

describe('devdockApi', () => {
  it('delegates scanPorts to the registered adapter', async () => {
    const scanPorts = vi.fn(async () => [])
    setAdapter(fakeAdapter({ scanPorts }))

    await devdockApi.scanPorts()

    expect(scanPorts).toHaveBeenCalledTimes(1)
  })

  it('delegates getProxyStatus', async () => {
    const getProxyStatus = vi.fn(async () => ({ backend: 'caddy' as const, running: true }))
    setAdapter(fakeAdapter({ getProxyStatus }))

    const status = await devdockApi.getProxyStatus()

    expect(status.backend).toBe('caddy')
  })
})
