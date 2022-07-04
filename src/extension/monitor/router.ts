import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const system: AppRouteModule = {
  path: '/monitor',
  name: 'Monitor',
  component: LAYOUT,
  redirect: '/monitor/index',
  meta: {
    orderNo: 25,
    icon: 'ant-design:book-outlined',
    title: "系统监控",
    roles: [
      'lakego-admin.monitor.index',
    ],
  },
  children: [
    {
      path: 'index',
      name: 'MonitorIndex',
      component: () => import('./views/index.vue'),
      meta: {
        icon: 'ant-design:book-twotone',
        title: "服务监控",
        roles: [
          'lakego-admin.monitor.index',
        ],
      },
    },
  ],
};

export default system;
