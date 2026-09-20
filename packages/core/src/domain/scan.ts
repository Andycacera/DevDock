import type { DetectedService } from './service';

/** Result of one port-scan pass. */
export interface ScanResult {
  scannedAt: string;
  durationMs: number;
  services: DetectedService[];
  errors: string[];
}
