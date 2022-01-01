import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const profile: AppRouteModule = {
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
      name: 'ProfileAccount',
      component: () => import('/@/views/admin/profile/account/index.vue'),
      meta: {
        title: "我的信息",
      },
    },
    {
      path: 'password',
      name: 'ProfilePassword',
      component: () => import('/@/views/admin/profile/password/index.vue'),
      meta: {
        title: "更改密码",
      },
    },
  ],
};

export default profile;
