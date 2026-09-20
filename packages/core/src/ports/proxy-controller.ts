import type { ProxyStatus } from '../domain/proxy';

/** Controls the managed proxy instance. */
export interface ProxyController {
  status(): Promise<ProxyStatus>;
  reload(): Promise<ProxyStatus>;
}
