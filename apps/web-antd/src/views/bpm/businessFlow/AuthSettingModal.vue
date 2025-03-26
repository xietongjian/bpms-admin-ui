<template>
  <BasicModal v-bind="$attrs" @ok="handleSubmit">
    <BasicForm />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { defineExpose, defineEmits, unref } from 'vue';
  import {useVbenForm} from '#/adapter/form';
  import { authSettingFormSchema } from './businessFlowApply.data';
  import { saveOrUpdate, getFlowAuthorizeByBusinessFlowId } from '#/api/bpm/flowAuthorize';
  import {message, Modal} from 'ant-design-vue';
  import {useVbenModal} from '@vben/common-ui';

  const emit = defineEmits(['success']);
  // const { createMessage, createConfirm } = useMessage();

  const [BasicForm, formApi] = useVbenForm({
    commonConfig: {
      labelWidth: 100,
    },
    schema: authSettingFormSchema,
    showDefaultActions: false,
  });

  const [BasicModal, modalApi] = useVbenModal({
    fullscreenButton: false,
    onCancel() {
      modalApi.close();
    },
    onConfirm() {
      // await baseFormApi.submitForm();
      handleSubmit();
    },
    onOpenChange: async (isOpen) => {
      if (!isOpen) {
        return null;
      }
      modalApi.setState({loading: true, confirmLoading: true});
      const formData = modalApi.getData();
      formData.businessFlowId = formData.id;
      const flowAuthorizes = await getFlowAuthorizeByBusinessFlowId({
        businessFlowId: formData.businessFlowId,
      });

      if (flowAuthorizes) {
        const hasAll = flowAuthorizes.filter((item) => item.type === 'all');
        // 如果有此项说明是设置了全员可见
        if (hasAll && hasAll.length > 0) {
          formData.authType = '1';
        } else {
          formData.authType = '0';
          const roles = [],
              positionInfos = [],
              personals = [];
          // 根据授权类型进行分组
          flowAuthorizes.forEach((item) => {
            // type: positionInfo岗位 role角色 personal人员
            switch (item.type) {
              case 'role':
                roles.push({ id: item.mainId, name: item.mainName });
                break;
              case 'positionInfo':
                positionInfos.push({ id: item.mainId, name: item.mainName });
                break;
              case 'personal':
                personals.push({ code: item.mainId, name: item.mainName });
                break;
            }
            formData.rolesRange = roles;
            formData.positionInfos = positionInfos;
            formData.personals = personals;
          });
        }
      }

      await formApi.setValues(formData);
      modalApi.setState({loading: false, confirmLoading: false});
    },
  });

  async function handleSubmit() {
    try {
      const {valid} = await formApi.validate();
      if(!valid){
        return;
      }
      const values = await formApi.getValues();
      values.flowAuthorizes = [];
      modalApi.setState({loading: true, confirmLoading: true});

      if (values.authType === '1') {
        values.flowAuthorizes.push({
          businessFlowId: values.businessFlowId,
          type: 'all',
          mainId: '',
          mainName: '',
        });
      } else {
        if (values.personals && values.personals.length > 0) {
          values.personals.forEach((item) => {
            values.flowAuthorizes.push({
              businessFlowId: values.businessFlowId,
              type: 'personal',
              mainId: item.code,
              mainName: item.name,
            });
          });
        }
        if (values.positionInfos && values.positionInfos.length > 0) {
          values.positionInfos.forEach((item) => {
            values.flowAuthorizes.push({
              businessFlowId: values.businessFlowId,
              type: 'positionInfo',
              mainId: item.id,
              mainName: item.name,
            });
          });
        }
        if (values.rolesRange && values.rolesRange.length > 0) {
          values.rolesRange.forEach((item) => {
            values.flowAuthorizes.push({
              businessFlowId: values.businessFlowId,
              type: 'role',
              mainId: item.id,
              mainName: item.name,
            });
          });
        }
      }
      await saveOrUpdate({
        businessFlowId: values.businessFlowId,
        flowAuthorizes: values.flowAuthorizes,
      });
      // closeModal();
      modalApi.close();
      emit('success');
    } catch (e) {
      console.error(e);
    } finally {
      modalApi.setState({loading: false, confirmLoading: false});
    }
  }

  defineExpose(modalApi);
</script>
