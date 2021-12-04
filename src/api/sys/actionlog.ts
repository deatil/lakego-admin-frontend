import { 
  defHttp 
} from '/@/utils/http/axios';

import { 
  ErrorMessageMode 
} from '/#/axios';

enum Api {
  ActionLogList = '/action-log',
  ClearActionLog = '/action-log/clear',
}

/**
 * @description: 获取日志列表
 */
export function getActionLogList(mode: ErrorMessageMode = 'modal') {
  return defHttp.get<any>(
    { 
      url: Api.ActionLogList 
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
    url: Api.ClearActionLog,
  });
}
