import { describe, expect, it } from 'bun:test';
import { validateRoute, unreachableIssue } from './validate-route';
import type { NewRoute } from '../domain/route';

const validRoute: NewRoute = {
  domain: 'billing.localhost',
  targetHost: '127.0.0.1',
  targetPort: 4200
};

function codesOf(input: NewRoute, options?: Parameters<typeof validateRoute>[1]) {
  return validateRoute(input, options).issues.map((issue) => issue.code);
}

describe('validateRoute', () => {
  it('accepts a valid route', () => {
    const result = validateRoute(validRoute);
    expect(result.valid).toBe(true);
    expect(result.issues).toHaveLength(0);
  });

  it('rejects a domain that does not end in .localhost', () => {
    expect(codesOf({ ...validRoute, domain: 'billing' })).toContain('INVALID_LABEL');
  });

  it('rejects an invalid DNS label', () => {
    expect(codesOf({ ...validRoute, domain: 'bad_label.localhost' })).toContain('INVALID_LABEL');
  });

  it('rejects a reserved domain', () => {
    expect(codesOf({ ...validRoute, domain: 'internal.localhost' })).toContain('RESERVED_DOMAIN');
  });

  it('reports public TLDs as PUBLIC_TLD', () => {
    const codes = codesOf({ ...validRoute, domain: 'dev.localhost' });
    expect(codes).toContain('PUBLIC_TLD');
    expect(codes).not.toContain('RESERVED_DOMAIN');
  });

  it('rejects a duplicate domain', () => {
    const codes = codesOf(validRoute, {
      existingRoutes: [{ id: 'r1', domain: 'billing.localhost' }]
    });
    expect(codes).toContain('DUPLICATE_DOMAIN');
  });

  it('ignores the edited route when checking duplicates', () => {
    const codes = codesOf(validRoute, {
      existingRoutes: [{ id: 'r1', domain: 'billing.localhost' }],
      ignoreRouteId: 'r1'
    });
    expect(codes).not.toContain('DUPLICATE_DOMAIN');
  });

  it('rejects an invalid host', () => {
    expect(codesOf({ ...validRoute, targetHost: 'not a host' })).toContain('INVALID_HOST');
    expect(codesOf({ ...validRoute, targetHost: '999.999.999.999' })).toContain('INVALID_HOST');
  });

  it('accepts a hostname target', () => {
    expect(validateRoute({ ...validRoute, targetHost: 'api.internal-net' }).valid).toBe(true);
  });

  it('rejects an out-of-range port', () => {
    expect(codesOf({ ...validRoute, targetPort: 70000 })).toContain('INVALID_PORT');
    expect(codesOf({ ...validRoute, targetPort: 0 })).toContain('INVALID_PORT');
  });

  it('treats TARGET_UNREACHABLE as non-blocking', () => {
    const warning = unreachableIssue();
    expect(warning.blocksSave).toBe(false);
  });
});
