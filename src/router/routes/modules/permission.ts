import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const system: AppRouteModule = {
  path: '/permission',
  name: 'Permission',
  component: LAYOUT,
  redirect: '/permission/admin',
  meta: {
    orderNo: 25,
    icon: 'ion:settings-outline',
    title: "权限管理",
  },
  children: [
    {
      path: 'admin',
      name: 'Admin',
      component: () => import('/@/views/admin/admin/list/index.vue'),
      meta: {
        title: "管理员",
      },
    },
    {
      path: 'auth-rule',
      name: 'AuthRule',
      component: () => import('/@/views/admin/auth-rule/list/index.vue'),
      meta: {
        title: "用户组",
      },
    },
    {
      path: 'auth-group',
      name: 'AuthGroup',
      component: () => import('/@/views/admin/auth-group/list/index.vue'),
      meta: {
        title: "权限路由",
      },
    },
    {
      path: 'action-log',
      name: 'ActionLog',
      component: () => import('/@/views/admin/action-log/list/index.vue'),
      meta: {
        title: "操作日志",
      },
    },
  ],
};

export default system;
