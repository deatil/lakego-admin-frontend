<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    @ok="handleOk"
    title="账号授权"
    @visible-change="handleVisibleChange"
  >
    <Alert
      :message="tip"
      show-icon
    />

    <div class="mb-4 mt-4">
      <a-button @click="expandAll(true)" class="mr-2"> 展开全部 </a-button>
      <a-button @click="expandAll(false)" class="mr-2"> 折叠全部 </a-button>
      <a-button @click="checkAll(true)" class="mr-2"> 全选 </a-button>
      <a-button @click="checkAll(false)" class="mr-2"> 全不选 </a-button>
    </div>

    <div class="pt-3px pr-3px" style="border: 1px solid rgb(217, 217, 217);">
      <BasicTree 
        :treeData="treeData" 
        ref="treeRef" 
        :checkable="true"
        :replaceFields="{ key: 'id' }"
        @check="onCheck"
        />
    </div>
  </BasicModal>
</template>

<script lang="ts">
  import { defineComponent, nextTick, ref, unref } from 'vue';
  import { Alert } from 'ant-design-vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicTree, TreeActionType, TreeItem } from '/@/components/Tree/index';
  import { useMessage } from '/@/hooks/web/useMessage';

  import { getAuthGroup, updateAccess } from '/@/api/sys/auth-group';
  import { getAuthRuleTree } from '/@/api/sys/auth-rule';

  export default defineComponent({
    components: {
      Alert, 
      BasicModal,
      BasicTree,
    },
    props: {
      data: { type: Object },
    },
    setup(props) {
      const { createMessage } = useMessage();

      const treeRef = ref<Nullable<TreeActionType>>(null);
      const treeData = ref<TreeItem[]>([]);
      const modelRef = ref({});
      const tipRef = ref("");

      const checkedKeyData = ref({});

      const [register, { closeModal }] = useModalInner((data) => {
        data && onDataReceive(data);
      });

      function getTree() {
        const tree = unref(treeRef);
        if (!tree) {
          throw new Error('tree is null!');
        }
        return tree;
      }

      async function fetch() {
        await getAuthRuleTree().then((res) => {
          treeData.value = res.list as unknown as TreeItem[];
        })
      }

      // 权限树的反显
      function dataShow(dataList, dataArr, result = []) {
        dataList.find((item) => {
          if (dataArr.includes(item.id) && !item.children) {
            result.push(item.id);
          }
          
          if (item.children) {
            dataShow(item.children, dataArr, result);
          }
        })
        
        return result;
      }

      async function onDataReceive(data) {
        fetch();

        let defaultKeys = [];

        await getAuthGroup(data.id).then((res) => {
          res.rule_accesses.forEach(item => {
            defaultKeys.push(item);
          });
        });

        // 格式化反选
        defaultKeys = dataShow(treeData.value, defaultKeys)

        getTree().setCheckedKeys(defaultKeys);

        modelRef.value = data;

        tipRef.value = "当前正在编辑用户组【" + data.title + "】的权限";
      }

      function handleVisibleChange(v) {
        v && props.data && nextTick(() => onDataReceive(props.data));
      }

      async function handleOk() {
        const keys = getTree().getCheckedKeys();

        const halfChecked = checkedKeyData.value.halfChecked;

        // 合并
        const ids = keys.join(",") + "," + halfChecked.join(",");

        await updateAccess(modelRef.value.id, ids).then(() => {
            createMessage.success('用户组权限修改成功！');

            modelRef.value = [];
            closeModal();
          });

        closeModal();
      }

      function checkAll(checkAll: boolean) {
        getTree().checkAll(checkAll);
      }

      function expandAll(checkAll: boolean) {
        getTree().expandAll(checkAll);
      }

      function onCheck(checkedKeys, info) {
        checkedKeyData.value = {
          checked: checkedKeys, 
          halfChecked: info.halfCheckedKeys
        }
      }

      return {
        register, 
        treeData,
        treeRef,
        model: modelRef, 
        tip: tipRef,
        handleOk,
        handleVisibleChange,
        checkAll,
        expandAll,
        onCheck,
      };
    },
  });
</script>
