import type { NewRoute, RouteMapping } from '../domain/route';
import type { ValidationCode, ValidationIssue, ValidationResult } from '../domain/validation';
import { isBlocking } from '../domain/validation';
import { LOCALHOST_TLD, isPublicTld, isReservedName } from './reserved-domains';

const LABEL_RE = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/;
const IPV4_RE = /^(?:\d{1,3}\.){3}\d{1,3}$/;
const HOSTNAME_RE =
  /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/;

export interface ValidateRouteOptions {
  /** Routes already persisted, used for duplicate detection. */
  existingRoutes?: readonly Pick<RouteMapping, 'id' | 'domain'>[];
  /** Route being edited; its own domain is not a duplicate. */
  ignoreRouteId?: string;
}

function issue(code: ValidationCode, message: string): ValidationIssue {
  return { code, message, blocksSave: isBlocking(code) };
}

/** Validates the domain shape and reserved/public rules. */
export function validateDomain(
  rawDomain: string,
  options: ValidateRouteOptions = {}
): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const domain = rawDomain.trim().toLowerCase();
  const suffix = `.${LOCALHOST_TLD}`;

  if (!domain.endsWith(suffix)) {
    return [issue('INVALID_LABEL', `Domain must end with ${suffix}`)];
  }

  const prefix = domain.slice(0, -suffix.length);
  if (!prefix) {
    return [issue('INVALID_LABEL', `Domain needs a label before ${suffix}`)];
  }

  const labels = prefix.split('.');
  for (const label of labels) {
    if (!LABEL_RE.test(label)) {
      issues.push(issue('INVALID_LABEL', `"${label}" is not a valid DNS label`));
    }
  }

  // Public TLDs first: dev/app/page must surface as PUBLIC_TLD, not RESERVED_DOMAIN.
  if (labels.some(isPublicTld)) {
    issues.push(issue('PUBLIC_TLD', `"${domain}" collides with a public TLD`));
  } else if (labels.some(isReservedName)) {
    issues.push(issue('RESERVED_DOMAIN', `"${domain}" uses a reserved name`));
  }

  const duplicate = options.existingRoutes?.find(
    (route) => route.domain.toLowerCase() === domain && route.id !== options.ignoreRouteId
  );
  if (duplicate) {
    issues.push(issue('DUPLICATE_DOMAIN', `"${domain}" is already mapped`));
  }

  return issues;
}

/** Validates an IPv4 address or a hostname. */
export function validateHost(rawHost: string): ValidationIssue[] {
  const host = rawHost.trim().toLowerCase();
  if (!host) {
    return [issue('INVALID_HOST', 'Target host is required')];
  }

  if (IPV4_RE.test(host)) {
    const octets = host.split('.').map(Number);
    if (octets.some((octet) => octet < 0 || octet > 255)) {
      return [issue('INVALID_HOST', `"${rawHost}" is not a valid IPv4 address`)];
    }
    return [];
  }

  if (!HOSTNAME_RE.test(host) || host.length > 253) {
    return [issue('INVALID_HOST', `"${rawHost}" is not a valid host`)];
  }

  return [];
}

/** Validates a TCP port number. */
export function validatePort(port: number): ValidationIssue[] {
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    return [issue('INVALID_PORT', `Port ${port} is out of range (1-65535)`)];
  }
  return [];
}

/**
 * Full pure validation of a route.
 *
 * Reachability (`TARGET_UNREACHABLE`) needs I/O and is checked by the backend,
 * not here. A route with no blocking issue is safe to persist.
 */
export function validateRoute(
  input: NewRoute,
  options: ValidateRouteOptions = {}
): ValidationResult {
  const issues: ValidationIssue[] = [
    ...validateDomain(String(input.domain ?? ''), options),
    ...validateHost(String(input.targetHost ?? '')),
    ...validatePort(input.targetPort)
  ];

  return { valid: !issues.some((entry) => entry.blocksSave), issues };
}

/** Non-blocking warning emitted by backends when a target does not respond. */
export function unreachableIssue(): ValidationIssue {
  return issue('TARGET_UNREACHABLE', 'Target does not respond');
}
