<template>
  <BasicModal
    title="附件详情"
    v-bind="$attrs"
    @register="register"
    @ok="handleOk"
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
  import { parseTime, numberFormatter } from '/@/utils/index';

  import { descSchemas } from './data/detail';
  
  export default defineComponent({
    components: { 
      BasicModal, 
      Description 
    },
    props: {
      userData: { type: Object },
    },
    setup(props) {
      const modelRef = ref({});

      const [register, { closeModal }] = useModalInner((data) => {
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

      // 确认
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
  width: 105px;
}
.admin-detail .ant-descriptions-item-content {
  word-break: break-all;
}
</style>