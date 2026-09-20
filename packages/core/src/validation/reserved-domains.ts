/**
 * Reserved domain data.
 *
 * The default list is hardcoded here and is not editable. Users may extend it
 * with custom entries, but never remove defaults.
 */

/** Friendly-domain suffix. Every valid route ends with this. */
export const LOCALHOST_TLD = 'localhost';

/**
 * Names that can never be used as a local domain label.
 *
 * Covers RFC 6761/2606/7686/8375 names, common mDNS/LAN suffixes and public
 * gTLDs with HSTS preload.
 */
export const RESERVED_DOMAINS: readonly string[] = [
  // RFC 6761
  'localhost',
  'test',
  'invalid',
  'example',
  // RFC 2606
  'example.com',
  'example.net',
  'example.org',
  // RFC 7686
  'onion',
  // RFC 8375
  'home.arpa',
  // mDNS / LAN
  'local',
  'lan',
  'home',
  'corp',
  'internal',
  'intranet',
  'private',
  // Public gTLDs with HSTS preload
  'dev',
  'app',
  'page'
];

/**
 * Public gTLDs with HSTS preload.
 *
 * These matter most: browsers force HTTPS, so routing breaks silently.
 */
export const PUBLIC_TLDS: readonly string[] = ['dev', 'app', 'page'];

export function isReservedName(label: string): boolean {
  return RESERVED_DOMAINS.includes(label);
}

export function isPublicTld(label: string): boolean {
  return PUBLIC_TLDS.includes(label);
}
