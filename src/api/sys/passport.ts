import { 
  defHttp 
} from '/@/utils/http/axios';
import { 
  CaptchaResultModel,
  LoginParams, 
  LoginResultModel,
  RefreshTokenParams,
  RefreshTokenResultModel,
} from './model/passportModel';

import { 
  ErrorMessageMode 
} from '/#/axios';

enum Api {
  Captcha = '/passport/captcha',
  Login = '/passport/login',
  Logout = '/passport/logout',
  RefreshToken = '/passport/refresh-token',
}

/**
 * @description: 验证码
 */
export function captcha(mode: ErrorMessageMode = 'modal') {
  return defHttp.get<CaptchaResultModel>(
    { 
      url: Api.Captcha 
    },
    {
      isReturnNativeResponse: true,
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 登陆
 */
export function login(params: LoginParams, header, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      headers: header,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: 退出
 */
export function logout(params) {
  return defHttp.delete({ 
    url: Api.Logout,
    params,
  });
}

/**
 * @description: 刷新 token
 */
export function refreshToken(params: RefreshTokenParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.put<RefreshTokenResultModel>(
    { 
      url: Api.RefreshToken,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}
