<template>
  <div class="w-full h-full rounded-md overflow-hidden">
    <Carousel
      v-if="bannerList && bannerList.length > 0"
      autoplay
      class="[&_.slick-dots]:justify-right ![&_.slick-dots>li]:size-2 ![&_.slick-dots>li]:rounded-full ![&_.slick-dots>li>button]:size-2 ![&_.slick-dots>li]:overflow-hidden "
    >
      <div v-for="(item, index) in bannerList" :key="index" class="flex h-full items-center justify-center" >
        <div class="w-full h-full min-h-[250px] bg-cover bg-no-repeat relative" :style="`background-image: url('${item.imgPath}')`">
          <a v-if="item.linkUrl" :href="item.linkUrl" target="_blank" class="z-9 block bg-red h-full w-full bg-transparent h-20"></a>
          <p class="overflow-hidden absolute -bottom-4 p-2 text-white leading-8 w-full bg-gradient-to-b from-blue-500/0 via-gray-500/30 to-gray-500/60 break-keep text-ellipsis whitespace-nowrap">
            {{ item.title }}
          </p>
        </div>
      </div>
    </Carousel>
    <div v-else class="flex items-center justify-center">
      <Empty description="暂无数据" />
    </div>
    <NewsPreviewDrawer ref="newsPreviewDrawerRef"/>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { Carousel, Empty } from 'ant-design-vue';
// import NewsPreviewDrawer from "@/views/portal/cms/news/NewsPreviewDrawer.vue";
// import {useDrawer} from "@/components/Drawer";
// import {useGo} from '@/hooks/web/usePage';
import {getBannerListByCount} from "#/api/portal/cms/banner";

// const [
//   registerNewsPreviewDrawer,
//   {openDrawer: openNewsPreviewDrawer, setDrawerProps: setNewsPreviewDrawerProps},
// ] = useDrawer();

const showNewsDetail = (record: any) => {
  // 预览前获取数据传入预览方法
  openNewsPreviewDrawer(true, {
    isTemp: false,
    record,
  });
  setNewsPreviewDrawerProps({
    title: `预览 - ${record.title}`,
    bodyStyle: {padding: '0px', margin: '0px'},
    width: 1000,
    showOkBtn: false,
    showCancelBtn: true,
    cancelText: '关闭',
  });
}
const bannerList = ref([]);

onMounted(() => {
  getBannerListByCount({boardSn: 'workbench_banner', count: 5}).then(res => {
    bannerList.value = res;
  });
});

</script>

<style lang="scss" scoped>
@use '../index.scss';
</style>
