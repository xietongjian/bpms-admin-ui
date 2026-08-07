<script lang="ts" setup>
import { defineExpose } from 'vue';
import { useVbenModal } from '@vben/common-ui';
import { Descriptions } from 'ant-design-vue';
import { errorLogSchema /*, renderPopoverCell */ } from './serviceErrorLog.data';
import { JsonPreview } from '#/components/CodeEditor';

const [BasicModal, modalApi] = useVbenModal({
  onCancel() {
    modalApi.close();
  },
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      modalApi.setState({ loading: false });
    }
  },
  showCancelButton: false,
  showConfirmButton: false,
  title: '查看详情',
});

defineExpose(modalApi);
</script>

<template>
  <BasicModal class="w-[900px]">
    <Descriptions
      v-if="modalApi.getData()"
      size="middle"
      :bordered="true"
      :column="1"
    >
      <Descriptions.Item
        v-for="item in errorLogSchema"
        :key="item.key"
        :label="item.label"
        :label-style="{ minWidth: '100px' }"
      >
        <template v-if="(item.key === 'requestInfo' || item.key === 'errorInfo') && modalApi.getData()?.[item.key + 'Json']">
          <JsonPreview :data="modalApi.getData()?.[item.key + 'Json']" />
        </template>
        <template v-else>
          {{ modalApi.getData()?.[item.key] }}
        </template>
      </Descriptions.Item>
    </Descriptions>
  </BasicModal>
</template>
