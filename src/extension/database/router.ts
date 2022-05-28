import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const system: AppRouteModule = {
  path: '/database',
  name: 'Database',
  component: LAYOUT,
  redirect: '/database/database',
  meta: {
    orderNo: 25,
    icon: 'ant-design:hdd-outlined',
    title: "数据库管理",
    roles: [
      'lakego-admin.database.index',
    ],
  },
  children: [
    {
      path: 'database',
      name: 'DatabaseList',
      component: () => import('./views/index.vue'),
      meta: {
        icon: 'ant-design:hdd-outlined',
        title: "数据库管理",
        roles: [
          'lakego-admin.database.index',
        ],    
      },
    },
  ],
};

export default system;
