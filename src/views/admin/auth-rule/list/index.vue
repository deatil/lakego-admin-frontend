<template>
  <div class="p-4">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleReloadCurrent"> 刷新当前页 </a-button>
        <a-button type="primary" @click="handleReload"> 刷新并返回第一页 </a-button>
      </template>

      <template #id="{ record }"> 
        ID: {{ record.id }} 
      </template>

      <template #no="{ record }">
        <Tag color="green">
          {{ record.no }}
        </Tag>
      </template>

      <template #avatar="{ record }">
        <Avatar :size="60" :src="record.avatar" />
      </template>

      <template #img="{ text }">
        <TableImg :size="60" :simpleShow="true" :imgList="text" />
      </template>
      <template #imgs="{ text }"> 
        <TableImg :size="60" :imgList="text" /> 
      </template>

      <template #category="{ record }">
        <Tag color="green">
          {{ record.no }}
        </Tag>
      </template>

      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '编辑',
              onClick: handleEdit.bind(null, record),
              // auth: 'other', // 根据权限控制是否显示: 无权限，不显示
            },
            {
              label: '删除',
              icon: 'ic:outline-delete-outline',
              onClick: handleDelete.bind(null, record),
              // auth: 'super', // 根据权限控制是否显示: 有权限，会显示
            },
          ]"
          :dropDownActions="[
            {
              label: '启用',
              popConfirm: {
                title: '是否启用？',
                confirm: handleOpen.bind(null, record),
              },
              ifShow: (_action) => {
                return record.status !== 'enable'; // 根据业务控制是否显示: 非enable状态的不显示启用按钮
              },
            },
            {
              label: '禁用',
              popConfirm: {
                title: '是否禁用？',
                confirm: handleOpen.bind(null, record),
              },
              ifShow: () => {
                return record.status === 'enable'; // 根据业务控制是否显示: enable状态的显示禁用按钮
              },
            },
            {
              label: '同时控制',
              popConfirm: {
                title: '是否动态显示？',
                confirm: handleOpen.bind(null, record),
              },
              auth: 'super', // 同时根据权限和业务控制是否显示
              ifShow: () => {
                return true;
              },
            },
          ]"
        />
      </template>

    </BasicTable>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable, useTable, BasicColumn, TableImg, TableAction } from '/@/components/Table';
  import { Tag, Avatar } from 'ant-design-vue';
  import { getAttachmentList } from '/@/api/sys/attachment';
  
  const columns: BasicColumn[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      slots: { 
        customRender: 'id' 
      },
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      width: 100,
      slots: { 
        customRender: 'avatar', 
      },
    },
    {
      title: '分类',
      dataIndex: 'category',
      width: 80,
      align: 'center',
      defaultHidden: true,
      slots: { 
        customRender: 'category', 
      },
    },
    {
      title: '姓名',
      dataIndex: 'name',
      width: 120,
    },
    {
      title: '图片列表1',
      dataIndex: 'imgArr',
      helpMessage: ['这是简单模式的图片列表', '只会显示一张在表格中', '但点击可预览多张图片'],
      width: 140,
      slots: { 
        customRender: 'img', 
      },
    },
    {
      title: '照片列表2',
      dataIndex: 'imgs',
      width: 160,
      slots: { customRender: 'imgs' },
    },
    {
      title: '地址',
      dataIndex: 'address',
    },
    {
      title: '编号',
      dataIndex: 'no',
      slots: { customRender: 'no' },
    },
    {
      title: '开始时间',
      dataIndex: 'beginTime',
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
    },
  ];
  
  export default defineComponent({
    components: { 
      BasicTable, 
      TableImg, 
      Tag, 
      Avatar,
      TableAction,
    },
    setup() {
      const [registerTable, { reload }] = useTable({
        title: '附件管理',
        titleHelpMessage: '管理系统的相关附件',
        api: getAttachmentList,

        loading: true,
        bordered: true,
        showTableSetting: true,
        tableSetting: { 
          fullScreen: true, 
        },
        useSearchForm: true,
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
          "keywords": "123",
        },
        // 默认的排序参数
        defSort: {},

        columns: columns,
        actionColumn: {
          width: 250,
          title: '操作',
          dataIndex: 'action',
          slots: { 
            customRender: 'action',
          },
        },
      });

      function handleReloadCurrent() {
        reload();
      }

      function handleReload() {
        reload({
          page: 1,
        });
      }

      function handleEdit(record: Recordable) {
        console.log('点击了编辑', record);
      }
      function handleDelete(record: Recordable) {
        console.log('点击了删除', record);
      }
      function handleOpen(record: Recordable) {
        console.log('点击了启用', record);
      }

      return {
        registerTable,

        handleReloadCurrent,
        handleReload,

        handleEdit,
        handleDelete,
        handleOpen,
      };
    },
  });
</script>
