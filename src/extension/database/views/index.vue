<template>
  <div>
    <div class="p-4">
      <BasicTable @register="registerTable">
        <template #data_length="{ record }">
          {{ renderSize(record.data_length) }} 
        </template>

        <template #action="{ record }">
          <TableAction
            :dropDownActions="[
              {
                label: '字段',
                icon: 'ant-design:eye-outlined',
                onClick: handleDetail.bind(null, record),
                ifShow: true,
              },
              {
                label: '优化',
                icon: 'ant-design:paper-clip-outlined',
                onClick: handleOptimize.bind(null, record),
                ifShow: true,
              },
              {
                label: '修复',
                icon: 'ant-design:project-outlined',
                onClick: handleRepair.bind(null, record),
                ifShow: true,
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
    getDatabaseList,
    getDatabaseDetail,
    databaseOptimize,
    databaseRepair,
  } from './../api/index';
  import Detail from './Detail.vue';

  import { 
    tableColumns, 
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
      const [registerDetail, { openModal: openDetail }] = useModal();

      const [registerTable, { reload }] = useTable({
        title: '数据库管理',
        titleHelpMessage: '数据库相关管理',
        api: getDatabaseList,

        loading: true,
        bordered: true,
        showTableSetting: true,
        tableSetting: { 
          fullScreen: true, 
        },
        useSearchForm: false,
        canResize: false,
        rowKey: 'name',

        // 分页
        pagination: false,
        fetchSetting: {
          listField: 'list',
        },
        
        // 请求之前处理参数
        beforeFetch: function(conf) {
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
          width: 100,
          title: '操作',
          dataIndex: 'action',
          slots: { 
            customRender: 'action',
          },
        },
      });

      // 详情
      function handleDetail(record: Recordable) {
        const name = record.name
        getDatabaseDetail(name).then(function(res: any) {
          openDetail(true, {
            name: name,
            list: res.list,
          });
        });
      }

      // 优化
      function handleOptimize(record: Recordable) {
        const { createConfirm, notification } = useMessage();

        const name = record.name

        createConfirm({
          iconType: 'warning',
          title: () => h('span', '提示'),
          content: () => h('span', '你确定要进行优化操作吗？'),
          onOk: async () => {
            databaseOptimize(name).then(function() {
              notification.success({message: '优化数据表成功！'});
            });
          },
        });
      }

      // 修复
      function handleRepair(record: Recordable) {
        const { createConfirm, notification } = useMessage();

        const name = record.name

        createConfirm({
          iconType: 'warning',
          title: () => h('span', '提示'),
          content: () => h('span', '你确定要进行修复操作吗？'),
          onOk: async () => {
            databaseRepair(name).then(function() {
              notification.success({message: '修复数据表成功！'});
            });
          },
        });
      }

      return {
        hasPermission,
        registerTable,

        handleDetail,
        handleOptimize,
        handleRepair,

        parseTime, 
        renderSize,

        registerDetail,
        openDetail,
      };
    },
  });
</script>
