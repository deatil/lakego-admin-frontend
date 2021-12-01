<template>
  <PageWrapper>
    <template #headerContent> 
      <WorkbenchHeader /> 
    </template>

    <div class="lg:flex">
      <div class="lg:w-7/10 w-full !mr-4 enter-y">
        <Description @register="infoRegister" class="enter-y system-info" />
      
        <ProjectCard :loading="loading" class="!my-4 enter-y" />
      </div>

      <div class="lg:w-3/10 w-full enter-y">
        <QuickNav :loading="loading" class="enter-y" />

        <Card class="!my-4 enter-y" :loading="loading">
          <img class="xl:h-50 h-30 mx-auto" :src="img" />
        </Card>
      </div>
    </div>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { h, ref, reactive } from 'vue';
  import { Tag, Card } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import WorkbenchHeader from './components/WorkbenchHeader.vue';
  import ProjectCard from './components/ProjectCard.vue';
  import QuickNav from './components/QuickNav.vue';
  import { Description, DescItem, useDescription } from '/@/components/Description/index';
  import { getSytemInfo } from '/@/api/sys/system';
  import { LakegoEnum } from '/@/enums/lakegoEnum';
  import illustration from '/@/assets/svg/illustration.svg';

  const img = illustration;

  const commonTagRender = (color: string) => (curVal) => h(Tag, { color }, () => curVal);
  const commonLinkRender = (text: string) => (href) => h('a', { href, target: '_blank' }, text);

  const infoSchema: DescItem[] = [
    {
      label: '前端版本',
      field: 'lakegoFrontendVer',
      render: commonTagRender('blue'),
    },
    {
      label: '后端版本',
      field: 'lakegoInfo',
    },
    {
      label: '服务器时间',
      field: 'serverDatetime',
    },
    {
      label: '服务器信息',
      field: 'server',
    },
    {
      label: 'GO 版本',
      field: 'goversion',
    },
    {
      label: 'CPU 数量',
      field: 'numcpu',
      render: commonTagRender('blue'),
   },
    {
      label: '项目地址',
      field: 'lakegoGithub',
      render: commonLinkRender('lakego-admin'),
    },
  ];

  const infoData = reactive({
    lakegoInfo: "-",
    lakegoFrontendVer: LakegoEnum.VERSION,
    serverDatetime: "-",
    server: "-",
    goversion: "-",
    numcpu: "-",
    lakegoGithub: "https://github.com/deatil/lakego-admin",
  });

  const [infoRegister] = useDescription({
    title: '系统信息',
    data: infoData,
    schema: infoSchema,
    column: 1,
  });

  getSytemInfo().then(function(res) {
    infoData.lakegoInfo = res["system"]["name"] + " v" + res["system"]["version"];

    infoData.serverDatetime = res["datetime"];
    infoData.server = res["hostname"] + " / " + res["goos"] + " / " + res["goarch"];
    infoData.goversion = res["version"];
    infoData.numcpu = res["numcpu"];
  });


  const loading = ref(true);

  setTimeout(() => {
    loading.value = false;
  }, 1500);
</script>
