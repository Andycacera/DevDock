import { afterEach, describe, expect, it, vi } from 'vitest';
import { DevDockError } from '@devdock/shared';
import { createBridgeAdapter } from './bridge-adapter';

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' }
  });
}

function stubFetch(handler: (url: string, init?: RequestInit) => Response | Promise<Response>) {
  vi.stubGlobal(
    'fetch',
    vi.fn((input: RequestInfo | URL, init?: RequestInit) => handler(String(input), init))
  );
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('createBridgeAdapter', () => {
  it('maps the scan DTO into domain services', async () => {
    stubFetch(() =>
      jsonResponse({
        scannedAt: '2026-09-20T00:00:00.000Z',
        durationMs: 1,
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
      })
    );

    const adapter = createBridgeAdapter('http://localhost:8787');
    const services = await adapter.scanPorts();

    expect(services).toHaveLength(1);
    expect(services[0]?.port).toBe(4200);
  });

  it('throws a DevDockError on a non-ok response', async () => {
    stubFetch(() =>
      jsonResponse({ error: { code: 'VALIDATION_FAILED', message: 'bad input' } }, 400)
    );

    const adapter = createBridgeAdapter('http://localhost:8787');

    await expect(
      adapter.createRoute({ domain: 'dev.localhost', targetHost: '127.0.0.1', targetPort: 5000 })
    ).rejects.toBeInstanceOf(DevDockError);
  });

  it('throws NETWORK_ERROR when the bridge is unreachable', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.reject(new Error('connection refused')))
    );

    const adapter = createBridgeAdapter('http://localhost:8787');

    await expect(adapter.getRoutes()).rejects.toMatchObject({ code: 'NETWORK_ERROR' });
  });

  it('handles 204 responses', async () => {
    stubFetch(() => new Response(null, { status: 204 }));

    const adapter = createBridgeAdapter('http://localhost:8787');

    await expect(adapter.deleteRoute('r1')).resolves.toBeUndefined();
  });
});
