import { getContext, setContext } from 'svelte';
import { createRoutesStore, type RoutesState } from './stores/routes.svelte';
import { createServicesStore, type ServicesState } from './stores/services.svelte';
import { createSidenavStore, type SidenavState } from './stores/sidenav.svelte';

const DASHBOARD_KEY = Symbol('dashboard-stores');

export interface DashboardStores {
  sidenav: SidenavState;
  services: ServicesState;
  routes: RoutesState;
}

/** Creates the dashboard stores and exposes them to the feature subtree. */
export function provideDashboardStores(): DashboardStores {
  const stores: DashboardStores = {
    sidenav: createSidenavStore(),
    services: createServicesStore(),
    routes: createRoutesStore()
  };

  setContext(DASHBOARD_KEY, stores);
  return stores;
}

function useDashboardStores(): DashboardStores {
  const stores = getContext<DashboardStores | undefined>(DASHBOARD_KEY);

  if (!stores) {
    throw new Error(
      'Dashboard stores are not available. Render this component inside the dashboard provider.'
    );
  }

  return stores;
}

export function useSidenavStore(): SidenavState {
  return useDashboardStores().sidenav;
}

export function useServicesStore(): ServicesState {
  return useDashboardStores().services;
}

export function useRoutesStore(): RoutesState {
  return useDashboardStores().routes;
}
