<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    @ok="handleOk"
    title="账号详情"
    @visible-change="handleVisibleChange"
    :showCancelBtn="false"
  >
    <div class="pt-3px pr-3px">
      <Description
        class="admin-detail"
        size="middle"
        :bordered="true"
        :column="1"
        :data="model"
        :schema="descSchemas"
      />
    </div>
  </BasicModal>
</template>

<script lang="ts">
  import { defineComponent, ref, nextTick } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { Description } from '/@/components/Description/index';
  import { parseTime } from '/@/utils/index';

  import { descSchemas } from './data/detail';
  
  export default defineComponent({
    components: { 
      BasicModal, 
      Description 
    },
    props: {
      data: { type: Object },
    },
    setup(props) {
      const modelRef = ref({});

      const [register, { closeModal }] = useModalInner((data) => {
        data && onDataReceive(data);
      });

      function onDataReceive(data) {
        data.update_time = parseTime(data.update_time, '{y}-{m}-{d} {h}:{i}:{s}');
        data.add_time = parseTime(data.add_time, '{y}-{m}-{d} {h}:{i}:{s}');
        data.status = (data.status == 1) ? '启用' : '禁用';

        modelRef.value = data;
      }

      function handleVisibleChange(v) {
        v && props.data && nextTick(() => onDataReceive(props.data));
      }

      // 表单提交
      function handleOk() {
        closeModal();
      }

      return { 
        register, 
        handleOk,
        descSchemas, 
        model: modelRef, 
        handleVisibleChange 
      };
    },
  });
</script>

<style>
.admin-detail .ant-descriptions-item-label {
  text-align: right;
  width: 125px;
}
.admin-detail .ant-descriptions-item-content {
  word-break: break-all;
}
</style>