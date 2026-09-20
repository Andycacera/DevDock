import { afterAll, describe, expect, it } from 'bun:test';
import type { AddressInfo } from 'node:net';
import type { ApiErrorDto, ProxyStatusDto, RouteDto, RoutesDto, ScanDto } from '@devdock/shared';
import { createApp } from './app';
import { createDefaultDeps } from './deps';

const app = createApp(createDefaultDeps());
const server = app.listen(0);

await new Promise<void>((resolve, reject) => {
  server.once('listening', resolve);
  server.once('error', reject);
});

const address = server.address() as AddressInfo;
const baseUrl = `http://127.0.0.1:${address.port}`;

afterAll(() => {
  server.close();
});

let counter = 0;

async function getJson<T>(path: string): Promise<T> {
  const response = await fetch(`${baseUrl}${path}`);
  expect(response.ok).toBe(true);
  return (await response.json()) as T;
}

async function createRoute(): Promise<RouteDto> {
  counter += 1;
  const response = await fetch(`${baseUrl}/routes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      domain: `shop-${counter}.localhost`,
      targetHost: '127.0.0.1',
      targetPort: 4300 + counter,
      label: `Shop ${counter}`
    })
  });
  expect(response.status).toBe(201);
  return (await response.json()) as RouteDto;
}

describe('dev-bridge HTTP API (Express 5)', () => {
  it('GET /scan returns services with derived states', async () => {
    const dto = await getJson<ScanDto>('/scan');

    expect(dto.services.length).toBeGreaterThan(0);
    expect(dto.errors).toHaveLength(0);
    expect(dto.services.some((service) => service.status === 'unassigned')).toBe(true);
    expect(dto.services.some((service) => service.hasDomain)).toBe(true);
  });

  it('GET /routes returns fixtures covering every state', async () => {
    const dto = await getJson<RoutesDto>('/routes');
    const statuses = new Set(dto.routes.map((route) => route.status));

    expect(statuses.has('active')).toBe(true);
    expect(statuses.has('inactive')).toBe(true);
    expect(statuses.has('conflict')).toBe(true);
    expect(statuses.has('reserved')).toBe(true);
  });

  it('POST /routes creates a route', async () => {
    const route = await createRoute();
    expect(route.domain).toMatch(/^shop-\d+\.localhost$/);
    expect(route.status).toBe('active');
    expect(route.createdAt).toBeString();
  });

  it('POST /routes rejects a reserved domain via the error handler', async () => {
    const response = await fetch(`${baseUrl}/routes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        domain: 'dev.localhost',
        targetHost: '127.0.0.1',
        targetPort: 4301
      })
    });

    expect(response.status).toBe(400);
    const body = (await response.json()) as ApiErrorDto;
    expect(body.error.code).toBe('VALIDATION_FAILED');
    expect(body.error.details?.length).toBeGreaterThan(0);
  });

  it('POST /routes rejects malformed JSON', async () => {
    const response = await fetch(`${baseUrl}/routes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '{ not json'
    });

    expect(response.status).toBe(400);
    const body = (await response.json()) as ApiErrorDto;
    expect(body.error.code).toBe('VALIDATION_FAILED');
  });

  it('PUT /routes/:id updates a route', async () => {
    const created = await createRoute();
    const response = await fetch(`${baseUrl}/routes/${created.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ label: 'Renamed' })
    });

    expect(response.ok).toBe(true);
    const updated = (await response.json()) as RouteDto;
    expect(updated.label).toBe('Renamed');
    expect(updated.id).toBe(created.id);
  });

  it('DELETE /routes/:id removes it and 404s afterwards', async () => {
    const created = await createRoute();

    const deleted = await fetch(`${baseUrl}/routes/${created.id}`, { method: 'DELETE' });
    expect(deleted.status).toBe(204);

    const missing = await fetch(`${baseUrl}/routes/${created.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ label: 'nope' })
    });
    expect(missing.status).toBe(404);
  });

  it('POST /routes/:id/open returns 204 for a known route', async () => {
    const dto = await getJson<RoutesDto>('/routes');
    const first = dto.routes[0];
    expect(first).toBeDefined();
    if (!first) return;

    const response = await fetch(`${baseUrl}/routes/${first.id}/open`, { method: 'POST' });
    expect(response.status).toBe(204);
  });

  it('GET /proxy/status and POST /proxy/reload', async () => {
    const before = await getJson<ProxyStatusDto>('/proxy/status');
    expect(before.backend).toBe('caddy');

    const response = await fetch(`${baseUrl}/proxy/reload`, { method: 'POST' });
    expect(response.ok).toBe(true);
    const after = (await response.json()) as ProxyStatusDto;
    expect(after.running).toBe(true);
    expect(after.lastReloadAt).toBeString();
  });

  it('OPTIONS preflight returns CORS headers', async () => {
    const response = await fetch(`${baseUrl}/routes`, { method: 'OPTIONS' });
    expect(response.status).toBe(204);
    expect(response.headers.get('Access-Control-Allow-Origin')).toBe('*');
  });

  it('unknown path returns 404', async () => {
    const response = await fetch(`${baseUrl}/nope`);
    expect(response.status).toBe(404);
  });
});
