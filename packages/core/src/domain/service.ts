import type { Protocol, ServiceStatus, SourceType } from './common';

/** A service found by the port scanner. */
export interface DetectedService {
  id: string;
  host: string;
  port: number;
  protocol: Protocol;
  processName?: string;
  pid?: number;
  sourceType: SourceType;
  hasDomain: boolean;
  status: ServiceStatus;
}
