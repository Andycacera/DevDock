import { describe, expect, it } from 'bun:test';
import { createFixtureSource } from './fixture-source';
import { FIXTURE_ROUTES } from '../fixtures/routes';

describe('createFixtureSource', () => {
  it('marks every service as unassigned when there are no routes', async () => {
    const source = createFixtureSource(() => []);
    const services = await source.scan();

    expect(services.length).toBeGreaterThan(0);
    expect(services.every((service) => service.status === 'unassigned')).toBe(true);
    expect(services.every((service) => service.hasDomain === false)).toBe(true);
  });

  it('derives status from matching routes', async () => {
    const source = createFixtureSource(() => FIXTURE_ROUTES);
    const services = await source.scan();

    const billing = services.find((service) => service.port === 4200);
    expect(billing?.hasDomain).toBe(true);
    expect(billing?.status).toBe('active');

    const lanApi = services.find(
      (service) => service.port === 8080 && service.sourceType === 'lan'
    );
    expect(lanApi?.status).toBe('inactive');
  });
});
