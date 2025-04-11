<template>
  <BasicDrawer
      class="w-[1000px]"
      title="接口编辑"
      showFooter
      @ok="handleSubmit"
  >
    <BasicForm>

    </BasicForm>
  </BasicDrawer>
</template>
<script lang="ts" setup>
import {computed, defineEmits, ref, unref, defineExpose} from 'vue';
import {useVbenDrawer, useVbenModal} from '@vben/common-ui';
import {useVbenForm} from '#/adapter/form';
import {FormItem, FormItemRest, message, Input, Select} from "ant-design-vue";

import {formSchema} from './bizTokenConfig.data';
import {saveOrUpdate} from '#/api/base/bizTokenConfig';


const emit = defineEmits(['success', 'register']);
/*

  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 100,
    schemas: formSchema,
    showActionButtonGroup: false,
  });

  const [registerModal, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    await resetFields();
    setDrawerProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;
    let formData = data.record;

    await setFieldsValue({
      ...formData,
    });
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增' : '修改'));
*/

const [BasicDrawer, drawerApi] = useVbenDrawer({
  onCancel() {
    drawerApi.close();
  },
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      const values = drawerApi.getData<Record<string, any>>();
      if (values) {
        formApi.setValues({...values, requestArr: [values.method || '', values.url || '']});
        drawerApi.setState({loading: false, confirmLoading: false});
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
      drawerApi.close();
      emit('success');
      message.success(msg);
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
