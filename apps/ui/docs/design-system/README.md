<!-- Context: ui/design-system | Priority: high | Version: 1.0 | Updated: 2026-09-23 -->

# Design System — DevDock UI

> Components that expose an API or need usage examples. Read this before building UI.

## What lives here

| Doc                        | Component                                  |
| -------------------------- | ------------------------------------------ |
| [toast.md](./toast.md)     | `notify` + `UiToaster`                     |
| [tooltip.md](./tooltip.md) | `UiTooltip`                                |
| [dialog.md](./dialog.md)   | `UiDialog`, `confirmDialog`, `alertDialog` |
| [popover.md](./popover.md) | `UiPopover`                                |

Other building blocks are documented by their styles and the showcase:

- Buttons: `apps/ui/src/styles/components/buttons.css` (`data-btn` + variants)
- Cards: `apps/ui/src/styles/components/cards.css` (`data-card`)
- Chips: `apps/ui/src/styles/components/chips.css` (`data-chip`)
- Forms: `UiSelect`, `UiSwitch`, `UiDatePicker` (`apps/ui/src/lib/components/forms/`)
- `UiStatusPill`, `UiLoader`

## Conventions

- **Exports** use the `Ui*` prefix (`UiTooltip`, `UiDialog`, …), even when the file does not
  (`tooltip.svelte`, `dialog.svelte`).
- **Styling** lives in `apps/ui/src/styles/components/*.css` and is keyed on `data-*`
  attributes. Components stay markup; styles stay CSS.
- **Tokens**: only `--ds-*` tokens / semantic Tailwind classes. Dark-only.
- Import from the barrel: `import { UiTooltip, notify } from '$lib'`.

## Global setup

The root layout (`apps/ui/src/routes/+layout.svelte`) mounts the global pieces once:

```svelte
<Tooltip.Provider>
  {@render children()}
  <UiToaster />
  <UiDialogHost />
</Tooltip.Provider>
```

- `Tooltip.Provider` is required by bits-ui for tooltips.
- `UiToaster` renders the toast viewport.
- `UiDialogHost` renders imperative `confirmDialog` / `alertDialog` requests.

## Showcase (dev only)

Every component has a live example on the **design-system page**, available at
`#/design-system` in development. The route fails with a 404 in production.

The app root (`#/`) always redirects to `#/dashboard`.
