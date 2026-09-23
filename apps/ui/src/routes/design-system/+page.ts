import { dev } from '$app/environment';
import { error } from '@sveltejs/kit';

/**
 * Development-only route.
 *
 * In production this route must not be reachable, so the load function fails with a 404
 * before the page renders.
 */
export function load() {
  if (!dev) {
    error(404, 'Not found');
  }
}
