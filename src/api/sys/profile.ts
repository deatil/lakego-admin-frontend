import { defHttp } from '/@/utils/http/axios';

enum Api {
  GetProfile = '/profile',
  PutProfileUpdate = '/profile/update',
  PatchProfileAvatar = '/profile/avatar',
  PatchProfilePassword = '/profile/password',
  GetProfileRules = '/profile/rules',
}

/**
 * @description: 获取账号信息
 */
export function getProfile() {
  return defHttp.get<any>({ 
    url: Api.GetProfile 
  });
}

/**
 * @description: 更新账号信息
 */
export function updateProfile(params) {
  return defHttp.put<any>({ 
    url: Api.PutProfileUpdate,
    params,
  });
}

/**
 * @description: 更新账号头像
 */
export function updateProfileAvatar(params) {
  return defHttp.patch<any>({ 
    url: Api.PatchProfileAvatar,
    params,
  });
}

/**
 * @description: 更新账号密码
 */
export function updateProfilePassword(params) {
  return defHttp.patch<any>({ 
    url: Api.PatchProfilePassword,
    params,
  });
}

/**
 * @description: 获取账号权限列表
 */
export function getProfileRules() {
  return defHttp.get<any>({ 
    url: Api.GetProfileRules,
  });
}
