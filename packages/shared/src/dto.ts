import type { DevDockErrorCode } from './errors';

/**
 * Wire types (DTOs) exchanged over the transport.
 *
 * They mirror the domain model on purpose: adapters translate DTOs into domain
 * types, so the two can diverge later without touching the wire contract.
 */

export type ProtocolDto = 'http' | 'https' | 'tcp';
export type RouteProtocolDto = 'http' | 'https';
export type SourceTypeDto = 'local' | 'lan' | 'vpn';
export type RouteStatusDto = 'unassigned' | 'active' | 'inactive' | 'conflict' | 'reserved';
export type ServiceStatusDto = RouteStatusDto;
export type ProxyBackendDto = 'hosts' | 'nginx' | 'caddy' | 'dnsmasq';

export interface DetectedServiceDto {
  id: string;
  host: string;
  port: number;
  protocol: ProtocolDto;
  processName?: string;
  pid?: number;
  sourceType: SourceTypeDto;
  hasDomain: boolean;
  status: ServiceStatusDto;
}

export interface ScanDto {
  scannedAt: string;
  durationMs: number;
  services: DetectedServiceDto[];
  errors: string[];
}

export interface RouteDto {
  id: string;
  domain: string;
  targetHost: string;
  targetPort: number;
  protocol: RouteProtocolDto;
  sourceType: SourceTypeDto;
  status: RouteStatusDto;
  processName?: string;
  pid?: number;
  label?: string;
  createdAt: string;
}

export interface NewRouteDto {
  domain: string;
  targetHost: string;
  targetPort: number;
  protocol?: RouteProtocolDto;
  sourceType?: SourceTypeDto;
  label?: string;
  processName?: string;
  pid?: number;
}

export type UpdateRouteDto = Partial<NewRouteDto>;

export interface RoutesDto {
  routes: RouteDto[];
}

export interface ProxyStatusDto {
  backend: ProxyBackendDto;
  running: boolean;
  lastReloadAt?: string;
  lastError?: string;
}

export interface ApiErrorDto {
  error: {
    code: DevDockErrorCode;
    message: string;
    details?: string[];
  };
}
