import { defHttp } from '/@/utils/http/axios';

/**
 * @description: 获取账号信息
 */
export function getProfile() {
  return defHttp.get<any>({ 
    url: '/profile',
  });
}

/**
 * @description: 更新账号信息
 */
export function updateProfile(params) {
  return defHttp.put<any>({ 
    url: '/profile/update',
    params,
  });
}

/**
 * @description: 更新账号头像
 */
export function updateProfileAvatar(params) {
  return defHttp.patch<any>({ 
    url: '/profile/avatar',
    params,
  });
}

/**
 * @description: 更新账号密码
 */
export function updateProfilePassword(params) {
  return defHttp.patch<any>({ 
    url: '/profile/password',
    params,
  });
}

/**
 * @description: 获取账号权限列表
 */
export function getProfileRules() {
  return defHttp.get<any>({ 
    url: '/profile/rules',
  });
}
