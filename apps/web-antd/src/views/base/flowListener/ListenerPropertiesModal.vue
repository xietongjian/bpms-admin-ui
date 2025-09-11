<script lang="ts" setup>
import {defineEmits, defineExpose} from 'vue';
import {useVbenModal} from '@vben/common-ui';
import {useVbenForm} from '#/adapter/form';
import {message} from 'ant-design-vue';

import {propertiesFormSchema} from './listener.data';
import {saveOrUpdateProperties} from '#/api/base/flowListener';

const emit = defineEmits(['success'])
let expressionTypes = [
  {label: '字符串', value: 'string'},
  {label: '表达式', value: 'expression'},
];
let expressionTypeMap = {};
expressionTypes.forEach((item) => {
  expressionTypeMap[item.value] = item.label;
});

const [BasicModal, modalApi] = useVbenModal({
  draggable: true,
  onCancel() {
    modalApi.close();
  },
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      const values = modalApi.getData<Record<string, any>>();
      if (values) {
        formApi.updateSchema([
          {
            fieldName: 'value',
            label: expressionTypeMap[values.type],
          },
          {
            fieldName: 'type',
            componentProps: {
              options: expressionTypes,
              onChange: (e) => {
                let v = typeof e == 'string' ? e : e.target.value;
                formApi.updateSchema([
                  {
                    fieldName: 'value',
                    label: expressionTypeMap[v],
                  }
                ]);
              },
            },
          }
        ]);
        formApi.setValues(values);
        modalApi.setState({loading: false, confirmLoading: false});
      }
    }
  },
  onConfirm() {
    // await formApi.submitForm();
    handleSubmit();
  },
});

const [BasicForm, formApi] = useVbenForm({
  commonConfig: {
    componentProps: {
      // class: 'w-full',
    },
  },
  showDefaultActions: false,
  layout: 'horizontal',
  schema: propertiesFormSchema,
  wrapperClass: 'grid-cols-1',
});

async function handleSubmit() {
  try {
    modalApi.setState({loading: true, confirmLoading: true});
    const {valid} = await formApi.validate();
    if (!valid) {
      return;
    }
    const values = await formApi.getValues();
    const {success, msg} = await saveOrUpdateProperties(values);
    if (success) {
      message.success(msg);
      await modalApi.close();
      emit('success');
    } else {
      message.error(msg);
    }
  } finally {
    modalApi.setState({loading: false, confirmLoading: false});
  }
}

defineExpose(modalApi);

</script>

<template>
  <BasicModal class="w-[600px]">
    <BasicForm/>
  </BasicModal>
</template>
