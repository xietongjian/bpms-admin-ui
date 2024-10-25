<script lang="ts" setup>
import {useVbenModal, z} from '@vben/common-ui';
import {message} from 'ant-design-vue';
import dayjs from 'dayjs';
import {formSchema} from './app.data';
import {useVbenForm} from '#/adapter/form';
import {saveOrUpdate, checkEntityExist} from '#/api/base/app';
import {FormValidPatternEnum} from "#/enums/commonEnum";

const [Modal, modalApi] = useVbenModal({
  draggable: true,
  onCancel() {
    modalApi.close();
  },
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      const values = modalApi.getData<Record<string, any>>();
      if (values) {
        baseFormApi.setValues(values);
        modalApi.setState({loading: false, confirmLoading: false});
      }
    }
  },
  onConfirm() {
    console.log('onconfirm....');
    // await baseFormApi.submitForm();
    handleSubmit();
  },
});

const [BaseForm, baseFormApi] = useVbenForm({
  // 所有表单项共用，可单独在表单内覆盖
  commonConfig: {
    // 所有表单项
    componentProps: {
      // class: 'w-full',
    },
  },
  showDefaultActions: false,
  // 提交函数
  // handleSubmit: onSubmit,
  // 垂直布局，label和input在不同行，值为vertical
  // 水平布局，label和input在同一行
  layout: 'horizontal',
  schema: formSchema,
  // 大屏一行显示3个，中屏一行显示2个，小屏一行显示1个
  wrapperClass: 'grid-cols-1',
});

baseFormApi.updateSchema([{
  fieldName: 'sn',
  rules: z
    .string()
    .regex(new RegExp(FormValidPatternEnum.SN), '请输入英文或数字')
    .refine(
      async () => {
        const values = await baseFormApi.getValues();
        // 假设这是一个异步函数，模拟检查用户名是否已存在
        let result = false;
        try {
          result = await checkEntityExist({
            id: values.id,
            field: 'sn',
            fieldValue: values.sn,
            fieldName: '系统标识',
          });
        } catch (e) {
          console.error(e);
        }
        return result;
      },
      {
        message: '系统标识已存在',
      },
    ),
}]);

async function handleSubmit() {
  modalApi.setState({loading: true, confirmLoading: true});
  const {valid} = await baseFormApi.validate();
  if (valid) {
    try {
      const values = await baseFormApi.getValues();
      const {msg, success} = await saveOrUpdate(values);
      if (success) {
        message.success(msg);
        modalApi.close();
      } else {
        message.error(msg);
      }
    } catch (e) {
      message.error(e);
    } finally {
      modalApi.setState({loading: false, confirmLoading: false});
    }
  }
  modalApi.setState({loading: false, confirmLoading: false});
}
</script>
<template>
  <Modal class="w-[600px]">
    <BaseForm/>
  </Modal>
</template>
