<script lang="ts" setup>
  // import { PerEnum } from '@/enums/perEnum';
  // import { Authority } from '@/components/Authority';
  // import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { getAppListByPage, deleteByIds } from '#/api/base/app';
  // import { columns, searchFormSchema } from './app.data';
  // import AppModal from './AppModal.vue';
  // import SecretKeyModal from './SecretKeyModal.vue';
  // import { useModal } from '@/components/Modal';

  import { Page, useVbenModal } from '@vben/common-ui';

  import { Button, Card } from 'ant-design-vue';

  import DragDemo from './app-form.vue';

  const [AppModal, dragModalApi] = useVbenModal({
    connectedComponent: DragDemo,
    centered: true,
  });

  function openDragModal() {
    dragModalApi.open();
    dragModalApi.setState({
      title: 'EEEEEEEEEE'
    });
  }
</script>

<template>
  <Page
    description=""
    title=""
  >
    <template #extra>
      aaa
    </template>

    <AppModal />

    <Card class="mb-4" title="可拖拽示例">
      <p class="mb-3">配置 draggable 可开启拖拽功能</p>
      <Button type="primary" @click="openDragModal">打开弹窗</Button>
    </Card>

  </Page>
</template>