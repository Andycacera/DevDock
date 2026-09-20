import type { Protocol, SourceType } from '@devdock/core';

/**
 * Raw fixture shape: no `hasDomain`/`status` because those are computed from
 * the route list, exactly like the real source will.
 */
export interface FixtureService {
  id: string;
  host: string;
  port: number;
  protocol: Protocol;
  processName: string;
  pid: number;
  sourceType: SourceType;
}

/** ~10 services covering local/LAN/VPN, assigned and unassigned. */
export const FIXTURE_SERVICES: readonly FixtureService[] = [
  // Assigned (matched by routes.ts)
  { id: 'svc-ng-4200', host: '127.0.0.1', port: 4200, protocol: 'http', processName: 'ng', pid: 41001, sourceType: 'local' },
  { id: 'svc-node-8080', host: '127.0.0.1', port: 8080, protocol: 'http', processName: 'node', pid: 41002, sourceType: 'local' },
  { id: 'svc-java-8080-lan', host: '192.168.1.50', port: 8080, protocol: 'http', processName: 'java', pid: 41003, sourceType: 'lan' },
  { id: 'svc-node-7001', host: '127.0.0.1', port: 7001, protocol: 'http', processName: 'node', pid: 41004, sourceType: 'local' },
  { id: 'svc-python-5000', host: '127.0.0.1', port: 5000, protocol: 'http', processName: 'python3', pid: 41005, sourceType: 'local' },
  // Unassigned
  { id: 'svc-vite-5173', host: '127.0.0.1', port: 5173, protocol: 'http', processName: 'vite', pid: 41006, sourceType: 'local' },
  { id: 'svc-node-3000', host: '127.0.0.1', port: 3000, protocol: 'http', processName: 'node', pid: 41007, sourceType: 'local' },
  { id: 'svc-postgres-5432', host: '127.0.0.1', port: 5432, protocol: 'tcp', processName: 'postgres', pid: 41008, sourceType: 'local' },
  { id: 'svc-mysql-3306', host: '127.0.0.1', port: 3306, protocol: 'tcp', processName: 'mysqld', pid: 41009, sourceType: 'local' },
  { id: 'svc-minio-9000-vpn', host: '10.0.0.25', port: 9000, protocol: 'http', processName: 'minio', pid: 41010, sourceType: 'vpn' }
];
