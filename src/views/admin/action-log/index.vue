<template>
  <div class="p-4">
    <BasicTable @register="registerTable">
      <template #method="{ record }">
        <Tag :color="methodFilter(record.method)">
          {{ record.method }}
        </Tag>
      </template>

      <template #time="{ record }">
        {{ parseTime(record.time) }} 
      </template>

      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '详情',
              icon: 'ant-design:eye-outlined',
              onClick: handleDetail.bind(null, record),
              ifShow: true,
              // auth: 'super', 
            },
          ]"
        />
      </template>

      <template #toolbar>
        <a-button type="danger" @click="handleClearLog">清除日志</a-button>
      </template>

    </BasicTable>
  </div>

  <Detail @register="registerDetail" />
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
    getActionLogList,
    clearActionLog,
  } from '/@/api/sys/actionlog';

  import { 
    useModal 
  } from '/@/components/Modal';
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
      const [registerDetail, { openModal: openDetail }] = useModal();

      const [registerTable, { reload }] = useTable({
        title: '操作日志',
        titleHelpMessage: '管理系统产生的操作日志',
        api: getActionLogList,

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
        openDetail(true, record);
      }

      // 删除
      function handleClearLog() {
        const { createConfirm, notification } = useMessage();

        createConfirm({
          iconType: 'warning',
          title: () => h('span', '提示'),
          content: () => h('span', '你确定要清除操作日志吗？'),
          onOk: async () => {
            clearActionLog().then(function() {
              notification.success({message: '清除操作日志成功！'});
              
              reload();
            });
          },
        });
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
        registerTable,

        handleDetail,
        handleClearLog,

        parseTime, 
        renderSize,

        registerDetail,
        openDetail,

        methodFilter,
      };
    },
  });
</script>
