# Migration to Tauri

> What changes, what stays, and how to verify the migration.

## Principle

The UI depends on an interface, not on an implementation. Migrating shells means adding an adapter and a backend, not rewriting the UI.

## What stays untouched

```txt
apps/ui components      (unchanged)
packages/core           (unchanged)
packages/shared         (unchanged)
docs/                   (unchanged)
```

## What is added

```txt
apps/desktop-tauri/
  src-tauri/src/commands.rs
  src-tauri/src/lib.rs
  tauri.conf.json

apps/ui/src/lib/adapters/tauri-adapter.ts
```

## Command mapping

| Operation | Electron | Tauri |
|-----------|----------|-------|
| Scan ports | `ipcMain.handle('devdock:scan-ports')` | `#[tauri::command] fn scan_ports()` |
| Get routes | `ipcMain.handle('devdock:get-routes')` | `#[tauri::command] fn get_routes()` |
| Create route | `ipcMain.handle('devdock:create-route')` | `#[tauri::command] fn create_route(input)` |
| Open route | `ipcMain.handle('devdock:open-route')` | `#[tauri::command] fn open_route(id)` |

| Concern | Electron | Tauri |
|---------|----------|-------|
| Backend language | Node.js | Rust |
| Registration | `ipcMain.handle` | `generate_handler!` |
| Call | `ipcRenderer.invoke` | `invoke` |
| Exposure | `contextBridge` | automatic |
| Serialization | structured clone | serde |

## Rust command example

```rust
#[tauri::command]
fn scan_ports() -> Result<ScanDto, String> {
    let services = system::scan_listening_ports().map_err(|e| e.to_string())?;
    Ok(ScanDto { services })
}
```

```rust
tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![
        scan_ports,
        get_routes,
        create_route,
        open_route,
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
```

## Adapter

```ts
export function createTauriAdapter(invoke: TauriInvoke): DevDockAdapter {
  return {
    async scanPorts() {
      const dto = await invoke<ScanDto>('scan_ports');
      return dto.services.map(toDetectedService);
    },
  };
}
```

The Tauri SDK is imported dynamically so the Electron build never loads it.

## Migration steps

1. Scaffold `apps/desktop-tauri`
2. Port the operations to Rust commands
3. Write `tauri-adapter.ts` against the same port
4. Point the Tauri build at the existing UI build output
5. Verify detection resolves to `tauri`
6. Compare memory usage, startup time, and packaging size
7. Decide whether to keep both shells or drop Electron

## Verification criteria

- [ ] The UI source is unchanged
- [ ] `packages/core` is unchanged
- [ ] All adapter tests pass against the Tauri adapter
- [ ] No `import` of the Tauri SDK in the Electron build
- [ ] Tray, window lifecycle, and open-in-browser behave the same
- [ ] Privileged operations still go through the same layer

## Risks

| Risk | Mitigation |
|------|------------|
| Rust rewrite drifts from Node behavior | Port logic from `core`, do not reimplement rules |
| Serialization differences | Keep DTOs explicit and covered by tests |
| Tray behavior differs per desktop environment | Test on GNOME first |

## Related

- [adapters.md](./adapters.md)
- [desktop-shell.md](./desktop-shell.md)
- [roadmap.md](../roadmap.md)
