export interface SidenavItem {
  label: string
  path: string
  icon?: {
    name: string
    class?: string
  }
}

export interface SidenavState {
  items: SidenavItem[]
}

const SIDENAV_ITEMS: SidenavItem[] = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: {
      name: 'material-symbols:dashboard-rounded'
    }
  },
  {
    label: 'Tray',
    path: '/tray',
    icon: {
      name: 'material-symbols:chat-rounded'
    }
  }
]

function createSidenavStore(): SidenavState {
  const items: SidenavItem[] = $state(SIDENAV_ITEMS)

  return {
    get items() {
      return items
    }
  }
}

export const sidenavStore = createSidenavStore()
