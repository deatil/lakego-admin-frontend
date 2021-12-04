<template>
  <div class="lg:flex">
    <Avatar :src="userinfo.avatar || headerImg" :size="72" class="!mx-auto !block" />
    <div class="md:ml-6 flex flex-col justify-center md:mt-0 mt-2">
      <h1 class="md:text-lg text-md">{{ timeInfo.nowTimeCall }}好, {{ userinfo.nickname }}！</h1>
      <span class="text-secondary"> 当前时间: {{ timeInfo.nowTime }}</span>
      <span class="text-secondary"> 你上次登陆: {{ lastActive }} </span>
    </div>

    <div class="flex flex-1 justify-end md:mt-0 mt-4">
      <div class="flex flex-col justify-center text-right md:mr-10 mr-4">
        <span class="text-secondary"> 用户组 </span>
        <span class="text-2xl"> {{ userinfo.groups.length }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed, reactive } from 'vue';
  import { Avatar } from 'ant-design-vue';
  import { useUserStore } from '/@/store/modules/user';
  import headerImg from '/@/assets/images/header.jpg';
  import { parseTime, getNowTime } from '/@/utils/index';

  const userStore = useUserStore();
  const userinfo = computed(() => userStore.getUserInfo);

  const timeInfo = reactive({
    nowTime: "",
    nowTimeCall: "上午好",
  });

  const setTimeInfo = function() {
    setTimeout(() => {
      const nowTime = getNowTime();

      timeInfo.nowTime = nowTime[0];
      timeInfo.nowTimeCall = nowTime[1];

      setTimeInfo();
    }, 1000);
  }
  setTimeInfo();

  const lastActive = parseTime(userStore.getUserInfo?.last_active);
</script>
