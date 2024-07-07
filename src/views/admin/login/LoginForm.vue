<template>
  <div class="enter-x">
    <h2 class="mb-3 text-2xl font-bold text-center xl:text-3xl enter-x xl:text-left">
      登陆
    </h2>
  </div>

  <Form
    class="p-4 enter-x"
    :model="formData"
    :rules="getFormRules"
    ref="formRef"
    @keypress.enter="handleLogin"
  >
    <FormItem name="name" class="enter-x">
      <Input
        size="large"
        v-model:value="formData.name"
        :placeholder="t('sys.login.userName')"
        class="fix-auto-fill"
      />
    </FormItem>

    <FormItem name="password" class="enter-x">
      <InputPassword
        size="large"
        visibilityToggle
        v-model:value="formData.password"
        :placeholder="t('sys.login.password')"
      />
    </FormItem>

    <FormItem name="captcha" class="enter-x login-captcha-item">
      <Input
        size="large"
        v-model:value="formData.captcha"
        placeholder="验证码"
        class="fix-auto-fill"
      />

      <Tooltip placement="top" arrowPointAtCenter title="点击刷新验证码">
        <div class="login-captcha-image">
          <img :src="LoginCaptcha.image" @click="handleRefreshCaptcha" />
        </div>
      </Tooltip>
    </FormItem>

    <FormItem class="enter-x">
      <Button 
        type="primary" 
        size="large" 
        block 
        @click="handleLogin" 
        :loading="loading"
      >
        {{ t('sys.login.loginButton') }}
      </Button>
    </FormItem>

  </Form>
</template>

<script lang="ts" setup>
  import { MD5 } from 'crypto-js';
  import { reactive, ref, unref, computed } from 'vue';

  import { Form, Input, Tooltip, Row, Col, Button, Divider } from 'ant-design-vue';

  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';

  import { useUserStore } from '/@/store/modules/user';
  import { useLoginState, useFormRules, useFormValid } from './useLogin';
  import { useDesign } from '/@/hooks/web/useDesign';
  //import { onKeyStroke } from '@vueuse/core';

  import { captcha } from '/@/api/sys/passport';
  import defaultCaptcha from "/@/assets/lakego/captcha.png";

  const FormItem = Form.Item;
  const InputPassword = Input.Password;
  const { t } = useI18n();
  const { notification, createErrorModal } = useMessage();
  const { prefixCls } = useDesign('login');
  const userStore = useUserStore();
  
  const { getFormRules } = useFormRules();

  const formRef = ref();
  const loading = ref(false);

  const formData = reactive({
    name: '',
    password: '',
    captcha: '',
  });

  // 验证码图片
  const LoginCaptcha = reactive({
    key: "",
    image: defaultCaptcha,
  })

  const { validForm } = useFormValid(formRef);

  // onKeyStroke('Enter', handleLogin);

  // 默认显示验证码
  handleRefreshCaptcha();

  // 刷新验证码
  async function handleRefreshCaptcha() {
    const data = await captcha()
    
    const headers = data["headers"]
    const res = data["data"]

    if (res.code != 0) {
      createErrorModal({
        title: t('sys.api.errorTip'),
        content: "验证码获取失败",
      });
      return ;
    }

    LoginCaptcha.key = headers['lakego-admin-captcha-id']
    LoginCaptcha.image = res.data.captcha
  }

  // 确认登陆
  async function handleLogin() {
    const data = await validForm();

    if (!data) {
      return;
    }

    try {
      loading.value = true;
      const userInfo = await userStore.login({
        password: MD5(data.password).toString(),
        name: data.name,
        captcha: formData.captcha, // 验证码
        captchaKey: LoginCaptcha.key, // 验证码 key
        goHome: true,
        mode: 'none', // 不要默认的错误提示
      });
      
      if (userInfo) {
        notification.success({
          message: t('sys.login.loginSuccessTitle'),
          description: "登陆成功",
          duration: 3,
        });
      }
    } catch (error) {
      createErrorModal({
        title: t('sys.api.errorTip'),
        content: (error as unknown as Error).message || t('sys.api.networkExceptionMsg'),
        getContainer: () => document.body.querySelector(`.${prefixCls}`) || document.body,
      });
    } finally {
      loading.value = false;
    }
  }
</script>

<style scoped>
.login-captcha-item {
  position: relative;
}
.login-captcha-item .login-captcha-image {
  position: absolute;
  top: 2px;
  right: 2px;
  height: 36px;
}
.login-captcha-item .login-captcha-image img {
  height: 100%;
  cursor: pointer;
}
</style>