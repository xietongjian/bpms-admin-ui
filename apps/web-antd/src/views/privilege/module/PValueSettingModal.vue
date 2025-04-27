<template>
  <BasicModal class="w-[800px]">
    <BasicForm/>
  </BasicModal>
</template>
<script lang="ts" setup>
import {ref, defineEmits, defineExpose} from 'vue';
import {useVbenModal} from '@vben/common-ui';
import {message} from 'ant-design-vue';
import {useVbenForm} from '#/adapter/form';
import {pValueFormSchema} from './module.data';
import {savePValue} from '#/api/privilege/module';
import {getAppPrivilegeValues} from '#/api/privilege/appPrivilegeValue';

const emit = defineEmits(['success', 'register']);
const allPrivilegeValues = ref([]);
const [BasicForm, baseFormApi] = useVbenForm({
  // 所有表单项共用，可单独在表单内覆盖
  commonConfig: {
    // 所有表单项
    componentProps: {
      // class: 'w-full',
    },
  },
  showDefaultActions: false,
  layout: 'horizontal',
  schema: pValueFormSchema,
  wrapperClass: 'grid-cols-1',
});

const [BasicModal, modalApi] = useVbenModal({
  draggable: true,
  onCancel() {
    modalApi.close();
  },
  async onOpenChange(isOpen: boolean) {
    if (isOpen) {
      const values = modalApi.getData<Record<string, any>>();
      modalApi.setState({
        title: '设置菜单【' + values.name + '】的权限值'
      });
      if (values) {
        const formData = JSON.parse(JSON.stringify(values));
        let options = (await getAppPrivilegeValues()) || [];
        options.forEach((item: any) => {
          item['value'] = item.position;
          item['label'] = item.name;
        });
        allPrivilegeValues.value = options;

        baseFormApi.updateSchema([
          {
            fieldName: 'pvs',
            component: 'CheckboxGroup',
            componentProps: {
              options,
            },
          }
        ]);
        formData.pvs = formData.pvs.map((res: any) => res.position);

        await baseFormApi.setValues(formData);
        modalApi.setState({loading: false, confirmLoading: false});
      }
    }
  },
  onConfirm() {
    handleSubmit();
  },
});

async function handleSubmit() {
  try {
    modalApi.setState({loading: true, confirmLoading: true});
    const {valid} = await baseFormApi.validate();
    if (!valid) {
      return;
    }
    const values = await baseFormApi.getValues();

    const result = allPrivilegeValues.value.filter(item => {
      return values.pvs.includes(item.position);
    });

    values.pvs = values.pvs.map((item: any) => {
      return {position: item};
    });
    const {success, msg} = await savePValue(values);
    if (success) {
      message.success(msg);
      await modalApi.close();
      emit('success', result);
    } else {
      message.error(msg);
    }
  } catch (e) {
    console.error(e);
  } finally {
    modalApi.setState({loading: false, confirmLoading: false});
  }
}

defineExpose(modalApi)
</script>
