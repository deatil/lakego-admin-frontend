import type { AppRouteRecordRaw, AppRouteModule } from '/@/router/types';

import { PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE } from '/@/router/routes/basic';

import { PageEnum } from '/@/enums/pageEnum';
import { t } from '/@/hooks/web/useI18n';

// 路由
const routeModuleList: AppRouteModule[] = [];

const modules = import.meta.globEager('./modules/**/*.ts');
Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

// 导入插件
const extensions = import.meta.globEager('/src/extension/**/*/router.ts');
console.log(extensions);
Object.keys(extensions).forEach((key) => {
  const mod = extensions[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

export const asyncRoutes = [PAGE_NOT_FOUND_ROUTE, ...routeModuleList];

export const RootRoute: AppRouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: 'Root',
  },
};

export const LoginRoute: AppRouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('/@/views/admin/login/Login.vue'),
  meta: {
    title: t('routes.basic.login'),
  },
};

// Basic routing without permission
export const basicRoutes = [
  LoginRoute,
  RootRoute,
  REDIRECT_ROUTE,
  PAGE_NOT_FOUND_ROUTE,
];
