import { defHttp } from '/@/utils/http/axios';

enum Api {
  GetSytemInfo = '/system/info',
  GetSytemRules = '/system/rules',
}

/**
 * @description: 获取系统详情
 */
export function getSytemInfo() {
  return defHttp.get<any>({ 
    url: Api.GetSytemInfo 
  });
}

/**
 * @description: 获取系统当前登陆账号所属权限
 */
export function getSytemRules() {
  return defHttp.get<any>({ 
    url: Api.GetSytemRules 
  });
}

/**
 * @description: 权限码，默认为空处理
 */
export function getPermCode() {
  return [];
}
