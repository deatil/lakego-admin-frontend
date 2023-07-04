<template>
  <BasicModal
    title="日志详情"
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
  import { parseTime } from '/@/utils/index';

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

      function onDataReceive(res) {
        var data = Object.assign({}, res);

        var info = JSON.parse(data.info);

        data.keywords = info.keywords.join(",");
        data.description = info.description;
        data.homepage = info.homepage;
        data.authors = JSON.stringify(info.authors);
        data.require = JSON.stringify(info.require);
        data.update_time = parseTime(data.update_time, '{y}-{m}-{d} {h}:{i}:{s}');
        data.add_time = parseTime(data.add_time, '{y}-{m}-{d} {h}:{i}:{s}');
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