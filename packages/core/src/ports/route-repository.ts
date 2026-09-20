import type { NewRoute, RouteMapping, RoutePatch } from '../domain/route';

/** Source of truth for domain -> target mappings. */
export interface RouteRepository {
  list(): Promise<RouteMapping[]>;
  get(id: string): Promise<RouteMapping | undefined>;
  create(input: NewRoute): Promise<RouteMapping>;
  update(id: string, patch: RoutePatch): Promise<RouteMapping>;
  delete(id: string): Promise<void>;
}
