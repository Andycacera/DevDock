import type { DetectedService, ProxyStatus, RouteMapping } from '@devdock/core';
import type { DetectedServiceDto, ProxyStatusDto, RouteDto } from '@devdock/shared';

/**
 * Translates transport DTOs into domain types.
 *
 * The shapes match today, but keeping the seam isolates the UI from future wire
 * changes and normalizes every adapter response.
 */
export function toDetectedService(dto: DetectedServiceDto): DetectedService {
  return { ...dto };
}

export function toRouteMapping(dto: RouteDto): RouteMapping {
  return { ...dto };
}

export function toProxyStatus(dto: ProxyStatusDto): ProxyStatus {
  return { ...dto };
}
