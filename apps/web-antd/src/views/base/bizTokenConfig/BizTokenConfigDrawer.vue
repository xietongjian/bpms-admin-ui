<template>
  <BasicDrawer class="w-[800px]" title="接口编辑">
    <BasicForm>
    </BasicForm>
  </BasicDrawer>
</template>
<script lang="ts" setup>
import {defineEmits, defineExpose} from 'vue';
import {useVbenDrawer} from '@vben/common-ui';
import {useVbenForm} from '#/adapter/form';
import { message} from "ant-design-vue";
import {formSchema} from './bizTokenConfig.data';
import {saveOrUpdate} from '#/api/base/bizTokenConfig';

const emit = defineEmits(['success']);

const [BasicDrawer, drawerApi] = useVbenDrawer({
  onCancel() {
    drawerApi.close();
  },
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      const values = drawerApi.getData<Record<string, any>>();
      if (values) {
        const params = JSON.stringify(JSON.parse(values.params), null, 2)
        formApi.setValues({...values, params, requestArr: [values.method || '', values.url || '']});
        drawerApi.setState({loading: false, confirmLoading: false});
      }
    }
  },
  onConfirm() {
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
  schema: formSchema,
  wrapperClass: 'grid-cols-1',
});

async function handleSubmit() {
  try {
    drawerApi.setState({loading: true, confirmLoading: true});
    const {valid} = await formApi.validate();
    if (!valid) {
      return;
    }
    const values = await formApi.getValues();
    values.params = values.params || '{}';
    const [method, url] = values.requestArr;
    values.method = method;
    values.url = url;
    delete values.requestArr;
    const {success, msg} = await saveOrUpdate(values);
    if (success) {
      message.success(msg);
      drawerApi.close();
      emit('success');
    } else {
      message.error(msg);
    }
  } catch (e) {
    console.error(e);
  } finally {
    drawerApi.setState({loading: false, confirmLoading: false});
  }
}

defineExpose(drawerApi);
</script>
