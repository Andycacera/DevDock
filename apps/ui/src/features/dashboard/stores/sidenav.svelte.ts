export interface SidenavItem {
  label: string
  path: string
  icon?: {
    name: string
    class?: string
  }
}

/** Model (state) exposed by the sidenav store. */
export interface SidenavState {
  readonly items: SidenavItem[]
}

const SIDENAV_ITEMS: readonly SidenavItem[] = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: {
      name: 'material-symbols:dashboard-rounded'
    }
  }
]

export function createSidenavStore(): SidenavState {
  const items = $state<SidenavItem[]>([...SIDENAV_ITEMS])

  return {
    get items() {
      return items
    }
  }
}
