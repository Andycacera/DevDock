import { describe, expect, it } from 'bun:test';
import { PUBLIC_TLDS, RESERVED_DOMAINS, isPublicTld, isReservedName } from './reserved-domains';

describe('reserved domains', () => {
  it('flags RFC and LAN names', () => {
    for (const name of ['localhost', 'test', 'invalid', 'example', 'onion', 'home.arpa', 'local', 'lan', 'internal']) {
      expect(isReservedName(name)).toBe(true);
    }
  });

  it('flags public gTLDs with HSTS preload', () => {
    for (const name of ['dev', 'app', 'page']) {
      expect(isReservedName(name)).toBe(true);
      expect(isPublicTld(name)).toBe(true);
    }
  });

  it('does not flag a normal label', () => {
    expect(isReservedName('billing')).toBe(false);
    expect(isPublicTld('billing')).toBe(false);
  });

  it('keeps the public TLD list inside the reserved list', () => {
    for (const tld of PUBLIC_TLDS) {
      expect(RESERVED_DOMAINS).toContain(tld);
    }
  });
});
