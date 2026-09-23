<script lang="ts">
  import {
    DIALOG_BUTTON_ATTRS,
    clearDialog,
    dialogStore,
    resolveDialog
  } from '$lib/stores/dialogs.svelte'
  import UiDialog from './dialog.svelte'

  const request = $derived(dialogStore.request)
  const title = $derived(request?.options.title ?? '')
  const description = $derived(request?.options.description)
  const confirmText = $derived(request?.options.confirmText ?? 'Confirm')
  const confirmType = $derived(request?.options.confirmType ?? 'primary')
  const confirmClass = $derived(request?.options.confirmClass ?? '')
  const isConfirm = $derived(request?.kind === 'confirm')
  const cancelText = $derived(
    request && request.kind === 'confirm' ? (request.options.cancelText ?? 'Cancel') : 'Cancel'
  )
  const cancelType = $derived(
    request && request.kind === 'confirm'
      ? (request.options.cancelType ?? 'secondary')
      : 'secondary'
  )
  const cancelClass = $derived(
    request && request.kind === 'confirm' ? (request.options.cancelClass ?? '') : ''
  )
</script>

<UiDialog
  open={dialogStore.open}
  {title}
  {description}
  closeOnOutsideClick={false}
  showClose={false}
  size="sm"
  onOpenChange={value => {
    if (!value) resolveDialog(false)
  }}
  onOpenChangeComplete={value => {
    if (!value) clearDialog()
  }}
>
  {#snippet actions()}
    {#if isConfirm}
      <button
        type="button"
        data-btn
        {...DIALOG_BUTTON_ATTRS[cancelType]}
        class="px-4 py-2 {cancelClass}"
        onclick={() => resolveDialog(false)}
      >
        {cancelText}
      </button>
    {/if}

    <button
      type="button"
      data-btn
      {...DIALOG_BUTTON_ATTRS[confirmType]}
      class="px-4 py-2 {confirmClass}"
      onclick={() => resolveDialog(true)}
    >
      {confirmText}
    </button>
  {/snippet}
</UiDialog>
