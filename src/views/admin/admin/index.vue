<template>
  <div class="p-4">
    <BasicTable @register="registerTable">
      <template #avatar_url="{ record }"> 
        <img :src="record.avatar_url || headerImg" style="width:55px;height:55px;border-radius: 50%;" />
      </template>

      <template #last_active="{ record }"> 
        {{ parseTime(record.last_active) }} 
      </template>

      <template #add_time="{ record }">
        {{ parseTime(record.add_time) }} 
      </template>

      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 添加账号 </a-button>
      </template>

      <template #status="{ record }">
        <template v-if="record.status == 1">
          <Tag color="green">
            启用
          </Tag>
        </template>
        <template v-else>
          <Tag color="red">
            禁用
          </Tag>
        </template>
      </template>

      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '详情',
              icon: 'ant-design:file-outlined',
              onClick: handleDetail.bind(null, record),
              // auth: 'super',
            },
            {
              label: '编辑',
              icon: 'ant-design:edit-outlined',
              onClick: handleEdit.bind(null, record),
              // auth: 'super', // 根据权限控制是否显示: 有权限，会显示
            },
            {
              label: '密码',
              icon: 'ant-design:question-circle-outlined',
              onClick: handlePassword.bind(null, record),
              // auth: 'super', // 根据权限控制是否显示: 有权限，会显示
            },
            {
              label: '删除',
              icon: 'ic:outline-delete-outline',
              onClick: handleDelete.bind(null, record),
              // auth: 'super', // 根据权限控制是否显示: 有权限，会显示
            },
          ]"
        />
      </template>

    </BasicTable>
  </div>

  <Create @register="registerCreate" />
  <Detail @register="registerDetail" />
  <Edit @register="registerEdit" />
  <Password @register="registerPassword" />
</template>

<script lang="ts">
  import { 
    defineComponent, 
  } from 'vue';
  import { Tag } from 'ant-design-vue';
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

  import headerImg from '/@/assets/images/header.jpg';
  
  import { 
    getAdminList,
    getAdminGroups,
    getAdmin,
    enableAdmin,
    disableAdmin,
    deleteAdmin,
  } from '/@/api/sys/admin';

  import { useModal } from '/@/components/Modal';
  import Detail from './Detail.vue';
  import Edit from './Edit.vue';
  import Password from './Password.vue';
  import Create from './Create.vue';

  import { tableColumns, getFormConfig } from './data/columns';

  export default defineComponent({
    components: { 
      BasicTable, 
      Tag, 
      TableAction,
      Create,
      Detail,
      Edit,
      Password,
    },
    setup() {
      const [registerCreate, { openModal: openCreate }] = useModal();
      const [registerDetail, { openModal: openDetail }] = useModal();
      const [registerEdit, { openModal: openEdit }] = useModal();
      const [registerPassword, { openModal: openPassword }] = useModal();

      const [registerTable, { reload }] = useTable({
        title: '管理员',
        titleHelpMessage: '管理员列表及相关管理',
        api: getAdminList,

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
          width: 250,
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

        getAdmin(id)
          .then(function(data) {
            openDetail(true, data);
          });
      }

      // 编辑
      function handleEdit(record: Recordable) {
        let id = record.id;

        getAdmin(id)
          .then(function(data) {
            openEdit(true, data);
          });
      }

      // 更改密码
      function handlePassword(record: Recordable) {
        let id = record.id;

        getAdmin(id)
          .then(function(data) {
            openPassword(true, data);
          });
      }

      // 删除
      function handleDelete(record: Recordable) {
        const { createConfirm, notification } = useMessage();

        let id = record.id;

        createConfirm({
          iconType: 'warning',
          title: () => '提示',
          content: () => '你确定要删除该账号吗？',
          onOk: async () => {
            deleteAdmin(id).then(function() {
              notification.success({message: '删除成功！'});
              
              reload();
            });
          },
        });
      }

      return {
        headerImg,

        registerTable,

        parseTime, 
        renderSize,

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

        handlePassword,
        registerPassword,
        openPassword,
      };
    },
  });
</script>
