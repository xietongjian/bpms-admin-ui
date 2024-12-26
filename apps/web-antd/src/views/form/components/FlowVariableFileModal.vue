<script setup lang="ts">
  import {useVbenModal} from '@vben/common-ui';
  import {useVbenForm} from '#/adapter/form';
  import { Button, Upload } from 'ant-design-vue';
  import { UploadOutlined } from '@ant-design/icons-vue';
  import { defineEmits, ref, shallowRef } from 'vue';
  // import { useMessage } from '@/hooks/web/useMessage';
  import { uploadVariableFileFormSchema } from '#/views/form/components/modelInfo.data';
  // import { ResultEnum } from '#/enums/httpEnum';
  import { uploadVariableTemplate } from '#/api/flowable/bpmn/modelInfo';

  defineOptions({ name: 'FlowVariableFileModal' });

  const emit = defineEmits(['success', 'register']);

  // const { message } = useMessage();

  const fileList = shallowRef<UploadProps['fileList']>([]);
  const modalVisible = ref(false);

  const [registerForm, { validate }] = useForm({
    labelWidth: 100,
    schemas: uploadVariableFileFormSchema,
    showActionButtonGroup: false,
    actionColOptions: { span: 24 },
  });

  const [registerModal, { setModalProps, closeModal, changeLoading }] = useModalInner(() => {
    fileList.value = [];
    setModalProps({ confirmLoading: false });
    changeLoading(false);
  });

  const handleRemove: UploadProps['onRemove'] = (file) => {
    const index = fileList.value!.indexOf(file);
    const newFileList = fileList.value!.slice();
    newFileList.splice(index, 1);
    fileList.value = newFileList;
  };

  const beforeUpload: UploadProps['beforeUpload'] = (file) => {
    fileList.value = [file];
    return false;
  };

  const handleUpload = async () => {
    try {
      if (!fileList.value || !fileList.value.length) {
        return;
      }

      await validate();

      const { data } = await uploadVariableTemplate({
        file: fileList.value[0],
      });

      if (data.code === ResultEnum.SUCCESS) {
        message.success(data.msg);
        modalVisible.value = false;
        emit('success', data.data);
        closeModal();
      } else {
        message.error(data.msg);
      }
    } catch (e) {
      console.error(e);
    } finally {
      changeLoading(false);
      setModalProps({ confirmLoading: false });
    }
  };
</script>

<template>
  <BasicModal v-bind="$attrs" @register="registerModal" title="上传变量配置" @ok="handleUpload">
    <BasicForm @register="registerForm">
      <template #UploadFile>
        <Upload
          accept=".xlsx"
          :max-count="1"
          :file-list="fileList"
          :before-upload="beforeUpload"
          @remove="handleRemove"
        >
          <Button size="small" type="primary">
            选择文件
            <UploadOutlined />
          </Button>
        </Upload>
      </template>
    </BasicForm>
  </BasicModal>
</template>
