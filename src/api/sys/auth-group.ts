import { 
  defHttp 
} from '/@/utils/http/axios';

import { 
  ErrorMessageMode 
} from '/#/axios';

/**
 * @description: 获取权限分组列表
 */
export function getAuthGroupList(params: any, mode: ErrorMessageMode = 'modal') {
  return defHttp.get<any>(
    { 
      url: '/auth/group',
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 获取权限分组树
 */
export function getAuthGroupTree(params: any, mode: ErrorMessageMode = 'modal') {
  return defHttp.get<any>(
    { 
      url: '/auth/group/tree',
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 获取权限分组孩子节点
 */
export function getAuthGroupChildren(params: any, mode: ErrorMessageMode = 'modal') {
  return defHttp.get<any>(
    { 
      url: '/auth/group/children',
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 获取权限分组详情
 */
export function getAuthGroup(id: string) {
  return defHttp.get({
    url: `/auth/group/${id}`,
  });
}

/**
 * @description: 添加权限分组
 */
export function createAuthGroup(params: any, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<any>(
    {
      url: '/auth/group',
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 更新权限分组
 */
export function updataAuthGroup(id: string, params: any, mode: ErrorMessageMode = 'modal') {
  return defHttp.put<any>(
    {
      url: `/auth/group/${id}`,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 删除权限分组
 */
export function deleteAuthGroup(id: string) {
  return defHttp.delete({ 
    url: `/auth/group/${id}`,
  });
}

/**
 * @description: 启用权限分组
 */
export function sortAuthGroup(id: string, listorder: string) {
  return defHttp.patch({ 
    url: `/auth/group/${id}/sort`,
    params: {
      listorder,
    },
  });
}

/**
 * @description: 启用权限分组
 */
export function enableAuthGroup(id: string) {
  return defHttp.patch({ 
    url: `/auth/group/${id}/enable`,
  });
}

/**
 * @description: 禁用权限分组
 */
export function disableAuthGroup(id: string) {
  return defHttp.patch({ 
    url: `/auth/group/${id}/disable`,
  });
}

/**
 * @description: 权限分组授权
 */
export function updateAccess(id: string, access: string, mode: ErrorMessageMode = 'modal') {
  return defHttp.patch<any>(
    {
      url: `/auth/group/${id}/access`,
      params: {
        access,
      },
    },
    {
      errorMessageMode: mode,
    },
  );
}
