import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const dashboard: AppRouteModule = {
  path: '/profile',
  name: 'Profile',
  component: LAYOUT,
  redirect: '/profile/account',
  meta: {
    hideChildrenInMenu: true,
    hideMenu: true,
    orderNo: 15,
    icon: 'ion:settings-outline',
    title: "账号信息",
  },
  children: [
    {
      path: 'account',
      name: 'Account',
      component: () => import('/@/views/sys/profile/account/index.vue'),
      meta: {
        title: "我的信息",
      },
    },
    {
      path: 'password',
      name: 'Password',
      component: () => import('/@/views/sys/profile/password/index.vue'),
      meta: {
        title: "更改密码",
      },
    },
  ],
};

export default dashboard;
