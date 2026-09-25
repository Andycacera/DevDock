import type { DevDockBridge } from '@devdock/shared'

declare global {
  interface Window {
    /** Injected by the Electron preload. Present only inside the Electron shell. */
    devdock?: DevDockBridge
    /** Injected by Tauri. */
    __TAURI_INTERNALS__?: unknown
  }
}

export {}
