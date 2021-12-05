<template>
  <div class="p-4">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleReloadCurrent"> 刷新当前页 </a-button>
        <a-button type="primary" @click="handleReload"> 刷新并返回第一页 </a-button>
      </template>

      <template #size="{ record }"> 
        {{ renderSize(record.size) }} 
      </template>

      <template #add_time="{ record }">
        {{ parseTime(record.add_time) }} 
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
              icon: 'ion:settings-outline',
              onClick: handleDetail.bind(null, record),
              // auth: 'super',
            },
           {
              label: '编辑',
              icon: 'ion:settings-outline',
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
        />
      </template>

    </BasicTable>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
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
  
  import { getAttachmentList } from '/@/api/sys/attachment';

  import { tableColumns } from './data/columns';

  export default defineComponent({
    components: { 
      BasicTable, 
      Tag, 
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

      function handleReloadCurrent() {
        reload();
      }

      function handleReload() {
        reload({
          page: 1,
        });
      }

      // 详情
      function handleDetail(record: Recordable) {
        console.log('点击了详情', record);
      }
      function handleEdit(record: Recordable) {
        console.log('点击了编辑', record);
      }
      function handleDelete(record: Recordable) {
        console.log('点击了删除', record);
      }

      return {
        registerTable,

        handleReloadCurrent,
        handleReload,

        handleDetail,
        handleEdit,
        handleDelete,

        parseTime, 
        renderSize,
      };
    },
  });
</script>
