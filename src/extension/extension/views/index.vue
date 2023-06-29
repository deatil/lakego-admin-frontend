<template>
  <div>
    <div class="p-4">
      <BasicTable 
        @register="registerTable"
        @edit-end="handleEditEnd"
      >
        <template #title="{ record }">
          {{ record.title }} 
          <Tag color="green">
            {{ record.name }}
          </Tag>
        </template>

        <template #add_time="{ record }">
          {{ parseTime(record.add_time) }} 
        </template>

        <template #action="{ record }">
          <TableAction
            :actions="[
              {
                label: '详情',
                icon: 'ant-design:eye-outlined',
                onClick: handleDetail.bind(null, record),
                ifShow: true,
              },
              {
                label: '卸载',
                icon: 'ant-design:close-circle-outlined',
                onClick: handleUninstall.bind(null, record),
                ifShow: function() {
                  if (!hasPermission(['lakego-admin.extension.uninstall'])) {
                    return false;
                  }

                  return true;
                },
              },
            ]"
          />
        </template>

      </BasicTable>
    </div>

    <Detail @register="registerDetail" />
  </div>
</template>

<script lang="ts">
  import { 
    h,
    defineComponent, 
  } from 'vue';
  import { 
    Tag 
  } from 'ant-design-vue';
  import { 
    BasicTable, 
    useTable, 
    TableAction 
  } from '/@/components/Table';
  import { 
    parseTime, 
    renderSize 
  } from '/@/utils';
  import { 
    useMessage 
  } from '/@/hooks/web/useMessage';
  import { 
    useModal 
  } from '/@/components/Modal';
  import { usePermission } from '/@/hooks/web/usePermission';
  
  import {
    getList,
    uninstall,
    enable,
    disable,
    sort,
  } from './../api/index';
  import Detail from './Detail.vue';

  import { 
    tableColumns, 
    getFormConfig 
  } from './data/index';

  export default defineComponent({
    components: { 
      BasicTable, 
      Tag, 
      TableAction,
      Detail,
    },
    setup() {
      const { hasPermission } = usePermission();
      const { createMessage } = useMessage();
      const [registerDetail, { openModal: openDetail }] = useModal();

      const [registerTable, { reload }] = useTable({
        title: '扩展管理',
        titleHelpMessage: '管理已安装的扩展。安装扩展后需要重启后有效',
        api: getList,

        loading: true,
        bordered: true,
        showTableSetting: true,
        tableSetting: { 
          fullScreen: true, 
        },
        useSearchForm: true,
        canResize: false,
        formConfig: getFormConfig(),
        rowKey: 'id',

        // 分页
        pagination: { 
          pageSize: 20, 
          // total: 100,
          current: 1,
          showQuickJumper: true,
        },
        fetchSetting: {
          pageField: 'start',
          sizeField: 'limit',
          listField: 'list',
          totalField: 'total',
        },
        
        // 请求之前处理参数
        beforeFetch: function(conf) {
          conf["start"] = (conf["start"] - 1) * conf["limit"];

          return conf;
        },
        // 自定义处理接口返回参数
        afterFetch: function(res) {
          return res;
        },
        // 查询条件请求之前处理
        handleSearchInfoFn: function() {

        },

        // 额外的请求参数
        searchInfo: {
          // "keywords": "123",
        },
        // 默认的排序参数
        defSort: {},

        columns: tableColumns,
        actionColumn: {
          width: 150,
          title: '操作',
          dataIndex: 'action',
          slots: { 
            customRender: 'action',
          },
        },
      });

      // 详情
      function handleDetail(record: Recordable) {
        openDetail(true, record);
      }

      async function handleEditEnd({ record, index, key, value }: Recordable) {
        // 编辑状态
        if (key == "status") {
          return await StatusSave({ name: record.name, value });
        } else if (key == "listorder") {
          return await SortSave({ name: record.name, value });
        }

        return false;
      }

      // 数据保存
      function StatusSave({ value, name }) {
        createMessage.loading({
          content: `正在保存设置`,
          key: '_save_status_data',
          duration: 0,
        });

        if (value === '') {
          createMessage.error({
            content: '状态更新失败',
            key: '_save_status_data',
            duration: 2,
          });
        } else {
          if (value == 1) {
            enable(name).then(() => {
              createMessage.success({
                content: `启用成功`,
                key: '_save_status_data',
                duration: 2,
              });

              reload();
            })
          } else {
            disable(name).then(() => {
              createMessage.success({
                content: `禁用成功`,
                key: '_save_status_data',
                duration: 2,
              });

              reload();
            })
          }
        }
      }

      // 排序保存
      function SortSave({ value, name }) {
        createMessage.loading({
          content: `正在保存设置`,
          key: '_save_sort_data',
          duration: 0,
        });

        if (value === '') {
          createMessage.error({
            content: '排序更新失败',
            key: '_save_sort_data',
            duration: 2,
          });
        } else {
          sort(name, value).then(() => {
            createMessage.success({
              content: `排序更新成功`,
              key: '_save_sort_data',
              duration: 2,
            });
          })
        }
      }

      // 安装
      function handleUninstall(record: Recordable) {
        const { createConfirm, notification } = useMessage();

        createConfirm({
          iconType: 'warning',
          title: () => h('span', '提示'),
          content: () => h('span', '你确定要卸载当前扩展吗？'),
          onOk: async () => {
            uninstall(record.name).then(function() {
              reload();
              
              notification.success({message: '卸载扩展成功！'});
            });
          },
        });
      }
      
      return {
        hasPermission,
        registerTable,

        handleDetail,
        handleEditEnd,
        handleUninstall,

        parseTime, 
        renderSize,

        registerDetail,
        openDetail,
      };
    },
  });
</script>
