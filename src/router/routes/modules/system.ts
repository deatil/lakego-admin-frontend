import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const system: AppRouteModule = {
  path: '/system',
  name: 'System',
  component: LAYOUT,
  redirect: '/system/attachment',
  meta: {
    orderNo: 20,
    icon: 'ion:settings-outline',
    title: "系统管理",
  },
  children: [
    {
      path: 'attachment',
      name: 'Attachment',
      component: () => import('/@/views/admin/attachment/list/index.vue'),
      meta: {
        title: "附件管理",
      },
    },
    {
      path: 'actionlog',
      name: 'Actionlog',
      component: () => import('/@/views/admin/actionlog/list/index.vue'),
      meta: {
        title: "操作日志",
      },
    },
  ],
};

export default system;
