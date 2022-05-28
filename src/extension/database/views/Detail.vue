<template>
  <BasicModal
    title="数据表详情"
    v-bind="$attrs"
    @register="register"
    @ok="handleOk"
    @visible-change="handleVisibleChange"
    :showCancelBtn="false"
  >
    <div class="pt-3px pr-3px">
      <Alert
        :message="tip"
        show-icon
      />

      <div :class="`${prefixCls}__content`">
        <a-list :pagination="false">
          <template v-for="item in list" :key="item.id">
            <a-list-item class="list">
              <a-list-item-meta>
                <template #description>
                  <div class="info">
                    <div><span>字段名</span>{{ item.name }}</div>
                    <div><span>类型</span>{{ item.type }}</div>
                    <div><span>排序规则</span>{{ item.collation }}</div>
                    <div><span>是否为空</span>{{ item.null }}</div>
                    <div><span>是否为主键</span>{{ item.key }}</div>
                    <div><span>默认值</span>{{ item.default }}</div>
                    <div><span>更多信息</span>{{ item.extra }}</div>
                    <div><span>备注</span>{{ item.comment }}</div>
                  </div>
                </template>
              </a-list-item-meta>
            </a-list-item>
          </template>
        </a-list>
      </div>
    </div>
  </BasicModal>
</template>

<script lang="ts">
  import { defineComponent, ref, nextTick } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { Alert, List } from 'ant-design-vue';
  
  export default defineComponent({
    components: { 
      Alert,
      BasicModal, 
      [List.name]: List,
      [List.Item.name]: List.Item,
      AListItemMeta: List.Item.Meta,
    },
    props: {
      userData: { type: Object },
    },
    setup(props) {
      const modelRef = ref({});
      const tipRef = ref("");

      const [register, { closeModal }] = useModalInner((data) => {
        data && onDataReceive(data);
      });

      function onDataReceive(data) {
        // 设置表单值
        modelRef.value = data.list;

        tipRef.value = "当前正在查看数据表【" + data.name + "】的信息";
      }

      function handleVisibleChange(v) {
        v && props.userData && nextTick(() => onDataReceive(props.userData));
      }

      // 确认
      function handleOk() {
        closeModal();
      }

      return { 
        prefixCls: 'list-basic',
        register, 
        handleOk,
        list: modelRef, 
        tip: tipRef,
        handleVisibleChange 
      };
    },
  });
</script>

<style lang="less" scoped>
  .list-basic {
    &__content {
      background-color: @component-background;

      .info {
        display: inline-block;

        div {
          float: left;
          padding: 0 20px;
          height: 60px;

          span {
            display: block;
            color: #151515;
          }
        }
      }

    }
  }
</style>