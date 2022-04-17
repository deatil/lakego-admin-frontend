<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    @ok="handleOk"
    title="更改密码"
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
  import { BasicForm, FormSchema, useForm } from '/@/components/Form/index';
  import { useMessage } from '/@/hooks/web/useMessage';

  import { MD5 } from 'crypto-js';
  
  import { 
    updatePassword,
  } from '/@/api/sys/admin';

  const schemas: FormSchema[] = [
    {
      field: 'id',
      component: 'Input',
      label: '账号ID',
      defaultValue: '',
      dynamicDisabled: true,
    },
    {
      field: 'password',
      label: '新的密码',
      component: 'StrengthMeter',
      componentProps: {
        placeholder: '新密码',
      },
      rules: [
        {
          required: true,
          message: '请输入新密码',
        },
      ],
    },
  ];
  
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

          if (data.password == "") {
            createMessage.error('密码不能为空!');
            return;
          }

          updatePassword(data.id, MD5(data.password).toString()).then(() => {
            createMessage.success('账号密码修改成功！');

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
