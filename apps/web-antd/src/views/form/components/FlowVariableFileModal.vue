<script setup lang="ts">
import {useVbenModal} from '@vben/common-ui';
import {useVbenForm} from '#/adapter/form';
import {Button, Upload, message} from 'ant-design-vue';
import {UploadOutlined} from '@ant-design/icons-vue';
import {defineEmits, ref, shallowRef} from 'vue';
import {uploadVariableFileFormSchema} from '#/views/form/components/modelInfo.data';
import {uploadVariableTemplate} from '#/api/flowable/bpmn/modelInfo';

defineOptions({name: 'FlowVariableFileModal'});

const emit = defineEmits(['success', 'register']);

const fileList = shallowRef<any>([]);
const modalVisible = ref(false);

const [BasicForm, formApi] = useVbenForm({
  commonConfig: {
    componentProps: {
      // class: 'w-full',
    },
  },
  showDefaultActions: false,
  layout: 'horizontal',
  schema: uploadVariableFileFormSchema,
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
      fileList.value = [];
    }
  },
  onConfirm() {
    // await formApi.submitForm();
    // handleSubmit();
    handleUpload();
  },
});

const handleRemove = (file) => {
  const index = fileList.value!.indexOf(file);
  const newFileList = fileList.value!.slice();
  newFileList.splice(index, 1);
  fileList.value = newFileList;
};

const beforeUpload = (file) => {
  fileList.value = [file];
  return false;
};

const handleUpload = async () => {
  try {
    if (!fileList.value || !fileList.value.length) {
      return;
    }

    await formApi.validate();

    const {success, msg, data} = await uploadVariableTemplate({
      file: fileList.value[0],
    });

    if (success) {
      message.success(msg);
      modalVisible.value = false;
      emit('success', data);
      modalApi.close();
    } else {
      message.error(msg);
    }
  } catch (e) {
    console.error(e);
  } finally {
    modalApi.setState({loading: false, confirmLoading: false});
  }
};

defineExpose(modalApi);
</script>

<template>
  <BasicModal title="上传变量配置">
    <BasicForm >
      <template #filePath="slotProps">
        <Upload
            accept=".xlsx"
            :max-count="1"
            :file-list="fileList"
            :before-upload="beforeUpload"
            @remove="handleRemove"
        >
          <Button size="small" type="primary">
            选择文件
            <UploadOutlined/>
          </Button>
        </Upload>
      </template>
    </BasicForm>
  </BasicModal>
</template>
