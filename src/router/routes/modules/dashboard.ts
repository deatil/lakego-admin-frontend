import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const dashboard: AppRouteModule = {
  path: '/dashboard',
  name: 'Dashboard',
  component: LAYOUT,
  redirect: '/dashboard/index',
  meta: {
    hideChildrenInMenu: true,
    orderNo: 10,
    icon: 'ion:grid-outline',
    title: "控制台",
  },
  children: [
    {
      path: 'index',
      name: 'index',
      component: () => import('/@/views/dashboard/index/index.vue'),
      meta: {
        // affix: true,
        title: "控制台",
        hideBreadcrumb: true,
      },
    },
  ],
};

export default dashboard;
