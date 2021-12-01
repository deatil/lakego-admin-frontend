import type { ErrorMessageMode } from '/#/axios';
import { defineStore } from 'pinia';
import { store } from '/@/store';
import { PageEnum } from '/@/enums/pageEnum';
import { 
  TOKEN_KEY, 
  EXPIRESIN_KEY, 
  REFRESH_TOKEN_KEY, 
  ROLES_KEY, 
  USER_INFO_KEY 
} from '/@/enums/cacheEnum';
import { getAuthCache, setAuthCache } from '/@/utils/auth';
import { 
  LoginParams, 
  LoginResultModel,
  RefreshTokenParams 
} from '/@/api/sys/model/passportModel';
import { getProfile } from '/@/api/sys/profile';
import { getSytemRules } from '/@/api/sys/system';
import { login, logout, refreshToken } from '/@/api/sys/passport';
import { useI18n } from '/@/hooks/web/useI18n';
import { useMessage } from '/@/hooks/web/useMessage';
import { router } from '/@/router';
import { usePermissionStore } from '/@/store/modules/permission';
import { RouteRecordRaw } from 'vue-router';
import { PAGE_NOT_FOUND_ROUTE } from '/@/router/routes/basic';
import { isArray } from '/@/utils/is';
import { h } from 'vue';

interface UserState {
  accessToken?: string;
  expiresIn: number;
  refreshsToken?: string;
  
  roleList: string[];
  
  userInfo: Nullable<any>;
  sessionTimeout?: boolean;
  lastUpdateTime: number;
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    // 权限 token
    accessToken: undefined,
    // 权限 token 过期时间
    expiresIn: 0,
    // 刷新 token
    refreshsToken: undefined,

    // roleList
    roleList: [],

    // 账号信息
    userInfo: null,
    
