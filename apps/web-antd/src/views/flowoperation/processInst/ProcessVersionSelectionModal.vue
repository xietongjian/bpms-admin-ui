<script setup lang="ts">
import { defineEmits, ref, defineExpose } from 'vue';
import {useVbenModal} from '@vben/common-ui';

import {useVbenForm} from '#/adapter/form';
  import { processVersionSelectionFormSchema } from '#/views/flowoperation/processInst/processInst.data';
  import {
    changeProcessInstanceVersion,
    getProcessInstanceVersions,
  } from '#/api/flowoperation/processInst';
  import { Input, message, Button, Popconfirm, Empty, FormItemRest } from 'ant-design-vue';
  // import { PopConfirmButton } from '@/components/Button';

  defineOptions({ name: 'ProcessVersionSelectionModal' });

  const emit = defineEmits(['success', 'register']);

  const processInstanceId = ref('');
  const paramsList = ref<{ key: string; value: string }[]>([]);

/*  const [registerForm, { setFieldsValue, resetFields, updateSchema, validate }] = useForm({
    labelWidth: 100,
    schemas: processVersionSelectionFormSchema,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 23,
    },
  });*/


const [BasicForm, formApi] = useVbenForm({
  commonConfig: {
    componentProps: {
      // class: 'w-full',
    },
  },
  showDefaultActions: false,
  layout: 'horizontal',
  schema: processVersionSelectionFormSchema,
  wrapperClass: 'grid-cols-1',
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

  /*const [registerModal, { setModalProps, closeModal, changeLoading }] = useModalInner(
    async (data) => {
      setModalProps({ confirmLoading: false, title: '版本切换' });
      changeLoading(true);
      await resetFields();

      const { record } = data;

      processInstanceId.value = record.processInstanceId;
      const versions = await getProcessInstanceVersions(record.processInstanceId);
      // 目前返回的版本数组是纯数字数组
      const sorted = versions.sort((a, b) => a - b);

      paramsList.value = [];

      await updateSchema([
        {
          field: 'version',
          componentProps: {
            options: sorted.map((i) => ({ label: `v ${i}`, value: i })),
          },
        },
      ]);
      changeLoading(false);
    },
  );*/

  function handleAppendParam() {
    paramsList.value.push({ key: '', value: '' });
    // updateFormField();
  }
  function handleRemoveParam(idx: number) {
    paramsList.value.splice(idx, 1);
    updateFormField();
  }
  function updateFormField() {
    // setFieldsValue({ params: paramsList.value });
    formApi.setValues({ params: paramsList.value })
  }

  async function handleSubmit() {
    try {
      modalApi.setState({loading: true, confirmLoading: true});
      const {valid} = await formApi.validate();
      if(!valid){
        return;
      }
      const values = await formApi.getValues();

      const version = values['version'];
      const params = paramsList.value.reduce((obj, cur) => {
        obj[cur.key] = cur.value;
        return obj;
      }, {});

      await changeProcessInstanceVersion(processInstanceId.value, version, params);
      modalApi.close();
      emit('success');
    } catch (e) {
      console.error(e);
    } finally {
      modalApi.setState({loading: false, confirmLoading: false});

    }
  }
  defineExpose(modalApi)
</script>

<template>
  <BasicModal v-bind="$attrs" @ok="handleSubmit">
    <BasicForm >
      <template #paramsList>
        <FormItemRest>
          <div class="params-grid-table" style="--column-num: 3">
            <div class="params-grid-item params-grid-header">Key</div>
            <div class="params-grid-item params-grid-header">Value</div>
            <div class="params-grid-item params-grid-header">操作</div>
            <template v-for="(p, idx) in paramsList" :key="idx">
              <div class="params-grid-item">
                <Input v-model:value="p.key" @input="updateFormField" />
              </div>
              <div class="params-grid-item">
                <Input v-model:value="p.value" @input="updateFormField" />
              </div>
              <div class="params-grid-item">
                <Popconfirm
                  type="text"
                  title="确定要删除这个参数吗？"
                  @confirm="handleRemoveParam(idx)"
                >
                  移除
                </Popconfirm>
              </div>
            </template>

            <div class="params-grid-empty" v-show="!paramsList.length">
              <Empty description="暂无参数" />
            </div>
            <div class="params-grid-footer">
              <Button type="primary" block @click="handleAppendParam">添加参数</Button>
            </div>
          </div>
        </FormItemRest>
      </template>
    </BasicForm>
  </BasicModal>
</template>
