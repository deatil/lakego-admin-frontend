import { 
  defHttp 
} from '/@/utils/http/axios';

import { 
  ErrorMessageMode 
} from '/#/axios';

/**
 * @description: 获取服务监控信息详情
 */
export function getMonitorInfo(mode: ErrorMessageMode = 'modal') {
  return defHttp.get<any>(
    { 
      url: '/monitor',
    },
    {
      errorMessageMode: mode,
    },
  );
}
