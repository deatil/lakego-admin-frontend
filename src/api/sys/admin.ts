import { 
  defHttp 
} from '/@/utils/http/axios';

import { 
  ErrorMessageMode 
} from '/#/axios';

/**
 * @description: 获取管理员列表
 */
export function getAdminList(params: any, mode: ErrorMessageMode = 'modal') {
  return defHttp.get(
    { 
      url: '/admin',
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 获取管理员分组
 */
export function getAdminGroups(mode: ErrorMessageMode = 'modal') {
  return defHttp.get(
    { 
      url: '/admin/groups',
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 获取管理员
 */
export function getAdmin(id: string) {
  return defHttp.get({
    url: `/admin/${id}`,
  });
}

/**
 * @description: 获取管理员权限规则
 */
export function getAdminRules(id: string) {
  return defHttp.get({
    url: `/admin/${id}/rules`,
  });
}

/**
 * @description: 添加管理员
 */
export function createAdmin(params: any, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<any>(
    {
      url: '/admin',
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 更新管理员
 */
export function updataAdmin(id: string, params: any, mode: ErrorMessageMode = 'modal') {
  return defHttp.put<any>(
    {
      url: `/admin/${id}`,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 删除管理员
 */
export function deleteAdmin(id: string) {
  return defHttp.delete({ 
    url: `/admin/${id}`,
  });
}

/**
 * @description: 账号权限同步
 */
export function resetPermission() {
  return defHttp.delete({ 
    url: `/admin/reset-permission`,
  });
}

/**
 * @description: 启用管理员
 */
export function enableAdmin(id: string) {
  return defHttp.patch({ 
    url: `/admin/${id}/enable`,
  });
}

/**
 * @description: 禁用管理员
 */
export function disableAdmin(id: string) {
  return defHttp.patch({ 
    url: `/admin/${id}/disable`,
  });
}

/**
 * @description: 修改头像
 */
export function updateAvatar(id: string, avatar: string, mode: ErrorMessageMode = 'modal') {
  return defHttp.patch<any>(
    {
      url: `/admin/${id}/avatar`,
      params: {
        avatar,
      },
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 修改密码
 */
export function updatePassword(id: string, password: string, mode: ErrorMessageMode = 'modal') {
  return defHttp.patch<any>(
    {
      url: `/admin/${id}/password`,
      params: {
        password,
      },
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 账号授权
 */
export function updateAccess(id: string, access: string, mode: ErrorMessageMode = 'modal') {
  return defHttp.patch<any>(
    {
      url: `/admin/${id}/access`,
      params: {
        access,
      },
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 账号退出
 */
export function adminLogout(refreshToken: string) {
  return defHttp.delete({ 
    url: `/admin/logout/${refreshToken}`,
  });
}

/**
 * @description: 账号权限同步
 */
export function adminResetPermission() {
  return defHttp.put({ 
    url: `/admin/reset-permission`,
  });
}
