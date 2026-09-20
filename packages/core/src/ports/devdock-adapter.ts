import type { ProxyStatus } from '../domain/proxy';
import type { NewRoute, RouteMapping } from '../domain/route';
import type { DetectedService } from '../domain/service';

/**
 * The single interface the UI depends on.
 *
 * Every adapter (mock, bridge, electron, tauri) satisfies this port, so the UI
 * never learns which shell is running behind it.
 */
export interface DevDockAdapter {
  scanPorts(): Promise<DetectedService[]>;
  getRoutes(): Promise<RouteMapping[]>;
  createRoute(input: NewRoute): Promise<RouteMapping>;
  updateRoute(id: string, patch: Partial<RouteMapping>): Promise<RouteMapping>;
  deleteRoute(id: string): Promise<void>;
  getProxyStatus(): Promise<ProxyStatus>;
  reloadProxy(): Promise<ProxyStatus>;
  openRoute(id: string): Promise<void>;
}
