<template>
  <div>
    <div class="p-4">
      <BasicTable 
        @register="registerTable"
        @edit-end="handleEditEnd"
        @edit-cancel="handleEditCancel"
        :beforeEditSubmit="beforeEditSubmit"
      >
        <template #url="{ record }"> 
          <div class="rule-method">
            <Tag :color="methodFilter(record.method)">
              {{ record.method }}
            </Tag>
            <span class="ml-1">
              <Tag color="default">
                {{ record.slug }}
              </Tag>
            </span>
          </div>
          <div class="rule-url mt-1">
            <Tag color="pink">
              {{ record.url }}
            </Tag>
          </div>
        </template>

        <template #add_time="{ record }">
          {{ parseTime(record.add_time) }} 
        </template>

        <template #toolbar>
          <a-button type="primary" @click="expandAll">展开全部</a-button>
          <a-button type="primary" @click="collapseAll">折叠全部</a-button>
          <a-button type="primary" preIcon="ant-design:plus-outlined" @click="handleCreate"> 添加路由 </a-button>
          <a-button type="primary" preIcon="ant-design:menu-outlined" @click="handleGotoList"> 列表 </a-button>
        </template>

        <template #action="{ record }">
          <TableAction
            :actions="[
              {
                label: '详情',
                icon: 'ant-design:eye-outlined',
                onClick: handleDetail.bind(null, record),
                // auth: 'super',
              },
              {
                label: '编辑',
                icon: 'ant-design:edit-outlined',
                onClick: handleEdit.bind(null, record),
                // auth: 'super',
              },
            ]"
            :dropDownActions="[
              {
                label: '删除',
                icon: 'ic:outline-delete-outline',
                onClick: handleDelete.bind(null, record),
                // auth: 'super',
              },
            ]"
          />
        </template>

      </BasicTable>
    </div>

    <Create @register="registerCreate" />
    <Edit @register="registerEdit" />
    <Detail @register="registerDetail" />
    
  </div>
</template>

<script lang="ts">
  import { 
    defineComponent, 
  } from 'vue';
  import { 
    Tooltip, 
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
  import { useGo } from '/@/hooks/web/usePage';
  
  import { 
    getAuthGroupTree,
    getAuthGroup,
    enableAuthGroup,
    disableAuthGroup,
    deleteAuthGroup,
    sortAuthGroup
  } from '/@/api/sys/auth-group';
  
  import Create from './Create.vue';
  import Edit from './Edit.vue';
  import Detail from './Detail.vue';

  import { tableColumns, getFormConfig } from './data/index';

  export default defineComponent({
    components: { 
      BasicTable, 
      Tag, 
      Tooltip,
      TableAction,
      Create,
      Detail,
      Edit,
    },
    setup() {
      const { createMessage } = useMessage();
      const go = useGo();

      const [registerCreate, { openModal: openCreate }] = useModal();
      const [registerDetail, { openModal: openDetail }] = useModal();
      const [registerEdit, { openModal: openEdit }] = useModal();

      const [registerTable, { reload, expandAll, collapseAll }] = useTable({
        title: '权限路由',
        titleHelpMessage: '权限路由列表及相关管理',
        api: getAuthGroupTree,

        isTreeTable: true,

        loading: true,
        bordered: true,
        showTableSetting: true,
        showIndexColumn: true,
        tableSetting: { 
          fullScreen: true, 
        },
        useSearchForm: true,
        canResize: false,
        formConfig: getFormConfig(),
        rowKey: 'id',

        // 分页
        pagination: { 
          pageSize: 10, 
          total: 100,
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
          width: 170,
          title: '操作',
          dataIndex: 'action',
          slots: { 
            customRender: 'action',
          },
        },
      });

      // 添加账号
      function handleCreate() {
          openCreate(true, []);
      }

      // 详情
      function handleDetail(record: Recordable) {
        let id = record.id;

        getAuthGroup(id)
          .then(function(data) {
            openDetail(true, data);
          });
      }

      // 编辑
      function handleEdit(record: Recordable) {
        let id = record.id;

        getAuthGroup(id)
          .then(function(data) {
            openEdit(true, data);
          });
      }

      // 删除
      function handleDelete(record: Recordable) {
        const { createConfirm, notification } = useMessage();

        let id = record.id;

        createConfirm({
          iconType: 'warning',
          title: () => '提示',
          content: () => '你确定要删除该用户组吗？',
          onOk: async () => {
            deleteAuthGroup(id).then(function() {
              notification.success({message: '删除成功！'});
              
              reload();
            });
          },
        });
      }

      async function handleEditEnd({ record, index, key, value }: Recordable) {
        // 编辑状态
        if (key == "status") {
          return await StatusSave({ id: record.id, value });
        } else if (key == "listorder") {
          return await SortSave({ id: record.id, value });
        }

        return false;
      }

      // 数据保存
      function StatusSave({ value, id }) {
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
            enableAuthGroup(id).then(() => {
              createMessage.success({
                content: `启用成功`,
                key: '_save_status_data',
                duration: 2,
              });
            })
          } else {
            disableAuthGroup(id).then(() => {
              createMessage.success({
                content: `禁用成功`,
                key: '_save_status_data',
                duration: 2,
              });
            })
          }
        }
      }

      // 排序保存
      function SortSave({ value, id }) {
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
          sortAuthGroup(id, value).then(() => {
            createMessage.success({
              content: `排序更新成功`,
              key: '_save_sort_data',
              duration: 2,
            });
          })
        }
      }

      function beforeEditSubmit({ record, index, key, value }) {
        return true;
      }

      function handleEditCancel() {
      }

      // 跳转到列表
      function handleGotoList() {
        const redirect = "/permission/auth-group";
        go(redirect);
      }

      function methodFilter(method) {
        const methodMap = {
          'GET': 'success',
          'HEAD': 'default',
          'POST': 'warning',
          'PUT': 'warning',
          'DELETE': 'red',
          'PATCH': 'error',
          'OPTIONS': 'default'
        }
        return methodMap[method]
      }

      return {
        methodFilter,

        registerTable,
        expandAll, 
        collapseAll,

        parseTime, 
        renderSize,

        handleGotoList,

        handleCreate,
        registerCreate,
        openCreate,

        handleDetail,
        registerDetail,
        openDetail,

        handleDelete,

        handleEdit,
        registerEdit,
        openEdit,

        handleEditEnd,
        handleEditCancel,
        beforeEditSubmit,
      };
    },
  });
</script>
