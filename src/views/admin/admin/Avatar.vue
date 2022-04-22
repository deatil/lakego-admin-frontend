<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    @ok="handleOk"
    title="头像设置"
    @visible-change="handleVisibleChange"
  >
    <Alert
      :message="tip"
      show-icon
    />

    <div class="pt-3px pr-3px mt-3">
      <CropperAvatar
        :uploadApi="uploadApi"
        :value="avatar"
        btnText="更换头像"
        :btnProps="{ preIcon: 'ant-design:cloud-upload-outlined' }"
        @change="updateAdminAvatar"
        width="150"
      />
    </div>
  </BasicModal>
</template>

<script lang="ts">
  import { defineComponent, nextTick, computed, ref } from 'vue';
  import { Alert } from 'ant-design-vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { CropperAvatar } from '/@/components/Cropper';

  import { uploadImgApi } from '/@/api/sys/upload';
  import { updateAvatar } from '/@/api/sys/admin';

  import headerImg from '/@/assets/images/header.jpg';

  export default defineComponent({
    components: {
      Alert,
      BasicModal,
      CropperAvatar,
    },
    props: {
      data: { type: Object },
    },
    setup(props) {
      const modelRef = ref({});
      const tipRef = ref("");

      const [register, { closeModal }] = useModalInner((data) => {
        data && onDataReceive(data);
      });

      function onDataReceive(data) {
        data.avatar_url = data.avatar_url || headerImg;

        modelRef.value = data;

        tipRef.value = "当前正在编辑账号【" + data.name + "】的头像";
      }

      function handleVisibleChange(v) {
        v && props.data && nextTick(() => onDataReceive(props.data));
      }

      async function updateAdminAvatar({ source, data }) {
        if (! data.success) {
          return;
        }

        await updateAvatar(modelRef.value.id, data.data.id);
      }

      function handleOk() {
        modelRef.value = [];

        closeModal();
      }

      const avatar = computed(() => {
        return modelRef.value.avatar_url || headerImg;
      });

      return {
        register, 
        avatar,
        uploadApi: uploadImgApi as any,
        model: modelRef, 
        tip: tipRef,
        updateAdminAvatar,
        handleOk,
        handleVisibleChange 
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
