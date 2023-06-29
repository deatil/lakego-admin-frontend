<template>
  <div>
    <div class="p-4">
      <BasicTable @register="registerTable">
        <template #version="{ record }">
          <template v-if="record.install.version != undefined">
            <Tag color="red">
              {{ record.install.version }}
            </Tag>
          </template>

          {{ record.version }}
        </template>

        <template #status="{ record }">
          <template v-if="record.install.name != undefined">
            <Tag color="green">
              已安装
            </Tag>
          </template>
          <template v-else>
            <Tag color="red">
              未安装
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
              },
              {
                label: '安装',
                icon: 'ant-design:plus-circle-outlined',
                onClick: handleInstall.bind(null, record),
                ifShow: function() {
                  if (!hasPermission(['lakego-admin.extension.install'])) {
                    return false;
                  }

                  if (!record.install.name) {
                    return true;
                  } else {
                    return false;
                  }
                },
              },
              {
                label: '更新',
                icon: 'ant-design:safety-certificate-outlined',
                onClick: handleUpgrade.bind(null, record),
                ifShow: function() {
                  if (!hasPermission(['lakego-admin.extension.upgrade'])) {
                    return false;
                  }

                  if (record.upgrade == 1) {
                    return true;
                  } else {
                    return false;
                  }
                },
              },
            ]"
          />
        </template>

      </BasicTable>
    </div>

    <LocalDetail @register="registerDetail" />
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
    useModal 
  } from '/@/components/Modal';
  import { usePermission } from '/@/hooks/web/usePermission';
  import { useMessage } from '/@/hooks/web/useMessage';
  
  import {
    getLocalList,
    install,
    upgrade,
  } from './../api/index';
  import LocalDetail from './LocalDetail.vue';

  import { 
    tableColumnsLocal, 
  } from './data/index';

  export default defineComponent({
    components: { 
      BasicTable, 
      Tag, 
      TableAction,
      LocalDetail,
    },
    setup() {
      const { hasPermission } = usePermission();
      const [registerDetail, { openModal: openDetail }] = useModal();

      const [registerTable, { reload }] = useTable({
        title: '本地扩展',
        titleHelpMessage: '管理本地未安装的扩展或者升级扩展。安装扩展后需要重启后有效',
        api: getLocalList,

        loading: true,
        bordered: true,
        showTableSetting: true,
        tableSetting: { 
          fullScreen: true, 
        },
        useSearchForm: false,
        canResize: false,
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

        columns: tableColumnsLocal,
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

      // 安装
      function handleInstall(record: Recordable) {
        const { createConfirm, notification } = useMessage();

        createConfirm({
          iconType: 'warning',
          title: () => h('span', '提示'),
          content: () => h('span', '你确定要安装当前扩展吗？'),
          onOk: async () => {
            install(record.name).then(function() {
              reload();
              
              notification.success({message: '安装扩展成功！'});
            });
          },
        });
      }

      // 更新
      function handleUpgrade(record: Recordable) {
        const { createConfirm, notification } = useMessage();

        createConfirm({
          iconType: 'warning',
          title: () => h('span', '提示'),
          content: () => h('span', '你确定要更新当前扩展吗？'),
          onOk: async () => {
            upgrade(record.name).then(function() {
              notification.success({message: '更新扩展成功！'});

              reload();
            });
          },
        });
      }

      return {
        hasPermission,
        registerTable,

        handleDetail,
        handleInstall,
        handleUpgrade,

        registerDetail,
        openDetail,
      };
    },
  });
</script>
