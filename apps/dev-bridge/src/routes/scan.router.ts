import { Router } from 'express';
import type { ServiceSource } from '@devdock/core';
import type { ScanDto } from '@devdock/shared';

/** `GET /scan` */
export function createScanRouter(services: ServiceSource): Router {
  const router = Router();

  router.get('/', async (_req, res) => {
    const startedAt = performance.now();
    const detected = await services.scan();

    const dto: ScanDto = {
      scannedAt: new Date().toISOString(),
      durationMs: Math.round(performance.now() - startedAt),
      services: detected,
      errors: []
    };

    res.json(dto);
  });

  return router;
}
