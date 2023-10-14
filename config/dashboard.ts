import { DashboardConfig } from 'types';

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: 'Dashboard',
      href: '/dashboard',
    },
    {
      title: 'Read',
      href: '/read',
    },
  ],
  sidebarNav: [
    {
      title: 'Documents',
      href: '/dashboard',
      icon: 'document',
    },
    {
      title: 'Settings',
      href: '/dashboard/settings',
      icon: 'settings',
    },
  ],
};
