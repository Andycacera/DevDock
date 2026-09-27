<script lang="ts">
  import Icon from '@iconify/svelte'
  import type { DetectedService } from '@devdock/core'
  import { serviceIcon } from '$lib'

  let { service }: { service: DetectedService } = $props()
</script>

<div
  data-card
  data-btn
  class="flex items-center gap-4 p-4 w-80 shrink-0 @min-[1024px]:w-full max-[600px]:gap-3 max-[600px]:p-3"
>
  <div
    class="flex size-14 shrink-0 items-center justify-center rounded-md bg-warning-900/30 max-[600px]:size-10"
  >
    <Icon icon={serviceIcon(service.processName)} class="text-2xl text-warning-200" />
  </div>

  <div class="flex flex-col gap-2 min-w-0 w-full">
    <div class="flex items-center gap-2 text-lg max-[600px]:text-base">
      <span class="font-jb-mono">{service.port}</span>
      <Icon icon="material-symbols:arrow-forward-rounded" class="text-muted" />
      <span class="font-semibold truncate">{service.processName ?? 'unknown'}</span>
    </div>

    <!-- Compact view (<600px): essential info only, metadata block hidden. -->
    <dl class="grid grid-cols-3 gap-4 max-[600px]:hidden">
      <div class="flex flex-col">
        <dt class="text-xs uppercase tracking-wide text-muted">PID</dt>
        <dd class="font-jb-mono text-sm">{service.pid ?? '—'}</dd>
      </div>
      <div class="flex flex-col">
        <dt class="text-xs uppercase tracking-wide text-muted">Host</dt>
        <dd class="font-jb-mono text-sm truncate">{service.host}</dd>
      </div>
      <div class="flex flex-col">
        <dt class="text-xs uppercase tracking-wide text-muted">Protocol</dt>
        <dd class="font-jb-mono text-sm uppercase">{service.protocol}</dd>
      </div>
    </dl>
  </div>
</div>
