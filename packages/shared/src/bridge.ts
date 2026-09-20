import type {
  NewRouteDto,
  ProxyStatusDto,
  RouteDto,
  RoutesDto,
  ScanDto,
  UpdateRouteDto
} from './dto';

/**
 * Shape of `window.devdock`, exposed by the Electron preload.
 *
 * Lives in `shared` because two projects use it: the Electron preload exposes
 * it and the UI adapters consume it. Duplicating it would let the two drift.
 */
export interface DevDockBridge {
  scanPorts(): Promise<ScanDto>;
  getRoutes(): Promise<RoutesDto>;
  createRoute(input: NewRouteDto): Promise<RouteDto>;
  updateRoute(id: string, patch: UpdateRouteDto): Promise<RouteDto>;
  deleteRoute(id: string): Promise<void>;
  getProxyStatus(): Promise<ProxyStatusDto>;
  reloadProxy(): Promise<ProxyStatusDto>;
  openRoute(id: string): Promise<void>;
}
