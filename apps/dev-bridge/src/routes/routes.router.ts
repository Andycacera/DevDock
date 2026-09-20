import { Router } from 'express';
import type { RouteMapping, RouteRepository } from '@devdock/core';
import type { NewRouteDto, RouteDto, RoutesDto, UpdateRouteDto } from '@devdock/shared';
import { notFound } from '../errors';
import { readBody } from '../http/body';

export interface RoutesRouterDeps {
  routes: RouteRepository;
  openRoute: (route: RouteMapping) => Promise<void> | void;
}

/** CRUD for `/routes` plus the mock `open` action. */
export function createRoutesRouter(deps: RoutesRouterDeps): Router {
  const router = Router();

  router.get('/', async (_req, res) => {
    const routes = await deps.routes.list();
    const dto: RoutesDto = { routes };
    res.json(dto);
  });

  router.post('/', async (req, res) => {
    const input = readBody<NewRouteDto>(req.body);
    const route = await deps.routes.create(input);
    const dto: RouteDto = route;
    res.status(201).json(dto);
  });

  router.put('/:id', async (req, res) => {
    const patch = readBody<UpdateRouteDto>(req.body);
    const route = await deps.routes.update(req.params.id, patch);
    const dto: RouteDto = route;
    res.json(dto);
  });

  router.delete('/:id', async (req, res) => {
    await deps.routes.delete(req.params.id);
    res.status(204).end();
  });

  router.post('/:id/open', async (req, res) => {
    const route = await deps.routes.get(req.params.id);
    if (!route) {
      throw notFound(req.params.id);
    }
    await deps.openRoute(route);
    res.status(204).end();
  });

  return router;
}
