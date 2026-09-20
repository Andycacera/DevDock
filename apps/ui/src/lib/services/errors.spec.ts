import { describe, expect, it } from 'vitest';
import { DevDockError } from '@devdock/shared';
import { toUiError } from './errors';

describe('toUiError', () => {
  it('maps a DevDockError', () => {
    const ui = toUiError(new DevDockError('VALIDATION_FAILED', 'bad', ['detail']));
    expect(ui.code).toBe('VALIDATION_FAILED');
    expect(ui.message).toBe('bad');
    expect(ui.details).toEqual(['detail']);
    expect(ui.retryable).toBe(false);
  });

  it('marks network errors as retryable', () => {
    expect(toUiError(new DevDockError('NETWORK_ERROR', 'down')).retryable).toBe(true);
  });

  it('maps an unknown thrown value', () => {
    const ui = toUiError('boom');
    expect(ui.code).toBe('UNKNOWN');
    expect(ui.message).toBe('Unexpected error');
  });

  it('maps a generic Error', () => {
    const ui = toUiError(new Error('nope'));
    expect(ui.message).toBe('nope');
  });
});
