<template>
  <BasicModal v-bind="$attrs" @register="registerModal">
    <Descriptions @register="registerDescription" class="operation-desc"/>
  </BasicModal>
</template>
<script lang="ts" setup>
import {ref, computed, unref, defineEmits, defineExpose} from 'vue';
import {descriptionSchema} from './sysOperRecord.data';
import {useVbenModal} from '@vben/common-ui';

// import { Description, useDescription } from '@/components/Description/index';
import {message, Descriptions} from 'ant-design-vue';

const [BasicModal, modalApi] = useVbenModal({
  draggable: true,
  onCancel() {
    modalApi.close();
  },
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      const values = modalApi.getData<Record<string, any>>();
      if (values) {
        // formApi.setValues(values);
        modalApi.setState({loading: false, confirmLoading: false});
      }
    }
  },
  onConfirm() {
    // handleSubmit();
  },
});

/*export default defineComponent({
  name: 'LoginLogModal',
  components: { BasicModal, Description },
  emits: ['success', 'register'],
  setup(_, { emit }) {
    const [registerDescription, { setDescProps }] = useDescription({
      title: '',
      column: 1,
      schema: descriptionSchema,
    });

    const [registerModal] = useModalInner(async (data) => {
      setDescProps({
        data: data.record,
      });
    });

    return { registerDescription, registerModal };
  },
});*/
defineExpose(modalApi);
</script>
