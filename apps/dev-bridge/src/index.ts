import { createApp } from './app';
import { loadConfig } from './config';
import { createDefaultDeps } from './deps';

const config = loadConfig();
const app = createApp(createDefaultDeps());

const server = app.listen(config.port);

server.on('listening', () => {
  console.log(`[dev-bridge] listening on http://localhost:${config.port}`);
});

server.on('error', (error: Error) => {
  console.error('[dev-bridge] failed to start:', error);
  process.exit(1);
});
