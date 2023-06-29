import { 
  defHttp 
} from '/@/utils/http/axios';

import { 
  ErrorMessageMode 
} from '/#/axios';

/**
 * @description: 获取扩展列表
 */
export function getList(params, mode: ErrorMessageMode = 'modal') {
  return defHttp.get<any>(
    { 
      url: '/extension',
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 获取本地扩展列表
 */
export function getLocalList(params, mode: ErrorMessageMode = 'modal') {
  return defHttp.get<any>(
    { 
      url: '/extension/local',
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 安装扩展
 */
export function install(name: string, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<any>(
    { 
      url: `/extension/${name}/install`,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 卸载扩展
 */
export function uninstall(name: string, mode: ErrorMessageMode = 'modal') {
  return defHttp.delete<any>(
    { 
      url: `/extension/${name}/uninstall`,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 更新扩展
 */
export function upgrade(name: string, mode: ErrorMessageMode = 'modal') {
  return defHttp.put<any>(
    { 
      url: `/extension/${name}/upgrade`,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 排序
 */
export function sort(name: string, listorder: string) {
  return defHttp.patch({ 
    url: `/extension/${name}/sort`,
    params: {
      listorder,
    },
  });
}

/**
 * @description: 启用
 */
export function enable(name: string) {
  return defHttp.patch({ 
    url: `/extension/${name}/enable`,
  });
}

/**
 * @description: 禁用
 */
export function disable(name: string) {
  return defHttp.patch({ 
    url: `/extension/${name}/disable`,
  });
}