<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref, defineEmits, defineExpose } from 'vue';
  // import { BasicModal, useModalInner } from '@/components/Modal';
  // import { BasicForm, useForm } from '@/components/Form/index';
  import {useVbenModal} from '@vben/common-ui';
  import {message} from 'ant-design-vue';
  import {useVbenForm} from '#/adapter/form';


  import { pValueFormSchema } from './module.data';
  import { savePValue } from '#/api/privilege/module';
  import { getAppPrivilegeValues } from '#/api/privilege/appPrivilegeValue';

  const emit = defineEmits(['success', 'register']);

  const isUpdate = ref(true);
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
          baseFormApi.setValues(values);
          let options = (await getAppPrivilegeValues()) || [];
          // let checkedOptions = await getPValuesByModule()||[];

          options.forEach((item: any) => {
            item['value'] = item.position;
            item['label'] = item.name;
          });

          const value = values.pvs.map((res: any) => res.position);
          baseFormApi.updateSchema({
            fieldName: 'pvs',
            component: 'CheckboxGroup',
            componentProps: {
              options,
            },
          });
          baseFormApi.setValues({
            pvs: value,
          });

          // baseFormApi.setValues(values);
          modalApi.setState({loading: false, confirmLoading: false});
        }
      }
    },
    onConfirm() {
      // await baseFormApi.submitForm();
      handleSubmit();
    },
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增' : '设置权限值'));

  async function handleSubmit() {
    try {
      modalApi.setState({loading: true, confirmLoading: true});
      const {valid} = await baseFormApi.validate();
      if(!valid){
        return;
      }
      const values = await baseFormApi.getValues();
      values.pvs = values.pvs.map((item: any) => {
        return { position: item };
      });
      const {success, msg} = await savePValue(values);
      if(success){
        emit('success');
        message.success(msg);
        modalApi.close();
      }else {
        message.error(msg);
      }
    } finally {
      modalApi.setState({loading: false, confirmLoading: false});
    }
  }

  defineExpose(modalApi)
</script>
