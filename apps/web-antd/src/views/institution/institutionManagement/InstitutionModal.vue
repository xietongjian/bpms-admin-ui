<script setup lang="ts">
import {useVbenForm} from '#/adapter/form';
import {useVbenModal} from '@vben/common-ui';
  import { computed, defineEmits, ref, defineExpose, shallowRef } from 'vue';
  import { saveOrUpdateInstitution, uploadInstitutionFile } from '#/api/institution/institution';
  import { InstitutionModalForm } from '#/views/institution/institutionManagement/schema.data';
  import { UploadOutlined } from '@ant-design/icons-vue';
  import { Button, Upload, message } from 'ant-design-vue';
  import type {UploadProps} from 'ant-design-vue';
  // import { ResultEnum } from '@/enums/httpEnum';
  // import { useMessage } from '@/hooks/web/useMessage';

  defineOptions({ name: 'InstitutionModal' });

  const emit = defineEmits(['success']);

  // const { createMessage } = useMessage();
  const isUpdate = ref(true);
  const getTitle = computed(() => (!isUpdate.value ? '新增' : '编辑'));


const [BasicForm, formApi] = useVbenForm({
  commonConfig: {
    labelWidth: 100,
  },
  schema: InstitutionModalForm,
  showDefaultActions: false,
});

/*  const [registerModal, { setModalProps, closeModal, changeLoading }] = useModalInner(
    async (data) => {
      changeLoading(true);
      await resetFields();
      fileList.value = [];
      setModalProps({ confirmLoading: false });
      isUpdate.value = !!data?.isUpdate;
      let formData = data.record;
      await setFieldsValue({ ...formData });
      changeLoading(false);
    },
  );*/

const [BasicModal, modalApi] = useVbenModal({
  draggable: true,
  onCancel() {
    modalApi.close();
  },
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      const values = modalApi.getData<Record<string, any>>();
      fileList.value = [];
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

  const fileList = shallowRef<UploadProps['fileList']>([]);
  const uploading = ref<boolean>(false);

  const handleRemove: UploadProps['onRemove'] = (file) => {
    const index = fileList.value.indexOf(file);
    const newFileList = fileList.value.slice();
    newFileList.splice(index, 1);
    fileList.value = newFileList;
  };

  const beforeUpload: UploadProps['beforeUpload'] = (file) => {
    fileList.value = [file];
  };
  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', fileList.value[0]);
      uploading.value = true;

      const { success, msg, data } = await uploadInstitutionFile({
        file: fileList.value[0],
      });

      if (success) {
        message.success(msg);
        await formApi.setValues({ filePath: JSON.stringify(data) });
      } else {
        message.error(msg);
      }
    } catch (e) {
      console.error(e);
    } finally {
      uploading.value = false;
    }
  };

  async function handleSubmit() {
    try {
      modalApi.setState({loading: true, confirmLoading: true});

      const {valid} = await formApi.validate();
      if(!valid){
        return;
      }

      const values = await formApi.getValues();

      const formData = { ...values };
      if (values.positionRangeData) {
        formData.positionRange = JSON.stringify(values.positionRangeData);
        delete formData.positionRangeData;
      }
      if (values.deptRangeData) {
        formData.deptRange = JSON.stringify(values.deptRangeData);
        delete formData.deptRangeData;
      }

      await saveOrUpdateInstitution(formData);
      modalApi.close();
      emit('success');
    } finally {
      modalApi.setState({loading: false, confirmLoading: false});
    }
  }
defineExpose(modalApi);
</script>

<template>
  <BasicModal v-bind="$attrs" :title="getTitle" @ok="handleSubmit">
    <BasicForm class="InstitutionModal">
      <template #UploadFile>
        <Upload
          accept=".xlsx"
          :max-count="1"
          :file-list="fileList"
          :before-upload="beforeUpload"
          :custom-request="handleUpload"
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
