<script lang="ts">
  import type { RouteStatus } from '@devdock/core'

  let { status }: { status: RouteStatus } = $props()

  const STATUS_CLASSES: Record<RouteStatus, Record<string, string>> = {
    active: {
      ['data-aqua-cyan']: ''
    },
    inactive: {
      ['data-warning']: ''
    },
    conflict: {
      ['data-danger']: ''
    },
    reserved: {
      ['data-sc']: ''
    },
    unassigned: {
      ['data-muted']: ''
    }
  }
</script>

<span data-chip {...STATUS_CLASSES[status]}>
  {status}
</span>
