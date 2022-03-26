import { 
  defHttp 
} from '/@/utils/http/axios';

import { 
  ErrorMessageMode 
} from '/#/axios';

/**
 * @description: 获取日志列表
 */
export function getActionLogList(params, mode: ErrorMessageMode = 'modal') {
  return defHttp.get<any>(
    { 
      url: '/action-log',
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 清除操作日志
 */
export function clearActionLog() {
  return defHttp.delete({ 
    url: '/action-log/clear',
  });
}
