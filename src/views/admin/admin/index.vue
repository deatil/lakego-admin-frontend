<template>
  <div class="p-4">
    <BasicTable 
      @register="registerTable"
      @edit-end="handleEditEnd"
      @edit-cancel="handleEditCancel"
      :beforeEditSubmit="beforeEditSubmit"
    >
      <template #avatar_url="{ record }"> 
        <Tooltip>
          <template #title>点击更换头像</template>
          <img :src="record.avatar_url || nopic" @click="handleAvatar(record)" style="width:55px;height:55px;border-radius: 50%;" />
        </Tooltip>
      </template>

      <template #last_active="{ record }"> 
        {{ parseTime(record.last_active) }} 
      </template>

      <template #add_time="{ record }">
        {{ parseTime(record.add_time) }} 
      </template>

      <template #toolbar>
        <a-button type="primary" preIcon="ant-design:plus-outlined" @click="handleCreate"> 添加账号 </a-button>
        <a-button type="primary" preIcon="ant-design:bars-outlined" @click="handleResetPermission"> 同步权限 </a-button>
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
              // auth: 'super', // 根据权限控制是否显示: 有权限，会显示
            },
          ]"
          :dropDownActions="[
            {
              label: '授权',
              icon: 'ant-design:edit-outlined',
              onClick: handleAccess.bind(null, record),
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
  <Avatar @register="registerAvatar" />
  <Access @register="registerAccess" />
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
  
  import { 
    getAdminList,
    getAdmin,
    enableAdmin,
    disableAdmin,
    deleteAdmin,
    adminResetPermission
  } from '/@/api/sys/admin';
  
  import Detail from './Detail.vue';
  import Edit from './Edit.vue';
  import Password from './Password.vue';
  import Create from './Create.vue';
  import Avatar from './Avatar.vue';
  import Access from './Access.vue';

  import nopic from '/@/assets/images/nopic.png';

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
      Password,
      Avatar,
      Access,
    },
    setup() {
      const { createMessage } = useMessage();

      const [registerCreate, { openModal: openCreate }] = useModal();
      const [registerDetail, { openModal: openDetail }] = useModal();
      const [registerEdit, { openModal: openEdit }] = useModal();
      const [registerPassword, { openModal: openPassword }] = useModal();
      const [registerAvatar, { openModal: openAvatar }] = useModal();
      const [registerAccess, { openModal: openAccess }] = useModal();

      const [registerTable, { reload }] = useTable({
        title: '管理员',
        titleHelpMessage: '管理员列表及相关管理',
        api: getAdminList,

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

      async function handleEditEnd({ record, index, key, value }: Recordable) {
        // 编辑状态
        if (key == "status") {
          return await StatusSave({ id: record.id, value });
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
            enableAdmin(id).then(() => {
              createMessage.success({
                content: `启用成功`,
                key: '_save_status_data',
                duration: 2,
              });
            })
          } else {
            disableAdmin(id).then(() => {
              createMessage.success({
                content: `禁用成功`,
                key: '_save_status_data',
                duration: 2,
              });
            })
          }
        }
      }

      function beforeEditSubmit({ record, index, key, value }) {
        return true;
      }

      function handleEditCancel() {
      }

      // 更改头像
      function handleAvatar(record) {
        openAvatar(true, record);
      }

      // 授权
      function handleAccess(record) {
        openAccess(true, record);
      }

      // 账号权限同步
      function handleResetPermission(record: Recordable) {
        const { createConfirm, notification } = useMessage();

        createConfirm({
          iconType: 'warning',
          title: () => '提示',
          content: () => '你确定要同步权限吗？',
          onOk: async () => {
            adminResetPermission().then(function() {
              notification.success({message: '同步权限成功！'});
              
              reload();
            });
          },
        });
      }

      return {
        nopic,

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
        handleResetPermission,

        handleEdit,
        registerEdit,
        openEdit,

        handleAccess,
        registerAccess,
        openAccess,

        handlePassword,
        registerPassword,
        openPassword,

        handleAvatar,
        registerAvatar,
        openAvatar,

        handleEditEnd,
        handleEditCancel,
        beforeEditSubmit,
      };
    },
  });
</script>
