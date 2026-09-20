/** Routing engine DevDock can manage. */
export type ProxyBackend = 'hosts' | 'nginx' | 'caddy' | 'dnsmasq';

/** Current state of the managed proxy. */
export interface ProxyStatus {
  backend: ProxyBackend;
  running: boolean;
  lastReloadAt?: string;
  lastError?: string;
}
