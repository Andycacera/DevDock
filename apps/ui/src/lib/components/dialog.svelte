<script lang="ts">
  import Icon from '@iconify/svelte'
  import { Dialog } from 'bits-ui'
  import type { Snippet } from 'svelte'

  let {
    open = $bindable(false),
    trigger,
    title,
    description,
    children,
    actions,
    closeOnOutsideClick = true,
    closeOnEscape = true,
    showClose = true,
    size = 'md',
    class: className = '',
    onOpenChange,
    onOpenChangeComplete
  }: {
    open?: boolean
    trigger?: Snippet
    title: string
    description?: string
    children?: Snippet
    actions?: Snippet
    closeOnOutsideClick?: boolean
    closeOnEscape?: boolean
    showClose?: boolean
    size?: 'sm' | 'md' | 'lg'
    class?: string
    onOpenChange?: (open: boolean) => void
    onOpenChangeComplete?: (open: boolean) => void
  } = $props()
</script>

<Dialog.Root bind:open {onOpenChange} {onOpenChangeComplete}>
  {#if trigger}
    <Dialog.Trigger>
      {@render trigger()}
    </Dialog.Trigger>
  {/if}

  <Dialog.Portal>
    <Dialog.Overlay data-dialog-overlay />

    <Dialog.Content
      data-dialog-content
      data-size={size}
      class={className}
      interactOutsideBehavior={closeOnOutsideClick ? 'close' : 'ignore'}
      escapeKeydownBehavior={closeOnEscape ? 'close' : 'ignore'}
    >
      <Dialog.Title data-dialog-title>{title}</Dialog.Title>

      {#if description}
        <Dialog.Description data-dialog-description>{description}</Dialog.Description>
      {/if}

      {#if children}
        <div data-dialog-body>
          {@render children()}
        </div>
      {/if}

      {#if actions}
        <div data-dialog-actions>
          {@render actions()}
        </div>
      {/if}

      {#if showClose}
        <Dialog.Close data-dialog-close aria-label="Close">
          <Icon icon="material-symbols:close-rounded" class="text-xl" />
        </Dialog.Close>
      {/if}
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
