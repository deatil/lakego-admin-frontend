<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="日志详情"
    @visible-change="handleVisibleChange"
  >
    <div class="pt-3px pr-3px">
      <BasicForm @register="registerForm" :model="model" @submit="handleSubmit" />
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
      label: '日志ID',
      defaultValue: '',
      dynamicDisabled: true,
    },
    {
      field: 'name',
      component: 'Input',
      label: '操作账号',
      defaultValue: '',
      dynamicDisabled: true,
    },
    {
      field: 'url',
      component: 'InputTextArea',
      label: '请求链接',
    },
    {
      field: 'method',
      component: 'Input',
      label: '请求方法',
    },
    {
      field: 'status',
      component: 'Input',
      label: '状态值',
    },
    {
      field: 'ip',
      component: 'Input',
      label: '请求IP',
    },
    {
      field: 'time',
      component: 'Input',
      label: '请求时间',
    },
    {
      field: 'useragent',
      component: 'InputTextArea',
      label: '客户端',
    },
    {
      field: 'info',
      component: 'InputTextArea',
      label: '请求内容',
    },
    {
      field: 'time',
      component: 'Input',
      label: '请求时间',
      dynamicDisabled: true,
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
      const modelRef = ref({});

      const [
        registerForm,
        {
          // setFieldsValue,
          // setProps
        },
      ] = useForm({
        layout: 'vertical',
        schemas,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 24,
        },
        submitOnReset: true,
        showResetButton: false,
      });

      const [register] = useModalInner((data) => {
        data && onDataReceive(data);
      });

      function onDataReceive(data) {
        data.time = parseTime(data.time, '{y}-{m}-{d} {h}:{i}:{s}');

        // 设置表单值
        modelRef.value = data;
      }

      function handleVisibleChange(v) {
        v && props.userData && nextTick(() => onDataReceive(props.userData));
      }

      return { 
        register, 
        schemas, 
        registerForm, 
        model: modelRef, 
        handleSubmit: (values: any) => {},
        handleVisibleChange 
      };
    },
  });
</script>
