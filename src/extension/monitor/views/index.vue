<template>
  <div>
    <div class="p-4">
      <div class="md:flex enter-y !mb-4">
        <div class="md:w-1/2 w-full !mr-4" :loading="loading" >
          <Card title="运行资源" class="card-box">
            <Description 
              :bordered="true"
              @register="sysinfoRegister" 
              class="enter-y system-info" />
          </Card>
        </div>

        <div class="md:w-1/2 w-full table-info" :loading="loading" >
          <Card title="硬盘资源" class="card-box">
            <div>
              <BasicTable
                class="disk-table"
                :columns="tableColumns"
                :dataSource="tableData"
                :loading="loading"
                :bordered="true"
                :pagination="false"
                :canResize="false"
              >
                <template #total="{ record }">
                  {{ renderSize(record.total) }}
                </template>

                <template #free="{ record }">
                  {{ renderSize(record.free) }}
                </template>

                <template #used="{ record }">
                  {{ renderSize(record.used) }}
                </template>

                <template #usedPercent="{ record }">
                  {{ record.usedPercent }} %
                </template>
              </BasicTable>
            </div>
          </Card>
        </div>
      </div>
      
      <div class="md:flex enter-y">
        <div class="md:w-1/2 w-full !mr-4" :loading="loading" >
          <Card title="CPU" class="card-box">
            <Description 
              :bordered="true"
              @register="cpuinfoRegister" 
              class="enter-y system-info" />
          </Card>
        </div>

        <div class="md:w-1/2 w-full" :loading="loading" >
          <Card title="内存" class="card-box">
            <Description 
              :bordered="true"
              @register="meminfoRegister" 
              class="enter-y system-info" />
          </Card>
        </div>
      </div>
      
    </div>

  </div>
</template>

<script lang="ts">
  import { 
    ref,
    reactive,
    defineComponent, 
  } from 'vue';
  import { 
    Card 
  } from 'ant-design-vue';
  import { 
    BasicTable, 
  } from '/@/components/Table';
  import { 
    usePermission 
  } from '/@/hooks/web/usePermission';
  import { 
    Description, 
    DescItem, 
    useDescription 
  } from '/@/components/Description/index';
  import { 
    parseTime, 
    renderSize 
  } from '/@/utils';
  
  import {
    getMonitorInfo,
  } from './../api/monitor';

  export default defineComponent({
    components: { 
      Card, 
      Description,
      BasicTable,
    },
    setup() {
      const { hasPermission } = usePermission();

      // 运行资源
      const sysinfoSchema: DescItem[] = [
        {
          label: '操作系统',
          field: 'sysOsName',
        },
        {
          label: '系统架构',
          field: 'sysOsArch',
        },
        {
          label: '服务器名称',
          field: 'sysComputerName',
        },
        {
          label: '服务器IP',
          field: 'sysComputerIp',
        },
        {
          label: 'Go语言版本',
          field: 'goVersion',
        },
        {
          label: '系统时间',
          field: 'goNowTime',
        },
      ];

      const sysinfoData = reactive({
        sysComputerName: "-",
        sysOsName: "-",
        sysOsArch: "-",
        sysComputerIp: "-",
        goVersion: "-",
        goNowTime: "-",
      });

      const [sysinfoRegister] = useDescription({
        title: '',
        data: sysinfoData,
        schema: sysinfoSchema,
        column: 1,
      });

      // CPU 资源
      const cpuinfoSchema: DescItem[] = [
        {
          label: '核心数',
          field: 'cpuNum',
        },
        {
          label: '使用率',
          field: 'cpuUsed',
        },
        {
          label: 'Load Avg 5',
          field: 'cpuAvg5',
        },
        {
          label: 'Load Avg 15',
          field: 'cpuAvg15',
        },
      ];

      const cpuinfoData = reactive({
        cpuNum: "-",
        cpuUsed: "-",
        cpuAvg5: "-",
        cpuAvg15: "-",
      });

      const [cpuinfoRegister] = useDescription({
        title: '',
        data: cpuinfoData,
        schema: cpuinfoSchema,
        column: 1,
      });

      // 内存资源
      const meminfoSchema: DescItem[] = [
        {
          label: '总数',
          field: 'memTotal',
        },
        {
          label: '已使用',
          field: 'memUsed',
        },
        {
          label: '剩余',
          field: 'memFree',
        },
        {
          label: '系统使用',
          field: 'memUsage',
        },
      ];

      const meminfoData = reactive({
        memTotal: "-",
        memUsed: "-",
        memFree: "-",
        memUsage: "-",
      });

      const [meminfoRegister] = useDescription({
        title: '',
        data: meminfoData,
        schema: meminfoSchema,
        column: 1,
      });

      // 表格头
      const tableColumns = [
        {
          title: '盘符路径',
          dataIndex: 'path',
          slots: { 
            customRender: 'path', 
          },
        },
        {
          title: '文件系统',
          dataIndex: 'fstype',
          slots: { 
            customRender: 'path', 
          },
        },
        {
          title: '总大小',
          dataIndex: 'total',
          width: 120,
          slots: { 
            customRender: 'total', 
          },
        },
        {
          title: '可用大小',
          dataIndex: 'free',
          width: 120,
          slots: { 
            customRender: 'free', 
          },
        },
        {
          title: '已用大小',
          dataIndex: 'used',
          width: 120,
          slots: { 
            customRender: 'used', 
          },
        },
        {
          title: '已用百分比',
          dataIndex: 'usedPercent',
          width: 130,
          slots: { 
            customRender: 'usedPercent', 
          },
        },
      ];

      // 表格数据
      const tableData = ref([])

      // 详情
      const monitorInfo = ref({});
      getMonitorInfo().then(function(data) {
        monitorInfo.value = data;

        sysinfoData.sysComputerName = data["sysComputerName"];
        sysinfoData.sysOsName = data["sysOsName"];
        sysinfoData.sysOsArch = data["sysOsArch"];
        sysinfoData.sysComputerIp = data["sysComputerIp"];
        sysinfoData.goVersion = data["goVersion"];
        sysinfoData.goNowTime = parseTime(data["goNowTime"], '{y}-{m}-{d} {h}:{i}:{s}');

        cpuinfoData.cpuNum = data["cpuNum"];
        cpuinfoData.cpuUsed = data["cpuUsed"] + "%";
        cpuinfoData.cpuAvg5 = data["cpuAvg5"] + "%";
        cpuinfoData.cpuAvg15 = data["cpuAvg15"] + "%";

        meminfoData.memTotal = renderSize(data["memTotal"]);
        meminfoData.memUsed = renderSize(data["memUsed"]);
        meminfoData.memFree = renderSize(data["memFree"]);
        meminfoData.memUsage = renderSize(data["memUsage"]);

        tableData.value = data["diskList"]
      });

      const loading = ref(true);

      setTimeout(() => {
        loading.value = false;
      }, 1500);

      return {
        hasPermission,

        parseTime, 
        renderSize,

        sysinfoRegister,
        cpuinfoRegister,
        meminfoRegister,

        tableColumns,
        tableData,
      };
    },
  });
</script>

<style>
.card-box {
  max-height: 350px;
}
.card-box .ant-table-body {
  overflow: auto scroll !important; 
  max-height: 235px !important;  
  height: 235px !important; 
}
.system-info .ant-descriptions-item-label {
  text-align: right;
  width: 125px;
}
.system-info .ant-descriptions-item-content {
  word-break: break-all;
}
</style>