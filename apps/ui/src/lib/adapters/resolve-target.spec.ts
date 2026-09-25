import { describe, expect, it } from 'vitest'
import type { DevDockBridge } from '@devdock/shared'
import type { RuntimeEnv, RuntimeGlobals } from './environment'
import { resolveTarget } from './resolve-target'

const fakeBridge = {} as DevDockBridge

function makeEnv(overrides: Partial<RuntimeEnv> = {}): RuntimeEnv {
  return { isDev: true, ...overrides }
}

function makeGlobals(overrides: Partial<RuntimeGlobals> = {}): RuntimeGlobals {
  return { ...overrides }
}

describe('resolveTarget', () => {
  it('detects electron when window.devdock exists', () => {
    const result = resolveTarget(makeGlobals({ devdock: fakeBridge }), makeEnv())
    expect(result.target).toBe('electron')
  })

  it('lets the explicit override win', () => {
    const result = resolveTarget(
      makeGlobals({ devdock: fakeBridge }),
      makeEnv({ forcedTarget: 'mock' })
    )
    expect(result.target).toBe('mock')
  })

  it('detects tauri internals', () => {
    const result = resolveTarget(makeGlobals({ tauriInternals: {} }), makeEnv())
    expect(result.target).toBe('tauri')
  })

  it('uses the bridge url when no shell is present', () => {
    const result = resolveTarget(makeGlobals(), makeEnv({ bridgeUrl: 'http://localhost:8787' }))
    expect(result).toEqual({ target: 'bridge', baseUrl: 'http://localhost:8787' })
  })

  it('falls back to mock', () => {
    const result = resolveTarget(makeGlobals(), makeEnv())
    expect(result.target).toBe('mock')
  })
})
