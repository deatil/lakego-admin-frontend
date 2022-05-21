import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const system: AppRouteModule = {
  path: '/system',
  name: 'System',
  component: LAYOUT,
  redirect: '/system/attachment',
  meta: {
    orderNo: 9920,
    icon: 'ion:settings-outline',
    title: "系统管理",
    roles: [
      'lakego-admin.attachment.index',
    ],
},
  children: [
    {
      path: 'attachment',
      name: 'Attachment',
      component: () => import('/@/views/admin/attachment/index.vue'),
      meta: {
        icon: 'ant-design:file-outlined',
        title: "附件管理",
        roles: [
          'lakego-admin.attachment.index',
        ],
      },
    },
  ],
};

export default system;
