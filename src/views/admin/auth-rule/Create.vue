<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    @ok="handleOk"
    title="添加账号"
    @visible-change="handleVisibleChange"
  >
    <div class="pt-3px pr-3px">
      <BasicForm @register="registerForm" :model="model" />
    </div>
  </BasicModal>
</template>

<script lang="ts">
  import { defineComponent, ref, nextTick } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { useMessage } from '/@/hooks/web/useMessage';

  import { useUserStore } from '/@/store/modules/user';
  import { createAdmin } from '/@/api/sys/admin';
  import { schemas } from './data/create';
  
  export default defineComponent({
    components: { 
      BasicModal, 
      BasicForm 
    },
    props: {
      userData: { type: Object },
    },
    setup(props) {
      const { createMessage } = useMessage();
      const userStore = useUserStore();
      
      const modelRef = ref({});

      const [
        registerForm,
        {
          validate,
          updateSchema,
        },
      ] = useForm({
        layout: "vertical",
        schemas,
        showActionButtonGroup: false,
        autoSubmitOnEnter: true,
        submitFunc: handleOk,
      });

      const [register, { closeModal }] = useModalInner((data) => {
        data && onDataReceive(data);

        const { groups } = userStore.getUserInfo || {};

        const treeData = groups;
        updateSchema({
          field: 'group_id',
          componentProps: { treeData },
        });
      });

      //表单提交
      async function handleOk() {
        try {
          const data = await validate();

          createAdmin({
            "group_id": data.group_id,
            "name": data.name,
            "nickname": data.nickname,
            "email": data.email,
            "introduce": data.introduce,
            "status": data.status,
          }).then(() => {
            createMessage.success('账号添加成功！');

            modelRef.value = [];
            closeModal();
          });
        } catch (error) {}
      }

      function onDataReceive(data) {
        modelRef.value = data;
      }

      function handleVisibleChange(v) {
        v && props.userData && nextTick(() => onDataReceive(props.userData));
      }

      return { 
        register, 
        handleOk,
        schemas, 
        registerForm, 
        model: modelRef, 
        handleVisibleChange 
      };
    },
  });
</script>
