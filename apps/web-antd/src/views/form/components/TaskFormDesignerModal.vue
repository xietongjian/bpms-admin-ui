<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    @ok="handleSubmit"
    :wrapperFooterOffset="50"
    @visible-change="handleVisibleChange"
    :defaultFullscreen="false"
  >
    <MakingForm ref="makingFormRef" preview style="height: 100%; min-height: 500px">
      <template #action>
        <div style="float: left">
          <div style="display: inline-flex; float: left">
            <Space>
              <a-input ref="formNameRef" v-model:value="formName" placeholder="请输入名称" />
            </Space>
          </div>
        </div>
        <a-button type="link" @click="handleSubmit"> <save-outlined />保存 </a-button>
      </template>
    </MakingForm>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, unref } from 'vue';

  import {useVbenModal} from '@vben/common-ui';
  import {useVbenForm} from '#/adapter/form';
  import { Space } from 'ant-design-vue';
  import { MakingForm } from '/public/static/form-making';
  import { SaveOutlined } from '@ant-design/icons-vue';
  import { getTaskFormMakInfoById, saveTaskFormInfo } from '#/api/form/customTaskForm';

  const makingFormRef = ref(null);

  const modelKey = ref('');
  const categoryCode = ref('');
  const formInfoId = ref('');
  const formName = ref('');
  const formNameRef = ref(null);

/*  const [registerModal, { setModalProps, changeLoading }] = useModalInner(async (data) => {
    loadData(data.formId);
    modelKey.value = data.modelKey;
    categoryCode.value = data.categoryCode;
    formInfoId.value = data.formId;
  });*/


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

  function loadData(id) {
    if (id) {
      changeLoading(true);
      getTaskFormMakInfoById({ formId: id })
        .then((res) => {
          unref(makingFormRef).setJSON(res.formJson);
          formName.value = res.title;
        })
        .finally(() => {
          changeLoading(false);
        });
    } else {
      formName.value = '';
      unref(makingFormRef).clear();
    }
  }

  async function handleSubmit() {
    setModalProps({ confirmLoading: true });
    const json = unref(makingFormRef).getJSON();
    const html = unref(makingFormRef).getHtml();
    if (!unref(formName)) {
      createMessage.warning('请输入表单名称！');
      unref(formNameRef).focus();
      return;
    }

    const params = {
      categoryCode: unref(categoryCode),
      content: html,
      flowLevelFlag: 1,
      formJson: JSON.stringify(json),
      formStatus: 1,
      id: unref(formInfoId),
      modelKey: unref(modelKey),
      name: unref(formName),
      title: unref(formName),
      version: '1.0',
    };
    changeLoading(true);
    saveTaskFormInfo(params)
      .then((res) => {
        formInfoId.value = res;
        createMessage.success('保存成功！');
      })
      .finally(() => {
        changeLoading(false);
      });
  }

  function handleVisibleChange(visible: boolean) {
    if (!visible) {
      unref(makingFormRef).clear();
    }
  }
</script>
