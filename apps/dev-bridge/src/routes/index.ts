import type { Express } from 'express';
import { API_PATHS } from '@devdock/shared';
import type { BridgeDeps } from '../deps';
import { createProxyRouter } from './proxy.router';
import { createRoutesRouter } from './routes.router';
import { createScanRouter } from './scan.router';

/** Mounts every router on the app. */
export function registerRoutes(app: Express, deps: BridgeDeps): void {
  app.use(API_PATHS.scan, createScanRouter(deps.services));
  app.use(
    API_PATHS.routes,
    createRoutesRouter({ routes: deps.routes, openRoute: deps.openRoute })
  );
  app.use(API_PATHS.proxy, createProxyRouter(deps.proxy));
}
