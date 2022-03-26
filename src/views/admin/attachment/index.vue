<template>
  <div class="p-4">
    <BasicTable @register="registerTable">
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
              icon: 'ant-design:eye-outlined',
              onClick: handleDetail.bind(null, record),
              ifShow: true,
              // auth: 'super', // 根据权限控制是否显示: 有权限，会显示
            },
            {
              label: '删除',
              icon: 'ant-design:delete-outlined',
              onClick: handleDelete.bind(null, record),
              ifShow: true,
              // auth: 'super', 
            },
            {
              label: '下载',
              icon: 'ant-design:download-outlined',
              onClick: handleDownload.bind(null, record),
              ifShow: true,
              // auth: 'super', 
            },
          ]"
        />
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
  import { useMessage } from '/@/hooks/web/useMessage';
  
  import { 
    getAttachmentList,
    getAttachment,
    deleteAttachment,
    getAttachmentDowncode,
    getAttachmentDownloadUrl
  } from '/@/api/sys/attachment';

  import { useModal } from '/@/components/Modal';
  import Detail from './Detail.vue';

  import { tableColumns, getFormConfig } from './data/columns';

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

      // 详情
      function handleDetail(record: Recordable) {
        let id = record.id;

        getAttachment(id)
          .then(function(data) {
            openDetail(true, data);
          });
      }

      // 删除
      function handleDelete(record: Recordable) {
        const { createConfirm, notification } = useMessage();

        createConfirm({
          iconType: 'warning',
          title: () => h('span', '提示'),
          content: () => h('span', '你确定要删除当前附件吗？'),
          onOk: async () => {
            deleteAttachment(record.id).then(function() {
              notification.success({message: '删除附件成功！'});
            });
          },
        });
      }

      // 下载
      function handleDownload(record: Recordable) {
        let id = record.id;

        const { notification } = useMessage();

        if (id == '') {
          notification.success({message: '请选择要下载的附件！'});
          return
        }

        getAttachmentDowncode(id).then((res) => {
          const code = res.code
          const url = getAttachmentDownloadUrl(code)

          window.open(url, '_blank')
        });
      }

      return {
        registerTable,

        handleDetail,
        handleDelete,
        handleDownload,

        parseTime, 
        renderSize,

        registerDetail,
        openDetail,
      };
    },
  });
</script>
