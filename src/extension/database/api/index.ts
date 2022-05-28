import { 
  defHttp 
} from '/@/utils/http/axios';

import { 
  ErrorMessageMode 
} from '/#/axios';

/**
 * @description: 获取数据表列表
 */
export function getDatabaseList(mode: ErrorMessageMode = 'modal') {
  return defHttp.get<any>(
    { 
      url: '/database',
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 获取数据表详情
 */
export function getDatabaseDetail(name: string, mode: ErrorMessageMode = 'modal') {
  return defHttp.get<any>(
    { 
      url: `/database/${name}`,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 优化数据表
 */
export function databaseOptimize(name: string, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<any>(
    { 
      url: `/database/${name}/optimize`,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 修复数据表
 */
export function databaseRepair(name: string, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<any>(
    { 
      url: `/database/${name}/repair`,
    },
    {
      errorMessageMode: mode,
    },
  );
}
