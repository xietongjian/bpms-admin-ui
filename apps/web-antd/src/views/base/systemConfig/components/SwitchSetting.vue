<template>
  <div class="">
    <BasicForm class="bg-card p-4 mb-4" :schema="dynamicFormSchema"/>
  </div>
</template>
<script lang="ts" setup>
import {defineProps, defineEmits} from 'vue';
import {useVbenForm, z} from "#/adapter/form";
import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import {saveOrUpdate} from "#/api/base/systemConfig";
import {message} from "ant-design-vue";

const emit = defineEmits(['change'])

const props = defineProps({
  dataItem: {
    type: Array,
    default: () => [],
  },
})
const dynamicFormSchema: FormSchema[] = [
  {
    fieldName: 'id',
    label: 'ID',
    component: 'Input',
    defaultValue: props.dataItem.id,
    dependencies: {
      show: false,
      triggerFields: ['id']
    }
  },
  {
    fieldName: 'configValue',
    label: props.dataItem.configName,
    component: 'Switch',
    description: props.dataItem.remark,
    defaultValue: props.dataItem.configValue,
    wrapperClass: 'flex-col items-end',
    formItemClass: 'items-start',
    componentProps: {
      checkedValue: '1',
      unCheckedValue: '0',
    }
  }
];


const PerPrefix = 'SystemConfig:';


const [BasicForm, formApi] = useVbenForm({
  commonConfig: {
    componentProps: {
      // class: 'w-full',
    },
    hideRequiredMark: true,
    labelClass: 'justify-start text-md !font-bold'
  },
  showDefaultActions: false,
  wrapperClass: 'grid-cols-1 md:grid-cols-1 lg:grid-cols-1',
  layout: 'horizontal',
  handleValuesChange: (values, fieldsChanged) => {
    if(fieldsChanged.includes('configValue')){
      handleSubmit();
    }
  },
});

async function handleSubmit() {
  try {
    // modalApi.setState({loading: true, confirmLoading: true});
    const {valid} = await formApi.validate();
    if (!valid) {
      return;
    }
    const values = await formApi.getValues();
    const {success, msg} = await saveOrUpdate(values);
    if (success) {
      console.warn(props.dataItem)
      message.success(msg);
      debugger;
      emit('change', values);
    } else {
      message.error(msg);
    }
  } finally {
    // modalApi.setState({loading: false, confirmLoading: false});
  }
}
</script>
<style lang="scss" scoped>
</style>
