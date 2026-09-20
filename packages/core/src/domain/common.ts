/** Transport protocol a detected service speaks. */
export type Protocol = 'http' | 'https' | 'tcp';

/** Transport protocol a route proxies to. */
export type RouteProtocol = 'http' | 'https';

/** Where a service/route target lives. */
export type SourceType = 'local' | 'lan' | 'vpn';

/**
 * User-visible state of a route.
 *
 * `unassigned` is service-side: a detected service with no route yet.
 */
export type RouteStatus = 'unassigned' | 'active' | 'inactive' | 'conflict' | 'reserved';

/** State shown for a detected service. Same vocabulary as routes. */
export type ServiceStatus = RouteStatus;
