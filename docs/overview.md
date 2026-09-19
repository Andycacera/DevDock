# Overview

> DevDock is a lightweight Linux desktop utility that helps developers manage local development services through friendly local domains.

## The problem

Developers run several services at once — frontends, APIs, internal tools — each on its own raw address:

- `localhost:3000`
- `localhost:5173`
- `192.168.1.50:8080`
- `10.0.0.25:9000`

Remembering and typing those addresses is slow, error-prone, and gets worse when services move to different ports or live behind LAN/VPN addresses.

## The solution

DevDock detects active services, lets you assign them readable local domains, and keeps the routing configuration in sync.

```txt
localhost:4200     -> webapp.localhost
localhost:5173     -> vite-app.localhost
localhost:8080     -> api.localhost
192.168.1.50:8080  -> internal-api.localhost
```

The app acts as a **developer-friendly UI layer** over local DNS and reverse proxy configuration. It does not replace a proxy or a DNS server — it manages them.

## What DevDock is not

- Not a reverse proxy replacement
- Not a DNS server
- Not a service orchestrator or container manager
- Not a remote infrastructure tool

## Target users

| Segment | Who | What they need |
|---------|-----|----------------|
| Primary | Linux devs running many local services | Fast, readable access to services |
| Secondary | Devs working with LAN/VPN services | Visibility into network-exposed services |
| Tertiary | GNOME power users | A quiet background utility with tray access |

## Target environment

- Linux desktop, GNOME-first
- Local development workflows
- Services on `localhost`, local Wi-Fi, or VPN-accessible addresses

## Core use cases

1. **Manage local frontend projects** — detect active dev servers and map them to domains
2. **Manage local/internal APIs** — map API ports, including LAN/VPN targets
3. **Detect unassigned ports** — see what is running without a domain yet
4. **Open configured services** — launch assigned routes in the browser
5. **Background tray access** — check status and act without opening the dashboard

## Value

**For users**

- Open `app.localhost` instead of `localhost:3000`
- See unassigned ports at a glance
- Manage routes from one place

**For the project**

- Fast, low-friction developer workflow
- Clear foundation for proxy/DNS automation

## Name

**DevDock** — short, developer-oriented, suggests a docked utility that stays available in the desktop environment, and fits the GNOME tray concept.
