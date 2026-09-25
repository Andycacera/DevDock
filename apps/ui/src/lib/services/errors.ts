import type { DevDockErrorCode } from '@devdock/shared'
import { DevDockError } from '@devdock/shared'

/**
 * Error shape consumed by the UI.
 *
 * Adapters throw `DevDockError`; this normalizes anything thrown into a single
 * type the whole app can render. A global toast mechanism is planned later.
 */
export interface UiError {
  code: DevDockErrorCode | 'UNKNOWN'
  message: string
  details: string[]
  retryable: boolean
}

const RETRYABLE_CODES: readonly DevDockErrorCode[] = ['NETWORK_ERROR', 'INVALID_RESPONSE']

export function toUiError(error: unknown): UiError {
  if (error instanceof DevDockError) {
    return {
      code: error.code,
      message: error.message,
      details: error.details,
      retryable: RETRYABLE_CODES.includes(error.code)
    }
  }
  if (error instanceof Error) {
    return { code: 'UNKNOWN', message: error.message, details: [], retryable: false }
  }
  return { code: 'UNKNOWN', message: 'Unexpected error', details: [], retryable: false }
}
