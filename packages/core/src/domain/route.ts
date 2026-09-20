import type { RouteProtocol, RouteStatus, SourceType } from './common';

/** A domain -> target mapping managed by DevDock. */
export interface RouteMapping {
  id: string;
  domain: string;
  targetHost: string;
  targetPort: number;
  protocol: RouteProtocol;
  sourceType: SourceType;
  status: RouteStatus;
  processName?: string;
  pid?: number;
  label?: string;
  createdAt: string;
}

/** Input accepted when creating a route. Server fills id/status/createdAt. */
export interface NewRoute {
  domain: string;
  targetHost: string;
  targetPort: number;
  protocol?: RouteProtocol;
  sourceType?: SourceType;
  label?: string;
  processName?: string;
  pid?: number;
}

/** Editable fields of an existing route. */
export type RoutePatch = Partial<Omit<RouteMapping, 'id' | 'createdAt'>>;
