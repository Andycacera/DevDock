import { Router } from 'express';
import type { ProxyController } from '@devdock/core';
import type { ProxyStatusDto } from '@devdock/shared';

/** `GET /proxy/status` and `POST /proxy/reload` (mock). */
export function createProxyRouter(proxy: ProxyController): Router {
  const router = Router();

  router.get('/status', async (_req, res) => {
    const dto: ProxyStatusDto = await proxy.status();
    res.json(dto);
  });

  router.post('/reload', async (_req, res) => {
    const dto: ProxyStatusDto = await proxy.reload();
    res.json(dto);
  });

  return router;
}
