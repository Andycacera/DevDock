import { describe, expect, it } from 'vitest'
import type { DevDockBridge } from '@devdock/shared'
import { createElectronAdapter } from './electron-adapter'

const fakeBridge: DevDockBridge = {
  scanPorts: async () => ({
    scannedAt: '2026-09-20T00:00:00.000Z',
    durationMs: 0,
    services: [
      {
        id: 'svc-1',
        host: '127.0.0.1',
        port: 4200,
        protocol: 'http',
        sourceType: 'local',
        hasDomain: false,
        status: 'unassigned'
      }
    ],
    errors: []
  }),
  getRoutes: async () => ({ routes: [] }),
  createRoute: async input => ({
    id: 'route-1',
    domain: input.domain,
    targetHost: input.targetHost,
    targetPort: input.targetPort,
    protocol: input.protocol ?? 'http',
    sourceType: input.sourceType ?? 'local',
    status: 'active',
    label: input.label,
    processName: input.processName,
    pid: input.pid,
    createdAt: '2026-09-20T00:00:00.000Z'
  }),
  updateRoute: async (id, patch) => ({
    id,
    domain: patch.domain ?? 'billing.localhost',
    targetHost: patch.targetHost ?? '127.0.0.1',
    targetPort: patch.targetPort ?? 4200,
    protocol: patch.protocol ?? 'http',
    sourceType: patch.sourceType ?? 'local',
    status: 'active',
    createdAt: '2026-09-20T00:00:00.000Z'
  }),
  deleteRoute: async () => undefined,
  getProxyStatus: async () => ({ backend: 'caddy', running: true }),
  reloadProxy: async () => ({ backend: 'caddy', running: true }),
  openRoute: async () => undefined
}

describe('createElectronAdapter', () => {
  it('delegates scanPorts and maps the DTO', async () => {
    const adapter = createElectronAdapter(fakeBridge)
    const services = await adapter.scanPorts()
    expect(services[0]?.port).toBe(4200)
  })

  it('delegates getProxyStatus', async () => {
    const adapter = createElectronAdapter(fakeBridge)
    const status = await adapter.getProxyStatus()
    expect(status.backend).toBe('caddy')
  })
})
