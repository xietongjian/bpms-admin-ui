<template>
  <BasicModal wrap-class-name="launch-container">
    <template #title>
      <Row class="flex items-center">
        <Col span="16">
          <Space>
            <span class="launch-header-title">
              {{ t('process.message.editDataTitle', { title: flowBaseInfo?.procInstName || flowBaseInfo?.name }) }}
            </span>
          </Space>
        </Col>
        <Col span="8" class="text-right">
          <Space>
            <Button
              :disabled="submitLoading"
              :loading="submitLoading"
              type="primary"
              @click="doSave"
            >
              {{ t('process.action.save') }}
            </Button>
            <Button @click="doBack"> {{ t('common.closeText') }} </Button>
          </Space>
        </Col>
      </Row>
    </template>
    <div class="form-data-edit-container">
      <div class="bg-white launch-header p-2">
        <div class="p-2 launch-header-desc" style="padding-top: 0">
          <Tag>{{ t('common.owningDepartment') }}：{{ flowBaseInfo.ownDeptName || '-' }}</Tag>
          <Tag>
            {{ t('common.processBp') }}：
            <EmpInfo :no="flowBaseInfo.processDockingNo" :name="flowBaseInfo.processDockingName">
              {{ flowBaseInfo.processDockingName || '-' }}
            </EmpInfo>
          </Tag>
        </div>
      </div>
      <FormContainer
        ref="formContainerRef"
        :form-type="flowBaseInfo.formType"
        :model-key="processBaseInfo.modelKey"
        :biz-id="processBaseInfo.bizId"
        :proc-inst-id="processBaseInfo.procInstId"
        :task-id="processBaseInfo.taskId"
        :view-type="processBaseInfo.viewType || 'launch'"
      />
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
import { ref, unref, nextTick, defineEmits, defineExpose } from 'vue';
import { Space, Tag, Row, Col, Modal, Button } from 'ant-design-vue';
import { useVbenModal } from '@vben/common-ui';
import FormContainer from '#/views/process/components/FormContainer.vue';
import { getProdModelInfoByModelKeyAndProcInstId } from '#/api/process/process';
import { EmpInfo } from '#/views/components/EmpInfo';
import { updateCustomFormData } from '#/api/process/customForm';
import { getActivityFormItemDefByFormDefId } from '#/api/form/customForm';
import { useI18n } from '@vben/locales';

const { t } = useI18n();
const emit = defineEmits(['success']);
const flowBaseInfo = ref<any>({});
const processBaseInfo = ref<any>({});
const formContainerRef = ref();
const submitLoading = ref(false);

const [BasicModal, modalApi] = useVbenModal({
  draggable: true,
  onCancel() {
    modalApi.close();
  },
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      processBaseInfo.value = {
        formType: 0,
        modelKey: '',
        procInstId: '',
        bizId: '',
        taskId: '',
        viewType: 'view',
      };
      flowBaseInfo.value = {};
      const data = modalApi.getData<Record<string, any>>();
      if (data) {
        processBaseInfo.value = {
          formType: 0,
          modelKey: data.modelKey,
          procInstId: data.procInstId,
          bizId: data.businessKey,
          taskId: data.taskId,
          viewType: data.viewType || 'view',
        };
        initData();
        modalApi.setState({ loading: false, confirmLoading: false });
      }
    }
  },
  onConfirm() {
    // modal does not auto-close on confirm
  },
});

function initData() {
  const { modelKey, procInstId, bizId } = unref(processBaseInfo);
  getProdModelInfoByModelKeyAndProcInstId({ modelKey, procInstId: procInstId || '' }).then(
    (res) => {
      flowBaseInfo.value = res;
      unref(formContainerRef)?.fetchFormData(unref(processBaseInfo));
      nextTick(() => {
        getActivityFormItemDefByFormDefId({ modelKey, procInstId }).then((formItems) => {
          if (formItems && formItems.length > 0) {
            setTimeout(() => {
              const hideFields: string[] = [];
              const editFields: string[] = [];
              const requiredFields: any[] = [];
              formItems.forEach((item: any) => {
                editFields.push(item.fieldName);
                if (item.operateType === 0) {
                  hideFields.push(item.fieldName);
                }
                if (item.operateType === 3) {
                  requiredFields.push(item);
                }
              });
              const generateForm = unref(formContainerRef)?.getGenerateForm();
              if (generateForm) {
                generateForm.disabled([...editFields, ...requiredFields], false);
                generateForm.display([...hideFields]);
                requiredFields.forEach((itm: any) => {
                  generateForm.setOptions(itm.fieldName, {
                    required: true,
                  });
                  generateForm.setRules(itm.fieldName, [
                    {
                      required: true,
                      message: t('process.message.missingRequiredField', { field: itm.labelName }),
                    },
                  ]);
                });
              }
            }, 500);
          }
        });
      });
    },
  );

  nextTick(() => {
    window['currentUser'] = null;
    window['procInstId'] = procInstId;
    window['modelKey'] = modelKey;
    window['bizId'] = bizId;
    window['onSubmitSuccess'] = (res: any) => {
      countDown(res, () => {});
    };
    window['onSaveSuccess'] = (res: any) => {
      countDown(res, () => {});
    };
    window['onSubmitFail'] = (res: any) => {
      Modal.error({ title: t('process.title.prompt'), content: (res && res.msg) || t('process.message.submitFormFailed') });
    };
    window['onSaveFail'] = (res: any) => {
      Modal.error({ title: t('process.title.prompt'), content: (res && res.msg) || t('process.message.saveDataFailed') });
    };
  });
}

const countDown = (res: any, onClose: () => void) => {
  let secondsToGo = 5;
  const modal = Modal.success({
    title: t('process.title.prompt'),
    content: t('process.message.autoCloseAfterLaunch', {
      message: (res && res.msg) || t('process.message.operationSuccess'),
      seconds: secondsToGo,
    }),
    afterClose: onClose,
  });
  const interval = setInterval(() => {
    secondsToGo -= 1;
    modal.update({
      content: t('process.message.autoCloseAfterLaunch', {
        message: (res && res.msg) || t('process.message.operationSuccess'),
        seconds: secondsToGo,
      }),
    });
  }, 1000);
  setTimeout(() => {
    clearInterval(interval);
    modal.destroy();
  }, secondsToGo * 1000);
};

async function doSubmit(status: string) {
  try {
    submitLoading.value = true;
    const validate = status === '2';
    const fData = await unref(formContainerRef)?.getFormData(validate);
    const { bizId, procInstId, modelKey } = unref(processBaseInfo);
    const formData = { defaultFormDataVo: { code: bizId }, makFormDataVo: fData };
    const data = { dataJson: JSON.stringify(formData), procInstId, modelKey };
    const res = await updateCustomFormData(data);
    if (res && res.data) {
      if (res.data.success) {
        submitLoading.value = false;
        Modal.success({
          title: t('process.title.prompt'),
          content: res.data.msg,
        });
        modalApi.close();
        emit('success', status);
      } else {
        Modal.error({ title: t('process.title.prompt'), content: res.data.msg });
        submitLoading.value = false;
      }
    } else {
      Modal.error({ title: t('process.title.prompt'), content: t('common.submitFormError') });
      submitLoading.value = false;
    }
  } catch (e) {
    submitLoading.value = false;
  }
}

function doBack() {
  modalApi.close();
}

async function doSave() {
  return await doSubmit('1');
}

defineExpose(modalApi);
</script>
<style lang="less" scoped>
.form-data-edit-container {
  max-height: calc(100vh - 140px);
}
</style>
