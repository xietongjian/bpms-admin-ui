<template>
  <BasicModal class="w-[850px]">
    <Descriptions bordered :column="1" size="small" class="operation-desc">
      <DescriptionsItem
        v-for="item in descriptionSchema"
        :key="item.field"
        :label="item.label"
        :span="item.span || 1"
        :labelStyle="{'min-width': item.labelMinWidth ? item.labelMinWidth + 'px' : undefined}"
      >
        <CodeEditor
          v-if="item.field === 'operContent' && currentRecord"
          style="max-height: 500px; overflow: auto;"
          :value="currentRecord[item.field]"
          readonly
          mode="application/json"
          auto-format
        />
        <span v-else-if="item.field === 'userName' && currentRecord">
          {{ currentRecord.userName }} - [{{ currentRecord.userCode }}]
        </span>
        <span v-else-if="currentRecord">{{ currentRecord[item.field] }}</span>
      </DescriptionsItem>
    </Descriptions>
  </BasicModal>
</template>
<script lang="ts" setup>
import {ref, defineEmits, defineExpose} from 'vue';
import {descriptionSchema} from './sysOperRecord.data';
import {useVbenModal} from '@vben/common-ui';
import {Descriptions} from 'ant-design-vue';
import {CodeEditor} from '#/components/CodeEditor';

const emit = defineEmits(['success', 'register']);
const currentRecord = ref<Record<string, any>>();

const [BasicModal, modalApi] = useVbenModal({
  draggable: true,
  onCancel() {
    modalApi.close();
  },
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      currentRecord.value = modalApi.getData<Record<string, any>>();
      modalApi.setState({loading: false, confirmLoading: false});
    }
  },
});

defineExpose(modalApi);
</script>
