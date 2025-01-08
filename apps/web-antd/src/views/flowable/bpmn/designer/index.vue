<template>
  <div>
    <FramePage :frameSrc="url" />
  </div>
</template>
<script lang="ts" setup>
  import { onMounted, ref, unref } from 'vue';
  import FramePage from '#/views/components/iframe/index.vue';
  import { useRouter } from 'vue-router';
  import { useMultipleTabStore } from '@/store/modules/multipleTab';
  import { getByModelId } from '#/api/flowable/bpmn/modelInfo';

  const { currentRoute } = useRouter();
  const {
    query: { modelId },
  } = unref(currentRoute);
  const url = ref<string>('');
  const processModelId = ref<string>('');
  const tabStore = useMultipleTabStore();
  const router = useRouter();
  const currentTab = tabStore.getTabList.find(
    // 以下函数只比对了path，你应该适当修改一下，加上路由参数比对
    (item) => {
      return item.fullPath === router.currentRoute.value.fullPath;
    },
  )!;

  onMounted(() => {
    // 性能优化-如果有拼接名称则不再查询
    if (currentTab.meta.title.indexOf('设计流程-') === 0) {
      return;
    }

    processModelId.value = modelId;

    getByModelId(modelId)
      .then((res) => {
        if (currentTab.meta.title && currentTab.meta.title.indexOf('-' + res.name) === -1) {
          currentTab.meta.title = currentTab.meta.title + '-' + res.name;
        }
      })
      .catch(() => {
        console.error('通过ModelId查询modelInfo失败！');
      });
  });
  const isDev = import.meta.env.DEV;
  // history路由
  // url.value = isDev ? ('http://localhost:8100/flow-bpmn/bpmn/designer?modelId=' + modelId)
  // : ('/flow-bpmn/bpmn/designer?modelId=' + modelId);

  // hash路由
  // url.value = '/flow-bpmn/index.html/#/bpmn/designer?modelId=' + modelId;
  url.value = isDev
    ? 'http://localhost:8100/flow-bpmn/index.html#/bpmn/designer?modelId=' + modelId
    : '/flow-bpmn/index.html#/bpmn/designer?modelId=' + modelId;
</script>
