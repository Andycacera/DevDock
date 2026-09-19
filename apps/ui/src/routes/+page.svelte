<script lang="ts">
  import { Button } from 'bits-ui'
  import Icon from '@iconify/svelte'
  import { UiDatePicker, UiSelect, UiSwitch } from '$lib'

  const selectItems = [
    { value: 'dev', label: 'Development' },
    { value: 'design', label: 'Design' },
    { value: 'ops', label: 'DevOps' },
    { value: 'disabled', label: 'Disabled option', disabled: true }
  ]

  let selectedArea = $state('')
</script>

<span>Buttons</span>
<div class="flex w-full flex-wrap gap-8 mt-4">
  <Button.Root data-btn data-pr class="px-4 py-2">Primary button</Button.Root>
  <Button.Root data-btn data-sc class="px-4 py-2">Secondary button</Button.Root>

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
  <span>Links</span>
  <a href="#/dashboard">Dashboard</a>
  <a href="#/tray">Tray</a>
</div>
