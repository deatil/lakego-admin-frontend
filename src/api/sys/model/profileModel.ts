/**
 * @description: 账号登陆的信息
 */
export interface GetProfileModel {
  // id
  id: string | number;
  // 用户名
  name: string;
  // 昵称
  nickname: string;
  // 邮箱
  email: string;
  // 头像
  avatar: string;
  // 介绍
  introduce?: string;
  // 最后登陆时间
  last_active: string;
  // 最后登陆IP
  last_ip: string;
}
