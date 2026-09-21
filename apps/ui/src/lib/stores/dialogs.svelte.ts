export type DialogButtonType =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info';

export interface ConfirmDialogOptions {
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  confirmType?: DialogButtonType;
  cancelType?: DialogButtonType;
  confirmClass?: string;
  cancelClass?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export interface AlertDialogOptions {
  title: string;
  description?: string;
  confirmText?: string;
  confirmType?: DialogButtonType;
  confirmClass?: string;
  onConfirm?: () => void;
}

export type DialogRequest =
  | { kind: 'confirm'; options: ConfirmDialogOptions; resolve: (value: boolean) => void }
  | { kind: 'alert'; options: AlertDialogOptions; resolve: (value: boolean) => void };

/** Maps a dialog button type to the design-system button attribute. */
export const DIALOG_BUTTON_ATTRS: Record<DialogButtonType, Record<string, string>> = {
  primary: { 'data-pr': '' },
  secondary: { 'data-sc': '' },
  success: { 'data-success': '' },
  warning: { 'data-warning': '' },
  danger: { 'data-danger': '' },
  info: { 'data-info': '' }
};

let request = $state<DialogRequest | null>(null);

export const dialogStore = {
  get request() {
    return request;
  }
};

/** Opens a confirm dialog and resolves with the user's choice. */
export function confirmDialog(options: ConfirmDialogOptions): Promise<boolean> {
  return new Promise((resolve) => {
    request = { kind: 'confirm', options, resolve };
  });
}

/** Opens an alert dialog with a single confirm button. */
export function alertDialog(options: AlertDialogOptions): Promise<boolean> {
  return new Promise((resolve) => {
    request = { kind: 'alert', options, resolve };
  });
}

/** Closes the active dialog, runs its callbacks, and resolves its promise. */
export function resolveDialog(result: boolean): void {
  const current = request;
  if (!current) return;

  if (result) {
    current.options.onConfirm?.();
  } else if (current.kind === 'confirm') {
    current.options.onCancel?.();
  }

  current.resolve(result);
  request = null;
}
