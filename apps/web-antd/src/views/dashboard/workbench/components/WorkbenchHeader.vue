<template>
  <div class="lg:flex p-4 user-right-bg-img user-base-bg text-white">
    <Avatar :src="userInfo.avatar || headerImg" :size="72" class="!block" />
    <div class="md:ml-2 flex flex-col justify-start md:mt-0 mt-2">
      <h1 class="md:text-lg text-md">{{ userInfo.realName }}({{ userInfo.userNo||'-' }}), 祝您开心每一天！</h1>
      <span class="text-white"> 今日晴，20℃ - 32℃！ </span>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { computed, ref, onMounted } from 'vue';
  import { Avatar } from 'ant-design-vue';
  import { useUserStore } from '@vben/stores';
  import headerImg from '#/assets/images/header.jpg';
  import {getAppingTaskCount} from "#/api/process/process";
  import userRightBg from '#/assets/images/user-right-bg.png'
  const userStore = useUserStore();

  const badgeCounts = ref({});
  const userInfo = userStore.userInfo;

  async function loadCounts () {
    getAppingTaskCount({}).then(res=>{
      badgeCounts.value = {todo: res};
    })
  }

  onMounted(() => {
    loadCounts();
  });

</script>

<style lang="scss" scoped>
  .user-base-bg {
    background:
      url(@/assets/images/user-right-bg.png) no-repeat right / 180px 120px,
      linear-gradient(89deg, rgba(46, 130, 248, 1) 2%, rgba(1, 173, 247, 1) 100%);
  }
</style>
