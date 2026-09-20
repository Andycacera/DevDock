export interface BridgeConfig {
  port: number;
  /** Reserved for the future OS-backed source. Always false for now. */
  useOs: boolean;
}

const DEFAULT_PORT = 8787;

export function loadConfig(env: Record<string, string | undefined> = process.env): BridgeConfig {
  const parsed = env.PORT ? Number.parseInt(env.PORT, 10) : DEFAULT_PORT;
  return {
    port: Number.isFinite(parsed) ? parsed : DEFAULT_PORT,
    useOs: env.USE_OS === 'true'
  };
}