    // Whether the login expired
    sessionTimeout: false,
    // Last fetch time
    lastUpdateTime: 0,
  }),
  getters: {
    getToken(): string {
      if (! this.accessToken) {
        this.accessToken = getAuthCache<string>(TOKEN_KEY);
      }

      return this.accessToken;
    },
    getExpiresIn(): number {
      if (! this.expiresIn) {
        this.expiresIn = getAuthCache<number>(EXPIRESIN_KEY);
      }

      return this.expiresIn;
    },
    getRefreshToken(): string {
      if (! this.refreshsToken) {
        this.refreshsToken = getAuthCache<string>(REFRESH_TOKEN_KEY);
      }

      return this.refreshsToken;
    },

    getRoleList(): string[] {
      if (this.roleList.length <= 0) {
        this.roleList = getAuthCache<string[]>(ROLES_KEY);
      }

      return this.roleList; 
    },

    getUserInfo(): any {
      if (! this.userInfo) {
        this.userInfo = getAuthCache<any>(USER_INFO_KEY);
      }

      return this.userInfo || {};
    },

    getSessionTimeout(): boolean {
      return !!this.sessionTimeout;
    },
    getLastUpdateTime(): number {
      return this.lastUpdateTime;
    },
  },

  actions: {
    setToken(info: string | undefined) {
      this.accessToken = info ? info : ''; 

      setAuthCache(TOKEN_KEY, info);
    },
    setExpiresIn(info: number | undefined) {
      this.expiresIn = info ? info : 0; 

      setAuthCache(EXPIRESIN_KEY, info);
    },
    setRefreshToken(info: string | undefined) {
      this.refreshsToken = info ? info : ''; 

      setAuthCache(REFRESH_TOKEN_KEY, info);
    },
    
    setRoleList(roleList: string[]) {
      this.roleList = roleList;

      setAuthCache(ROLES_KEY, roleList);
    },

    setUserInfo(info: any | null) {
      this.userInfo = info;
      this.lastUpdateTime = new Date().getTime();

      setAuthCache(USER_INFO_KEY, info);
    },
    setSessionTimeout(flag: boolean) {
      this.sessionTimeout = flag;
    },

    resetState() {
      this.setToken('');
      this.setExpiresIn('');
      this.setRefreshToken('');
      
      this.setRoleList([]);

      this.setUserInfo(null);

      this.setSessionTimeout(false);
    },

    /**
     * @description: 登陆
     */
    async login(
      params: LoginParams & {
        captchaKey: string;
        goHome?: boolean;
        mode?: ErrorMessageMode;
      }
    ): Promise<LoginResultModel | null> {
      try {
        const { captchaKey, goHome = true, mode, ...loginParams } = params;
        const data = await login(loginParams, {
          "Lakego-Admin-Captcha-Id": captchaKey,
        }, mode);
        const { access_token, expires_in, refresh_token } = data;

        // 保存 token
        this.setToken(access_token);
        this.setExpiresIn(expires_in);
        this.setRefreshToken(refresh_token);

        // 页面跳转相关
        this.afterLoginAction(goHome);

        return data
      } catch (error) {
        return Promise.reject(error);
      }
    },

    async afterLoginAction(goHome?: boolean): Promise<any | null> {
      if (!this.getToken) {
        return null;
      }

      // 账号信息
      const userInfo = await this.getUserInfoAction();

      const sessionTimeout = this.sessionTimeout;
      if (sessionTimeout) {
        this.setSessionTimeout(false);
      } else {
        const permissionStore = usePermissionStore();

        if (!permissionStore.isDynamicAddedRoute) {
          const routes = await permissionStore.buildRoutesAction();
          routes.forEach((route) => {
            router.addRoute(route as unknown as RouteRecordRaw);
          });

          router.addRoute(PAGE_NOT_FOUND_ROUTE as unknown as RouteRecordRaw);
          
          permissionStore.setDynamicAddedRoute(true);
        }
        
        goHome && (await router.replace(PageEnum.BASE_HOME));
      }

      return userInfo;
    },
    
    /**
     * @description: 刷新 token
     */
    async refreshToken(
      params: RefreshTokenParams & {
        mode?: ErrorMessageMode;
      }
    ): Promise<null> {
      try {
        const {  mode } = params;

        const refresh_token = this.getRefreshToken;

        const data = await refreshToken({
          refresh_token: refresh_token
        }, mode);
        const { access_token, expires_in } = data;
      
        // 保存 token
        this.setToken(access_token);
        this.setExpiresIn(expires_in);

        return Promise.resolve(null);
      } catch (error) {
        return Promise.reject(error);
      }
    },

    async getUserInfoAction(): Promise<any | null> {
      if (!this.getToken) {
        return null;
      }
      
      // 账号信息
      const profile = await getProfile();

      // 权限列表
      const sytemRules = await getSytemRules();
      const roles = sytemRules.list;
      
      // 设置权限
      if (isArray(roles)) {
        const roleList = roles.map((item) => item) as string[];

        this.setRoleList(roleList);
      } else {
        this.setRoleList([]);
      }

      this.setUserInfo(profile);

      return profile;
    },

    /**
     * @description: 退出
     */
    async logout(goLogin = false) {
      if (this.getRefreshToken) {
        try {
          await logout({
            "refresh_token": this.getRefreshToken,
          });
        } catch {
          console.log('退出失败，可能是网络错误');
        }
      }

      // 清空 token 信息
      this.setToken(undefined);
      this.setExpiresIn(0);
      this.setRefreshToken(undefined);
    
      this.setRoleList([])
      this.setSessionTimeout(false);
      this.setUserInfo(null);
        
      goLogin && router.push(PageEnum.BASE_LOGIN);
    },

    /**
     * @description: 退出确认
     */
    confirmLoginOut() {
      const { createConfirm } = useMessage();
      const { t } = useI18n();
      createConfirm({
        iconType: 'warning',
        title: () => h('span', t('sys.app.logoutTip')),
        content: () => h('span', t('sys.app.logoutMessage')),
        onOk: async () => {
          await this.logout(true);
        },
      });
    },
  },
});

// 对外接口
export function useUserStoreWithOut() {
  return useUserStore(store);
}
