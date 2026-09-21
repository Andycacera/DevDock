<script lang="ts">
  import Icon from '@iconify/svelte'
  import { Toaster } from 'svelte-sonner'
  import UiLoader from './loader.svelte'
</script>

<Toaster position="bottom-right" theme="dark" closeButton toastOptions={{ unstyled: true }}>
  {#snippet successIcon()}
    <Icon icon="material-symbols:check-circle-rounded" class="text-xl text-success" />
  {/snippet}

  {#snippet errorIcon()}
    <Icon icon="material-symbols:cancel-rounded" class="text-xl text-danger" />
  {/snippet}

  {#snippet warningIcon()}
    <Icon icon="material-symbols:warning-rounded" class="text-xl text-warning" />
  {/snippet}

  {#snippet infoIcon()}
    <Icon icon="material-symbols:info-rounded" class="text-xl text-aqua-cyan-300" />
  {/snippet}

  {#snippet loadingIcon()}
    <!-- <Icon icon="material-symbols:progress-activity" class="text-xl text-muted" /> -->
    <div class="ml-4">
      <UiLoader size={20} duration={700} />
    </div>
  {/snippet}
</Toaster>
