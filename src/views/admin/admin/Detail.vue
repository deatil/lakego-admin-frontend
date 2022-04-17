<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="账号详情"
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
  import { parseTime } from '/@/utils/index';

  const schemas: FormSchema[] = [
    {
      field: 'id',
      component: 'Input',
      label: '账号ID',
      defaultValue: '',
      dynamicDisabled: true,
    },
    {
      field: 'name',
      component: 'Input',
      label: '登录账号',
      defaultValue: '',
    },
    {
      field: 'nickname',
      component: 'Input',
      label: '账号昵称',
      defaultValue: '',
    },
    {
      field: 'email',
      component: 'Input',
      label: '账号邮箱',
      defaultValue: '',
    },
    {
      field: 'introduce',
      component: 'InputTextArea',
      label: '简介',
    },
    {
      field: 'is_root',
      component: 'Input',
      label: '超级管理员',
      dynamicDisabled: true,
    },
    {
      field: 'last_active',
      component: 'Input',
      label: '最后登录',
      dynamicDisabled: true,
    },
    {
      field: 'update_time',
      component: 'Input',
      label: '最后更新',
      dynamicDisabled: true,
    },
    {
      field: 'add_time',
      component: 'Input',
      label: '注册时间',
      dynamicDisabled: true,
    },

  ];
  
  export default defineComponent({
    components: { 
      BasicModal, 
      BasicForm 
    },
    props: {
      data: { type: Object },
    },
    setup(props) {
      const modelRef = ref({});

      const [
        registerForm,
        {
          // setFieldsValue,
          // setProps
        },
      ] = useForm({
        layout: "vertical",
        schemas,
        showActionButtonGroup: false,
        /*
        labelWidth: 120,
        actionColOptions: {
          span: 24,
        },
        */
      });

      const [register] = useModalInner((data) => {
        data && onDataReceive(data);
      });

      function onDataReceive(data) {
        data.last_active = parseTime(data.last_active, '{y}-{m}-{d} {h}:{i}:{s}');
        data.update_time = parseTime(data.update_time, '{y}-{m}-{d} {h}:{i}:{s}');
        data.add_time = parseTime(data.add_time, '{y}-{m}-{d} {h}:{i}:{s}');
        data.is_root = (data.is_root == 1) ? '是' : '否';

        modelRef.value = data;
      }

      function handleVisibleChange(v) {
        v && props.data && nextTick(() => onDataReceive(props.data));
      }

      return { 
        register, 
        schemas, 
        registerForm, 
        model: modelRef, 
        handleVisibleChange 
      };
    },
  });
</script>
