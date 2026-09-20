import type { RouteMapping } from '@devdock/core';

/** ~6 routes covering active / inactive / conflict / reserved. */
export const FIXTURE_ROUTES: readonly RouteMapping[] = [
  {
    id: 'route-billing',
    domain: 'billing.localhost',
    targetHost: '127.0.0.1',
    targetPort: 4200,
    protocol: 'http',
    sourceType: 'local',
    status: 'active',
    processName: 'ng',
    pid: 41001,
    label: 'Billing web',
    createdAt: '2026-09-10T09:00:00.000Z'
  },
  {
    id: 'route-api',
    domain: 'api.localhost',
    targetHost: '127.0.0.1',
    targetPort: 8080,
    protocol: 'http',
    sourceType: 'local',
    status: 'active',
    processName: 'node',
    pid: 41002,
    label: 'Main API',
    createdAt: '2026-09-10T09:05:00.000Z'
  },
  {
    id: 'route-internal-api',
    domain: 'internal-api.localhost',
    targetHost: '192.168.1.50',
    targetPort: 8080,
    protocol: 'http',
    sourceType: 'lan',
    status: 'inactive',
    processName: 'java',
    pid: 41003,
    label: 'LAN API',
    createdAt: '2026-09-11T14:20:00.000Z'
  },
  {
    id: 'route-admin-1',
    domain: 'admin.localhost',
    targetHost: '127.0.0.1',
    targetPort: 7001,
    protocol: 'http',
    sourceType: 'local',
    status: 'conflict',
    processName: 'node',
    pid: 41004,
    createdAt: '2026-09-12T08:00:00.000Z'
  },
  {
    id: 'route-admin-2',
    domain: 'admin.localhost',
    targetHost: '127.0.0.1',
    targetPort: 7002,
    protocol: 'http',
    sourceType: 'local',
    status: 'conflict',
    createdAt: '2026-09-12T08:01:00.000Z'
  },
  {
    id: 'route-dev',
    domain: 'dev.localhost',
    targetHost: '127.0.0.1',
    targetPort: 5000,
    protocol: 'http',
    sourceType: 'local',
    status: 'reserved',
    processName: 'python3',
    pid: 41005,
    createdAt: '2026-09-13T10:30:00.000Z'
  }
];
