'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

type BreadcrumbItem = {
  title: string;
  link: string;
};

// This allows to add custom title as well
const routeMapping: Record<string, BreadcrumbItem[]> = {
  // Home routes
  '/dashboard': [{ title: '首页', link: '/dashboard' }],
  '/dashboard/overview': [{ title: '首页', link: '/dashboard/overview' }],
  '/dashboard/store': [{ title: '商店', link: '/dashboard/store' }],

  // Store related routes
  '/dashboard/billing': [
    { title: '商店', link: '/dashboard/store' },
    { title: '账单', link: '/dashboard/billing' }
  ],
  '/dashboard/subscribe': [
    { title: '商店', link: '/dashboard/store' },
    { title: '订阅中心', link: '/dashboard/subscribe' }
  ],
  '/dashboard/records': [
    { title: '商店', link: '/dashboard/store' },
    { title: '使用记录', link: '/dashboard/records' }
  ],

  // Manager routes
  '/manager/server': [
    { title: '管理', link: '/manager' },
    { title: '服务器管理', link: '/manager/server' }
  ],
  '/manager/user': [
    { title: '管理', link: '/manager' },
    { title: '用户管理', link: '/manager/user' }
  ],
  '/manager/pacakage': [
    { title: '管理', link: '/manager' },
    { title: '套餐管理', link: '/manager/pacakage' }
  ],

  // User related routes
  '/dashboard/tutorial': [
    { title: '使用', link: '/dashboard' },
    { title: '使用教程', link: '/dashboard/tutorial' }
  ],
  '/dashboard/detect': [
    { title: '使用', link: '/dashboard' },
    { title: '安全审计', link: '/dashboard/detect' }
  ]
};

export function useBreadcrumbs() {
  const pathname = usePathname();

  const breadcrumbs = useMemo(() => {
    // Check if we have a custom mapping for this exact path
    if (routeMapping[pathname]) {
      return routeMapping[pathname];
    }

    // If no exact match, fall back to generating breadcrumbs from the path
    const segments = pathname.split('/').filter(Boolean);
    return segments.map((segment, index) => {
      const path = `/${segments.slice(0, index + 1).join('/')}`;
      return {
        title: segment.charAt(0).toUpperCase() + segment.slice(1),
        link: path
      };
    });
  }, [pathname]);

  return breadcrumbs;
}
