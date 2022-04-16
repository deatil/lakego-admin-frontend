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
  import { BasicForm, FormSchema, useForm } from '/@/components/Form/index';
  import { useMessage } from '/@/hooks/web/useMessage';

  import { 
    updataAdmin,
  } from '/@/api/sys/admin';

  const { createMessage } = useMessage();

  const schemas: FormSchema[] = [
    {
      field: 'name',
      component: 'Input',
      label: '登录账号',
      defaultValue: '',
      required: true,
    },
    {
      field: 'nickname',
      component: 'Input',
      label: '账号昵称',
      defaultValue: '',
      required: true,
    },
    {
      field: 'email',
      component: 'Input',
      label: '账号邮箱',
      defaultValue: '',
      required: true,
    },
    {
      field: 'introduce',
      component: 'InputTextArea',
      label: '简介',
    },
    {
      field: 'status',
      component: 'Select',
      componentProps: {
        options: [
          {
            label: '启用',
            value: 1,
            key: '1',
          },
          {
            label: '禁用',
            value: 0,
            key: '0',
          },
        ],
      },
      label: '状态',
      required: true,
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
      let id;

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
        labelWidth: 120,
        schemas,
        showActionButtonGroup: false,
        autoSubmitOnEnter: true,
        actionColOptions: {
          span: 24,
        },
        submitFunc: handleOk,
      });

      //表单提交
      async function handleOk() {
        try {
          const data = await validate();

          updataAdmin(id, {
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
        id = data.id;

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
