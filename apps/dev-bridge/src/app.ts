import express, { type Express } from 'express';
import cors from 'cors';
import type { BridgeDeps } from './deps';
import { errorHandler } from './http/error-handler';
import { notFoundHandler } from './http/not-found';
import { registerRoutes } from './routes';

/**
 * Builds the Express app without binding a socket.
 *
 * Keeping `listen()` out of this function makes the app importable in tests.
 * Express 5 forwards rejected promises from async handlers to `errorHandler`,
 * so handlers need no try/catch wrapper.
 */
export function createApp(deps: BridgeDeps): Express {
  const app = express();

  app.use(cors());
  app.use(express.json());

  registerRoutes(app, deps);

  // Must be registered last, in this order.
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
