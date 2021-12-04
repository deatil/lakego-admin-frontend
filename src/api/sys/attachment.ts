import { 
  defHttp 
} from '/@/utils/http/axios';

import { 
  ErrorMessageMode 
} from '/#/axios';

/**
 * @description: 获取附件列表
 */
export function getAttachmentList(params, mode: ErrorMessageMode = 'modal') {
  return defHttp.get(
    { 
      url: '/attachment',
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 获取附件
 */
export function getAttachment(id: string) {
  return defHttp.delete({
    url: `/attachment/${id}`,
  });
}

/**
 * @description: 启用附件
 */
export function enableAttachment(id: string) {
  return defHttp.patch({ 
    url: `/attachment/${id}/enable`,
  });
}

/**
 * @description: 禁用附件
 */
export function disableAttachment(id: string) {
  return defHttp.patch({ 
    url: `/attachment/${id}/disable`,
  });
}

/**
 * @description: 删除附件
 */
export function deleteAttachment(id: string) {
  return defHttp.delete({ 
    url: `/attachment/${id}`,
  });
}

/**
 * @description: 获取附件下载码
 */
export function getAttachmentDowncode(id: string) {
  return defHttp.get({ 
    url: `/attachment/downcode/${id}`,
  });
}

/**
 * @description: 下载附件
 */
export function downloadAttachment(code: string) {
  return defHttp.get({ 
    url: `/attachment/download/${code}`,
  });
}
