# Desktop Shell

> Electron's role, its process model, and what must stay out of it.

## Responsibilities

The shell exists for two reasons: render the UI, and reach the operating system.

| Responsibility | Owner |
|----------------|-------|
| Render the UI | Renderer (Chromium) |
| Access the OS | Main process (Node.js) |
| Bridge the two safely | Preload |
| Windows and lifecycle | Main |
| Tray icon and menu | Main |
| Open the default browser | Main |
| Autostart | Main |
| Packaging | Build tooling |

## Non-responsibilities

The shell must never contain:

- Domain validation
- Conflict detection
- Route state computation
- Proxy config generation rules
- Any business decision

Those live in `packages/core`, so the shell and the UI use the same rules.

## Process model

```txt
+-------------------------------------------------+
| Main process (Node.js)                          |
|  - app lifecycle, single instance               |
|  - BrowserWindow creation                       |
|  - Tray                                         |
|  - ipcMain.handle(...)                          |
|  - privileged operations                        |
+----------------------+--------------------------+
                       | IPC
+----------------------v--------------------------+
| Renderer (Chromium)                             |
|  - the Svelte UI                                |
|  - no Node, sandboxed                           |
|  +-------------------------------------------+  |
|  | Preload                                   |  |
|  |  - contextBridge.exposeInMainWorld        |  |
|  |  - ipcRenderer.invoke wrappers            |  |
|  +-------------------------------------------+  |
+-------------------------------------------------+
```

## IPC

| Direction | API | Use |
|-----------|-----|-----|
| Renderer -> Main (request/response) | `ipcRenderer.invoke` / `ipcMain.handle` | Actions |
| Main -> Renderer (push) | `webContents.send` / `ipcRenderer.on` | State changes |

Guidelines:

- Batch status updates instead of sending large payloads repeatedly
- Use request/response for explicit user actions
- Use push events only for meaningful state changes

## Window configuration

```ts
new BrowserWindow({
  width: 1100,
  height: 720,
  show: false, // show after ready-to-show
  webPreferences: {
    preload: path.join(__dirname, '../preload/preload.js'),
    contextIsolation: true,
    nodeIntegration: false,
    sandbox: true,
  },
});
```

`contextIsolation: true` and `nodeIntegration: false` are mandatory.

## Loading the UI

Electron loads the UI's static build. It does not import UI code.

```ts
// development
await win.loadURL('http://localhost:5173');

// production
await win.loadFile(path.join(__dirname, '../ui/index.html'));
```

## Preload surface

The preload is the security boundary. It exposes a fixed allow-list:

```ts
contextBridge.exposeInMainWorld('devdock', {
  scanPorts: () => ipcRenderer.invoke('devdock:scan-ports'),
  getRoutes: () => ipcRenderer.invoke('devdock:get-routes'),
  createRoute: (input) => ipcRenderer.invoke('devdock:create-route', input),
  updateRoute: (id, patch) => ipcRenderer.invoke('devdock:update-route', id, patch),
  deleteRoute: (id) => ipcRenderer.invoke('devdock:delete-route', id),
  getProxyStatus: () => ipcRenderer.invoke('devdock:proxy-status'),
  reloadProxy: () => ipcRenderer.invoke('devdock:proxy-reload'),
  openRoute: (id) => ipcRenderer.invoke('devdock:open-route', id),
});
```

The renderer can only call these. Nothing else.

## Tray

- One tray icon, created in the main process
- A small popover window, created on demand and hidden when closed
- Never always-on-top
- Destroy or hide windows intentionally instead of keeping them alive

Tray actions: open dashboard, refresh scan, pause scanning, quit.

## Lifecycle

- Single instance lock
- Show the main window after `ready-to-show`, never before
- Closing the main window hides it; the tray keeps the app alive
- Quit only through an explicit action

## Related

- [adapters.md](./adapters.md)
- [privileged-ops.md](./privileged-ops.md)
- [layers.md](./layers.md)
