<template>
  <BasicModal class="w-3/5">
    <BasicForm >
      <template #style>
        <div class="my-2 ml-1 w-full">
          <div class="flex gap-2">
            <span @click="()=>{selectedStyle = item}"
                  v-for="item in colorList"
                  class="text-center cursor-pointer size-[26px] outline outline-red-600 outline-transparent outline-4"
                  :class="{'!outline-red-600': item === selectedStyle}"
                  :style="{background: item}" :title="item">
              <StopOutlined title="默认" class="text-center text-[26px] text-gray-500" v-if="item===''" />
            </span>
          </div>
        </div>
      </template>
    </BasicForm>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, defineExpose, defineEmits } from 'vue';
  import { formSchema } from './noticeCategory.data';
  import { insert, update } from '#/api/portal/cms/noticeCategory';
  import { StopOutlined } from '@ant-design/icons-vue';
  import {useVbenModal} from '@vben/common-ui';
  import {useVbenForm} from '#/adapter/form';
  import {message} from 'ant-design-vue';

  const colorList = [
    '',
    '#c21401',
    '#ff1e02',
    '#ffc12a',
    '#ffff3a',
    '#90cf5b',
    '#00af57',
    '#00afee',
    '#0071be',
    '#00215f',
    '#72349d',
  ];

  const selectedStyle = ref('');

  const emit = defineEmits(['success'])

  const [BasicForm, formApi] = useVbenForm({
    commonConfig: {
      componentProps: {
        // class: 'w-full',
      },
    },
    showDefaultActions: false,
    layout: 'horizontal',
    schema: formSchema,
    wrapperClass: 'grid-cols-3',
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
          const signerSelector = values.signerNo ? [{value: values.signerNo, label: values.signerName}]: [];
          const formData = {...values, signerSelector};
          formApi.setValues(formData);
          selectedStyle.value = formData.style || '';
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
      const {valid} = await formApi.validate();
      if(!valid){
        return;
      }
      const values = await formApi.getValues();

      if (values.haveSigner) {
        if (values.refSubjectSigner) {
          values.signerNo = '';
          values.signerName = '';
        } else {
          if (values.signerSelector) {
            values.signerNo = values.signerSelector[0].code;
            values.signerName = values.signerSelector[0].name;
          }
        }
      } else {
        values.signerNo = '';
        values.signerName = '';
      }
      delete values.signerSelector;
      values.style = selectedStyle.value;
      modalApi.setState({loading: true, confirmLoading: true});
      let res = null;
      if (values.id) {
        res = await update(values);
      } else {
        res = await insert(values);
      }
      const {success, msg} = res;
      if(success){
        message.success(msg);
        await modalApi.close();
        emit('success');
      }
    } catch (e){
      console.error(e);
    } finally {
      modalApi.setState({loading: false, confirmLoading: false});
    }
  }

  defineExpose(modalApi);
</script>
