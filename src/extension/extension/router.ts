import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const system: AppRouteModule = {
  path: '/extension',
  name: 'Extension',
  component: LAYOUT,
  redirect: '/extension/index',
  meta: {
    orderNo: 35,
    icon: 'ant-design:appstore-outlined',
    title: "扩展管理",
    roles: [
      'lakego-admin.extension.index',
      'lakego-admin.extension.local',
    ],
  },
  children: [
    {
      path: 'index',
      name: 'ExtensionIndex',
      component: () => import('./views/index.vue'),
      meta: {
        icon: 'ant-design:coffee-outlined',
        title: "扩展列表",
        roles: [
          'lakego-admin.extension.index',
        ],    
      },
    },
    {
      path: 'local',
      name: 'ExtensionLocal',
      component: () => import('./views/local.vue'),
      meta: {
        icon: 'ant-design:experiment-outlined',
        title: "本地扩展",
        roles: [
          'lakego-admin.extension.local',
        ],    
      },
    },
  ],
};

export default system;
