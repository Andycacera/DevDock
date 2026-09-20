import { describe, expect, it } from 'vitest';
import { createMockAdapter } from './mock-adapter';

describe('createMockAdapter', () => {
  it('returns fixture services', async () => {
    const adapter = createMockAdapter();
    const services = await adapter.scanPorts();
    expect(services.length).toBeGreaterThan(0);
  });

  it('creates, lists and deletes routes in memory', async () => {
    const adapter = createMockAdapter();

    const created = await adapter.createRoute({
      domain: 'shop.localhost',
      targetHost: '127.0.0.1',
      targetPort: 4300
    });
    expect(created.domain).toBe('shop.localhost');

    const listed = await adapter.getRoutes();
    expect(listed.some((route) => route.id === created.id)).toBe(true);

    await adapter.deleteRoute(created.id);
    const after = await adapter.getRoutes();
    expect(after.some((route) => route.id === created.id)).toBe(false);
  });

  it('reports the proxy status', async () => {
    const adapter = createMockAdapter();
    const status = await adapter.getProxyStatus();
    expect(status.backend).toBe('caddy');
  });
});
