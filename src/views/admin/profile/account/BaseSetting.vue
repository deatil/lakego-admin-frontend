<template>
  <CollapseContainer title="基本设置" :canExpan="false">
    <a-row :gutter="24">
      <a-col :span="22">
        <BasicForm @register="register" />
      </a-col>
    </a-row>

    <a-row :gutter="24" class="profile-button">
      <a-col :span="4">
      </a-col>
      <a-col :span="20">
        <Button type="primary" @click="handleSubmit"> 更新基本信息 </Button>
      </a-col>
    </a-row>
  
  </CollapseContainer>
</template>

<script lang="ts">
  import { Button, Row, Col } from 'ant-design-vue';
  import { computed, defineComponent, onMounted } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { CollapseContainer } from '/@/components/Container';
  import { CropperAvatar } from '/@/components/Cropper';

  import { useMessage } from '/@/hooks/web/useMessage';

  import headerImg from '/@/assets/images/header.jpg';
  import { baseSetschemas } from './data';
  import { useUserStore } from '/@/store/modules/user';
  import { uploadImgApi } from '/@/api/sys/upload';
  import { updateProfile } from '/@/api/sys/profile';

  export default defineComponent({
    components: {
      BasicForm,
      CollapseContainer,
      Button,
      ARow: Row,
      ACol: Col,
      CropperAvatar,
    },
    setup() {
      const { createMessage } = useMessage();
      const userStore = useUserStore();

      const [register, { setFieldsValue, getFieldsValue }] = useForm({
        labelWidth: 120,
        schemas: baseSetschemas,
        showActionButtonGroup: false,
      });

      onMounted(async () => {
        const data = userStore.getUserInfo;

        setFieldsValue(data);
      });

      const avatar = computed(() => {
        const { avatar } = userStore.getUserInfo;

        return avatar || headerImg;
      });

      async function handleSubmit() {
        const data = getFieldsValue();
        
        await updateProfile({
          nickname: data.nickname,
          email: data.email,
          introduce: data.introduce,
        });

        createMessage.success('更新成功！');
      }

      return {
        avatar,
        register,
        uploadApi: uploadImgApi as any,
        handleSubmit,
      };
    },
  });
</script>

<style lang="less" scoped>
  .change-avatar {
    img {
      display: block;
      margin-bottom: 15px;
      border-radius: 50%;
    }
  }
  .profile-button {
    margin-top: 45px;
  }
</style>
