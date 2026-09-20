import { describe, expect, it } from 'bun:test';
import { computeStatus } from './compute-status';

describe('computeStatus', () => {
  it('reserved wins over everything', () => {
    expect(
      computeStatus({ hasRoute: true, isReserved: true, hasConflict: true, targetResponds: true })
    ).toBe('reserved');
  });

  it('conflict wins over active', () => {
    expect(
      computeStatus({ hasRoute: true, isReserved: false, hasConflict: true, targetResponds: true })
    ).toBe('conflict');
  });

  it('returns unassigned when no route exists', () => {
    expect(
      computeStatus({ hasRoute: false, isReserved: false, hasConflict: false, targetResponds: null })
    ).toBe('unassigned');
  });

  it('returns active when the target responds', () => {
    expect(
      computeStatus({ hasRoute: true, isReserved: false, hasConflict: false, targetResponds: true })
    ).toBe('active');
  });

  it('returns inactive when the target does not respond', () => {
    expect(
      computeStatus({ hasRoute: true, isReserved: false, hasConflict: false, targetResponds: false })
    ).toBe('inactive');
  });
});
