<template>
  <BasicModal
    title="扩展详情"
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
        :schema="localSchemas"
      />
    </div>
  </BasicModal>
</template>

<script lang="ts">
  import { defineComponent, ref, nextTick } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { Description } from '/@/components/Description/index';

  import { localSchemas } from './data/detail';
  
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

      function onDataReceive(res) {
        var data = Object.assign({}, res);

        data.authors = JSON.stringify(data.authors);
        data.require = JSON.stringify(data.require);
        data.upgrade = data.upgrade == 1 ? '是' : '否';
        data.install = data.install.version || '-';

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
        localSchemas, 
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