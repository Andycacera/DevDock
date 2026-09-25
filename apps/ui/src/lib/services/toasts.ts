import { toast } from 'svelte-sonner'

/**
 * Global toast API.
 *
 * Wraps `svelte-sonner` so the app never imports it directly, and the
 * implementation can be swapped later without touching callers.
 */
export const notify = {
  success: toast.success,
  error: toast.error,
  warning: toast.warning,
  info: toast.info,
  loading: toast.loading,
  promise: toast.promise,
  dismiss: toast.dismiss,
  custom: toast.custom
}
