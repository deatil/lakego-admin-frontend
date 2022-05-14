import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const system: AppRouteModule = {
  path: '/permission',
  name: 'Permission',
  component: LAYOUT,
  redirect: '/permission/admin',
  meta: {
    orderNo: 9925,
    icon: 'ant-design:layout-outlined',
    title: "权限管理",
  },
  children: [
    {
      path: 'admin',
      name: 'Admin',
      component: () => import('/@/views/admin/admin/index.vue'),
      meta: {
        icon: 'ant-design:user-outlined',
        title: "管理员",
      },
    },

    {
      path: 'auth-group',
      name: 'AuthGroup',
      component: () => import('/@/views/admin/auth-group/index.vue'),
      meta: {
        icon: 'ant-design:team-outlined',
        title: "用户组",
      },
    },
    {
      path: 'auth-group-tree',
      name: 'AuthGroupTree',
      component: () => import('/@/views/admin/auth-group/tree.vue'),
      meta: {
        icon: 'ant-design:team-outlined',
        title: "用户组结构",
        hideMenu: true,
      },
    },

    {
      path: 'auth-rule',
      name: 'AuthRule',
      component: () => import('/@/views/admin/auth-rule/index.vue'),
      meta: {
        icon: 'ant-design:table-outlined',
        title: "权限路由",
      },
    },
    {
      path: 'auth-rule-tree',
      name: 'AuthRuleTree',
      component: () => import('/@/views/admin/auth-rule/tree.vue'),
      meta: {
        icon: 'ant-design:table-outlined',
        title: "权限树结构",
        hideMenu: true,
      },
    },
  ],
};

export default system;
