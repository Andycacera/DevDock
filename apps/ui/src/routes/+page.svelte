<script lang="ts">
  import { Button } from 'bits-ui'
  import Icon from '@iconify/svelte'
  import {
    UiDatePicker,
    UiDialog,
    UiPopover,
    UiSelect,
    UiSwitch,
    UiTooltip,
    alertDialog,
    confirmDialog,
    notify
  } from '$lib'

  const selectItems = [
    { value: 'dev', label: 'Development' },
    { value: 'design', label: 'Design' },
    { value: 'ops', label: 'DevOps' },
    { value: 'disabled', label: 'Disabled option', disabled: true }
  ]

  let selectedArea = $state('')
  let tooltipOpen = $state(false)
  let dialogOpen = $state(false)
  let lockedDialogOpen = $state(false)

  function runPromiseToast() {
    notify.promise(new Promise(resolve => setTimeout(resolve, 1500)), {
      loading: 'Applying config…',
      success: 'Config applied',
      error: 'Apply failed'
    })
  }

  async function runConfirm() {
    const ok = await confirmDialog({
      title: 'Delete route?',
      description: 'This cannot be undone.',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      confirmType: 'danger',
      cancelType: 'secondary'
    })

    if (ok) notify.success('Route deleted')
    else notify.info('Cancelled')
  }

  async function runAlert() {
    await alertDialog({
      title: 'Proxy reloaded',
      description: 'The routing config is up to date.',
      confirmText: 'OK',
      confirmType: 'info'
    })
  }
</script>

