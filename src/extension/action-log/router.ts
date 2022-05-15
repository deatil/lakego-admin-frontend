import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const system: AppRouteModule = {
  path: '/actionlog',
  name: 'Actionlog',
  component: LAYOUT,
  redirect: '/actionlog/action-log',
  meta: {
    orderNo: 23,
    icon: 'ant-design:book-outlined',
    title: "操作日志",
  },
  children: [
    {
      path: 'action-log',
      name: 'ActionLog',
      component: () => import('./views/index.vue'),
      meta: {
        icon: 'ant-design:book-twotone',
        title: "操作日志",
      },
    },
  ],
};

export default system;
