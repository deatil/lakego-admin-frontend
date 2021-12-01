/**
 * @description: 验证码返回值
 */
export interface CaptchaResultModel {
  captcha: string;
}

/**
 * @description: 登陆请求参数
 */
export interface LoginParams {
  name: string;
  password: string;
  captcha: string;
}

/**
 * @description: 登陆返回值
 */
export interface LoginResultModel {
  access_token: string;
  expires_in: number;
  refresh_token: string;
}

/**
 * @description: 刷新 token 请求数据
 */
export interface RefreshTokenParams {
  refresh_token: string;
}

/**
 * @description: 刷新 token 返回结果
 */
export interface RefreshTokenResultModel {
  access_token: string;
  expires_in: number;
}

