<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="附件详情"
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

  import { parseTime, numberFormatter } from '/@/utils/index';

  const schemas: FormSchema[] = [
    {
      field: 'id',
      component: 'Input',
      label: '附件ID',
      defaultValue: '',
      dynamicDisabled: true,
    },
    {
      field: 'name',
      component: 'Input',
      label: '附件名称',
      defaultValue: '',
    },
    {
      field: 'mime',
      component: 'Input',
      label: '附件类型',
      dynamicDisabled: true,
    },
    {
      field: 'extension',
      component: 'Input',
      label: '附件后缀',
      dynamicDisabled: true,
    },
    {
      field: 'md5',
      component: 'Input',
      label: 'Md5值',
    },
    {
      field: 'sha1',
      component: 'Input',
      label: 'Sha1值',
    },
    {
      field: 'disk',
      component: 'Input',
      label: '存储磁盘',
      dynamicDisabled: true,
    },
    {
      field: 'path',
      component: 'Input',
      label: '存储路径',
    },
    {
      field: 'size',
      component: 'Input',
      label: '文件大小',
    },
    {
      field: 'create_time',
      component: 'Input',
      label: '添加时间',
      dynamicDisabled: true,
    },
    {
      field: 'status',
      component: 'Input',
      label: '状态',
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
        data.create_time = parseTime(data.create_time, '{y}-{m}-{d} {h}:{i}:{s}');
        data.size = numberFormatter(data.size, 2);
        data.status = (data.status == 1) ? '启用' : '禁用';

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
