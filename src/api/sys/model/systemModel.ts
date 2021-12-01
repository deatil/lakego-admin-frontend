/**
 * @description: 获取系统信息
 */
export interface GetSystemInfoModel {
  // goos
  goos: string;
  // goarch
  goarch: string;
  // goroot
  goroot: string;
  // version
  version: string;
  // numcpu
  numcpu: string;
  // hostname
  hostname: string;
}

/**
 * @description: 获取当前账号权限列表
 */
export interface GetSystemRulesModel {
  // 列表
  list: string[];
}
