<template>
  <CollapseContainer title="头像设置" :canExpan="false">
    <a-row :gutter="24">
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

  </CollapseContainer>
</template>

<script lang="ts">
  import { Button, Row, Col } from 'ant-design-vue';
  import { computed, defineComponent, onMounted } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { CollapseContainer } from '/@/components/Container';
  import { CropperAvatar } from '/@/components/Cropper';

  import headerImg from '/@/assets/images/header.jpg';
  import { baseSetschemas } from './data';
  import { useUserStore } from '/@/store/modules/user';
  import { uploadImgApi } from '/@/api/sys/upload';
  import { updateProfileAvatar } from '/@/api/sys/profile';

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
      const userStore = useUserStore();

      const [register, { setFieldsValue }] = useForm({
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
        if (! data.success) {
          return;
        }

        const userinfo = userStore.getUserInfo;

        userinfo.avatar = source;
        userStore.setUserInfo(userinfo);

        await updateProfileAvatar({
          avatar: data.data.id,
        });
      }

      return {
        avatar,
        register,
        uploadApi: uploadImgApi as any,
        updateAvatar,
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
