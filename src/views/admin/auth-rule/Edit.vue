<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    @ok="handleOk"
    title="编辑账号"
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

  import { 
    updataAdmin,
  } from '/@/api/sys/admin';

  import { schemas } from './data/edit';
  
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

      const id = ref();
      const modelRef = ref({});

      const [register, { closeModal }] = useModalInner((data) => {
        data && onDataReceive(data);
      });

      const [
        registerForm,
        {
          validate,
        },
      ] = useForm({
        layout: "vertical",
        schemas,
        showActionButtonGroup: false,
        autoSubmitOnEnter: true,
        submitFunc: handleOk,
      });

      //表单提交
      async function handleOk() {
        try {
          const data = await validate();

          updataAdmin(id.value, {
            "name": data.name,
            "nickname": data.nickname,
            "email": data.email,
            "introduce": data.introduce,
            "status": data.status,
          }).then(() => {
            createMessage.success('账号信息修改成功！');

            modelRef.value = [];
            closeModal();
          });
        } catch (error) {}
      }

      function onDataReceive(data) {
        id.value = data.id;

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