<div class="flex flex-col p-8 w-full h-full justify-start items-start">
  <span>Buttons</span>
  <div class="flex w-full flex-wrap gap-8 mt-4">
    <Button.Root data-btn data-pr class="px-4 py-2">Primary button</Button.Root>
    <Button.Root data-btn data-sc class="px-4 py-2">Secondary button</Button.Root>

    <Button.Root data-btn data-success class="px-4 py-2">Success button</Button.Root>
    <Button.Root data-btn data-warning class="px-4 py-2">Warning button</Button.Root>
    <Button.Root data-btn data-danger class="px-4 py-2">Danger button</Button.Root>
    <Button.Root data-btn data-info class="px-4 py-2">Info button</Button.Root>

    <Button.Root data-btn data-pr class="p-4">
      <Icon class="text-2xl leading-none" icon="material-symbols:home-rounded" />
    </Button.Root>
    <Button.Root data-btn data-sc class="p-4">
      <Icon class="text-2xl leading-none" icon="material-symbols:rocket-launch-rounded" />
    </Button.Root>

    <Button.Root data-btn data-base data-bg-pr class="p-4">
      <Icon class="text-2xl leading-none" icon="material-symbols:downloading-rounded" />
    </Button.Root>
    <Button.Root data-btn data-base data-bg-sc class="p-4">
      <Icon class="text-2xl leading-none" icon="material-symbols:pinch-rounded" />
    </Button.Root>

    <Button.Root data-btn data-base data-bg-success class="p-4">
      <Icon class="text-2xl leading-none" icon="material-symbols:check-circle-rounded" />
    </Button.Root>
    <Button.Root data-btn data-base data-bg-warning class="p-4">
      <Icon class="text-2xl leading-none" icon="material-symbols:warning-rounded" />
    </Button.Root>
    <Button.Root data-btn data-base data-bg-danger class="p-4">
      <Icon class="text-2xl leading-none" icon="material-symbols:cancel-rounded" />
    </Button.Root>

    <Button.Root data-btn data-base data-outline class="p-4">
      <Icon class="text-2xl leading-none" icon="material-symbols:download-rounded" />
    </Button.Root>
    <Button.Root data-btn data-base data-outline class="p-4">
      <Icon class="text-2xl leading-none" icon="material-symbols:pin-rounded" />
    </Button.Root>
    <Button.Root data-btn data-base data-outline class="p-4">
      <Icon class="text-2xl leading-none" icon="material-symbols:refresh-rounded" />
    </Button.Root>
  </div>

  <div class="flex flex-col gap-2 w-full mt-4">
    <span>Forms</span>
    <div class="flex w-full h-fit flex-wrap gap-8">
      <input type="text" placeholder="Text input" />
      <textarea placeholder="Textarea"></textarea>

      <UiSelect bind:value={selectedArea} items={selectItems} placeholder="Select a team area" />
      <UiDatePicker />

      <UiSwitch size="sm" />
      <UiSwitch />
      <UiSwitch size="lg" />
      <UiSwitch checked color="--ds-warning-700" />
    </div>
  </div>

  <div class="flex flex-col gap-2 w-full mt-4">
    <span>Cards</span>
    <div class="flex w-full flex-wrap gap-8">
      <div data-card class="p-4 w-75">Card</div>
      <div class="p-4 bg-background-2 rounded-md">
        <div data-card data-inverted class="p-4 w-75">Card inverted</div>
      </div>

      <div data-card data-bg-primary class="p-4 w-75">Card with primary background</div>
      <div data-card data-bg-secondary class="p-4 w-75">Card with secondary background</div>
    </div>
  </div>

  <div class="flex flex-col gap-2 w-full mt-4">
    <span>Chips</span>
    <div class="flex w-full flex-wrap gap-8">
      <span data-chip class="bg-accent-700/30 text-accent-100">Custom chip</span>
      <span data-chip data-pr>Chip</span>
      <span data-chip data-sc>Chip</span>
      <span data-chip data-muted>Chip</span>
      <span data-chip data-success>Chip</span>
      <span data-chip data-warning>Chip</span>
      <span data-chip data-danger>Chip</span>
      <span data-chip data-inverted>Chip</span>
      <span data-chip data-aqua-cyan>Chip</span>
      <span data-chip data-spring-green>Chip</span>
      <span data-chip data-signal-orange>Chip</span>
      <span data-chip data-electric-purple>Chip</span>
      <span data-chip data-vivid-magenta>Chip</span>
      <span data-chip data-berry-pink>Chip</span>
    </div>
  </div>

  <div class="flex flex-col gap-2 w-full mt-4">
    <span>Links</span>
    <a href="#/dashboard">Dashboard</a>
    <a href="#/tray">Tray</a>
  </div>

  <div class="flex flex-col gap-2 w-full mt-8">
    <span>Tooltips</span>
    <div class="flex w-full flex-wrap items-center gap-8 mt-2">
      <UiTooltip content="Default tooltip" data-btn data-base data-outline class="px-4 py-2">
        {#snippet trigger()}Hover me{/snippet}
      </UiTooltip>

      <UiTooltip
        content="Right side"
        side="right"
        data-btn
        data-base
        data-outline
        class="px-4 py-2"
      >
        {#snippet trigger()}Right{/snippet}
      </UiTooltip>

      <UiTooltip
        content="Bottom side"
        side="bottom"
        data-btn
        data-base
        data-outline
        class="px-4 py-2"
      >
        {#snippet trigger()}Bottom{/snippet}
      </UiTooltip>

      <UiTooltip
        bind:open={tooltipOpen}
        content="Controlled tooltip"
        data-btn
        data-base
        data-outline
        class="px-4 py-2"
      >
        {#snippet trigger()}Controlled{/snippet}
      </UiTooltip>

      <button data-btn data-pr class="px-4 py-2" onclick={() => (tooltipOpen = !tooltipOpen)}>
        Toggle tooltip
      </button>
    </div>
  </div>

  <div class="flex flex-col gap-2 w-full mt-8">
    <span>Toasts</span>
    <div class="flex w-full flex-wrap gap-4 mt-2">
      <button
        data-btn
        data-success
        class="px-4 py-2"
        onclick={() => notify.success('Route applied')}
      >
        Success
      </button>
      <button
        data-btn
        data-danger
        class="px-4 py-2"
        onclick={() => notify.error('Proxy reload failed')}
      >
        Error
      </button>
      <button
        data-btn
        data-warning
        class="px-4 py-2"
        onclick={() => notify.warning('Target unreachable')}
      >
        Warning
      </button>
      <button data-btn data-info class="px-4 py-2" onclick={() => notify.info('Scan started')}>
        Info
      </button>
      <button data-btn data-sc class="px-4 py-2" onclick={() => notify.loading('Scanning ports…')}>
        Loading
      </button>
      <button data-btn data-pr class="px-4 py-2" onclick={runPromiseToast}>Promise</button>
      <button data-btn data-base data-outline class="px-4 py-2" onclick={() => notify.dismiss()}>
        Dismiss all
      </button>
    </div>
  </div>

  <div class="flex flex-col gap-2 w-full mt-8">
    <span>Dialogs</span>
    <div class="flex w-full flex-wrap gap-4 mt-2">
      <button data-btn data-pr class="px-4 py-2" onclick={() => (dialogOpen = true)}>
        Declarative dialog
      </button>
      <button data-btn data-danger class="px-4 py-2" onclick={runConfirm}>confirmDialog</button>
      <button data-btn data-info class="px-4 py-2" onclick={runAlert}>alertDialog</button>
      <button data-btn data-sc class="px-4 py-2" onclick={() => (lockedDialogOpen = true)}>
        No outside close
      </button>
    </div>

    <UiDialog
      bind:open={dialogOpen}
      title="Create route"
      description="Map a friendly domain to a local service."
    >
      <p>Dialog body content goes here.</p>
      {#snippet actions()}
        <button data-btn data-sc class="px-4 py-2" onclick={() => (dialogOpen = false)}
          >Cancel</button
        >
        <button data-btn data-pr class="px-4 py-2" onclick={() => (dialogOpen = false)}
          >Create</button
        >
      {/snippet}
    </UiDialog>

    <UiDialog
      bind:open={lockedDialogOpen}
      title="Locked dialog"
      description="Closing outside or with Escape is disabled."
      closeOnOutsideClick={false}
      closeOnEscape={false}
    >
      <p>This dialog only closes with the button below.</p>
      {#snippet actions()}
        <button data-btn data-pr class="px-4 py-2" onclick={() => (lockedDialogOpen = false)}>
          Close
        </button>
      {/snippet}
    </UiDialog>
  </div>

  <div class="flex flex-col gap-2 w-full mt-8">
    <span>Popovers</span>
    <div class="flex w-full flex-wrap gap-8 mt-2">
      <UiPopover data-btn data-base data-outline class="px-4 py-2">
        {#snippet trigger()}Open popover{/snippet}
        <div class="flex flex-col gap-2">
          <span class="font-semibold">Popover content</span>
          <p class="text-sm text-muted">Dynamic content passed by the caller.</p>
          <button
            data-btn
            data-pr
            class="px-3 py-1 self-start"
            onclick={() => notify.info('Popover action triggered')}
          >
            Action
          </button>
        </div>
      </UiPopover>
    </div>
  </div>
</div>
