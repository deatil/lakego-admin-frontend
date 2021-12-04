<template>
  <CollapseContainer title="基本设置" :canExpan="false">
    <a-row :gutter="24">
      <a-col :span="14">
        <BasicForm @register="register" />
      </a-col>

      <a-col :span="10">
        <div class="change-avatar">
          <div class="mb-2">头像</div>
          <CropperAvatar
            :uploadApi="uploadApi"
            :value="avatar"
            btnText="更换头像"
            :btnProps="{ preIcon: 'ant-design:cloud-upload-outlined' }"
            @change="updateAvatar"
            width="150"
          />
        </div>
      </a-col>
    </a-row>

    <Button type="primary" @click="handleSubmit"> 更新基本信息 </Button>
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
  import { updateProfile, updateProfileAvatar } from '/@/api/sys/profile';

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

      async function updateAvatar({ source, data }) {
        const userinfo = userStore.getUserInfo;

        userinfo.avatar = source;
        userStore.setUserInfo(userinfo);

        await updateProfileAvatar({
          avatar: data.data.id,
        });
      }

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
        updateAvatar,
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
</style>
