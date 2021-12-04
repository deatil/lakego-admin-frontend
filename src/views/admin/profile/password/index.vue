<template>
  <PageWrapper title="修改登陆密码" content="修改成功后会自动退出当前登录！">
    <div class="py-8 bg-white flex flex-col justify-center items-center">
      <BasicForm @register="register" />

      <div class="flex justify-center">
        <a-button @click="resetFields"> 重置 </a-button>
        <a-button class="!ml-4" type="primary" @click="handleSubmit"> 确认 </a-button>
      </div>
    </div>
  </PageWrapper>
</template>

<script lang="ts">
  import { MD5 } from 'crypto-js';
  import { defineComponent } from 'vue';
  import { router } from '/@/router';
  import { PageWrapper } from '/@/components/Page';
  import { BasicForm, useForm } from '/@/components/Form';
  import { PageEnum } from '/@/enums/pageEnum';
  import { useMessage } from '/@/hooks/web/useMessage';

  import { useUserStore } from '/@/store/modules/user';
  import { updateProfilePassword } from '/@/api/sys/profile';

  import { formSchema } from './pwd.data';
  export default defineComponent({
    name: 'ChangePassword',
    components: { BasicForm, PageWrapper },
    setup() {
      const [register, { validate, resetFields }] = useForm({
        size: 'large',
        labelWidth: 100,
        showActionButtonGroup: false,
        schemas: formSchema,
      });
      
      const { createMessage } = useMessage();
      const userStore = useUserStore();

      async function handleSubmit() {
        try {
          const values = await validate();
          const { passwordOld, passwordNew, confirmPassword } = values;

          // 修改密码
          await updateProfilePassword({
            oldpassword: MD5(passwordOld).toString(),
            newpassword: MD5(passwordNew).toString(),
            newpassword_confirm: MD5(confirmPassword).toString(),
          });

          // 重置
          userStore.resetState();
   
          // 修改成功后跳转
          router.push(PageEnum.BASE_LOGIN);

          createMessage.success('更新密码成功！');
        } catch (error) {}
      }

      return { 
        register, 
        resetFields, 
        handleSubmit,
      };
    },
  });
</script>
