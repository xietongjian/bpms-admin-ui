<template>
  <BasicModal v-bind="$attrs" :title="getTitle" @ok="handleSubmit">
    <BasicForm/>
  </BasicModal>
</template>
<script lang="ts" setup>
import {ref, computed, unref, defineEmits, defineExpose} from 'vue';
import {useVbenForm} from "#/adapter/form";
import {useVbenModal} from '@vben/common-ui';
import {pValueFormSchema} from './module.data';
import {savePValue} from '#/api/privilege/module';
import {getAppPrivilegeValues} from '#/api/privilege/appPrivilegeValue';

const emit = defineEmits(['success']);

const isUpdate = ref(true);

const [BasicModal, modalApi] = useVbenModal({
  draggable: true,
  onCancel() {
    modalApi.close();
  },
  async onOpenChange(isOpen: boolean) {
    if (isOpen) {
      formApi.resetForm();
      const formData = modalApi.getData<Record<string, any>>();

      modalApi.setState({loading: true, confirmLoading: true});
      modalApi.setState({
        title: '设置菜单【' + formData.name + '】的权限值'
      })

      if (unref(isUpdate)) {
        formApi.setValues(formData);
        let options = (await getAppPrivilegeValues()) || [];
        // let checkedOptions = await getPValuesByModule()||[];

        options.forEach((item: any) => {
          item['value'] = item.position;
          item['label'] = item.name;
        });
        const value = formData.pvs.map((res: any) => res.position);
        formApi.updateSchema({
          fieldName: 'pvs',
          componentProps: {
            options,
          },
        });
        formApi.setValues({
          pvs: value,
        });
      }
      modalApi.setState({loading: false, confirmLoading: false});
    }
  },
  onConfirm() {
    // await baseFormApi.submitForm();
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
  schema: pValueFormSchema,
  wrapperClass: 'grid-cols-1',
});


const getTitle = computed(() => (!unref(isUpdate) ? '新增' : '设置权限值'));

async function handleSubmit() {
  try {
    modalApi.setState({loading: true, confirmLoading: true});

    const {valid} = await formApi.validate();
    if (!valid) {
      return;
    }
    const values = await formApi.getValues();
    values.pvs = values.pvs.map((item: any) => {
      return {position: item};
    });
    await savePValue(values);
    modalApi.close();
    emit('success');
  } finally {
    modalApi.setState({loading: false, confirmLoading: false});
  }
}

defineExpose(modalApi);
</script>
