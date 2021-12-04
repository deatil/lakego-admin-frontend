import { defHttp } from '/@/utils/http/axios';

/**
 * @description: 获取系统详情
 */
export function getSytemInfo() {
  return defHttp.get<any>({ 
    url: '/system/info',
  });
}

/**
 * @description: 获取系统当前登陆账号所属权限
 */
export function getSytemRules() {
  return defHttp.get<any>({ 
    url: '/system/rules',
  });
}

/**
 * @description: 权限码，默认为空处理
 */
export function getPermCode() {
  return [];
}
