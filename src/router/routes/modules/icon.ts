import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const icon: AppRouteModule = {
  path: '/icon',
  name: 'Icon',
  component: LAYOUT,
  redirect: '/icon/index',
  meta: {
    hideChildrenInMenu: true,
    orderNo: 11,
    icon: 'ant-design:appstore-filled',
    title: "图标",
  },
  children: [
    {
      path: 'index',
      name: 'IconIndex',
      component: () => import('/@/views/sys/icon/index.vue'),
      meta: {
        title: "图标",
      },
    },
  ],
};

export default icon;
