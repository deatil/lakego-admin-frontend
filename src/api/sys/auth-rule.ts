import { 
  defHttp 
} from '/@/utils/http/axios';

import { 
  ErrorMessageMode 
} from '/#/axios';

/**
 * @description: 获取权限菜单列表
 */
export function getAuthRuleList(params: any, mode: ErrorMessageMode = 'modal') {
  return defHttp.get<any>(
    { 
      url: '/auth/rule',
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 获取权限菜单树
 */
export function getAuthRuleTree(mode: ErrorMessageMode = 'modal') {
  return defHttp.get<any>(
    { 
      url: '/auth/rule/tree',
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 获取权限菜单孩子节点
 */
export function getAuthRuleChildren(params: any, mode: ErrorMessageMode = 'modal') {
  return defHttp.get<any>(
    { 
      url: '/auth/rule/children',
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 获取权限菜单详情
 */
export function getAuthRule(id: string) {
  return defHttp.get({
    url: `/auth/rule/${id}`,
  });
}

/**
 * @description: 添加权限菜单
 */
export function createAuthRule(params: any, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<any>(
    {
      url: '/auth/rule',
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 更新权限菜单
 */
export function updataAuthRule(id: string, params: any, mode: ErrorMessageMode = 'modal') {
  return defHttp.put<any>(
    {
      url: `/auth/rule/${id}`,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 批量删除权限菜单
 */
export function clearAuthRule(ids: string) {
  return defHttp.delete({ 
    url: '/auth/rule/clear',
    params: {
      ids,
    },
  });
}

/**
 * @description: 删除权限菜单
 */
export function deleteAuthRule(id: string) {
  return defHttp.delete({ 
    url: `/auth/rule/${id}`,
  });
}

/**
 * @description: 启用权限菜单
 */
export function sortAuthRule(id: string, listorder: string) {
  return defHttp.patch({ 
    url: `/auth/rule/${id}/sort`,
    params: {
      listorder,
    },
  });
}

/**
 * @description: 启用权限菜单
 */
export function enableAuthRule(id: string) {
  return defHttp.patch({ 
    url: `/auth/rule/${id}/enable`,
  });
}

/**
 * @description: 禁用权限菜单
 */
export function disableAuthRule(id: string) {
  return defHttp.patch({ 
    url: `/auth/rule/${id}/disable`,
  });
}
