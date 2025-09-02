<template>
  <BasicModal
    :footer="null"
  >
    <template #title>
      <div style="width: 100%">
        <Row>
          <Col span="10">
            <Space size="small">
              {{ getTitle }}：
              <span v-for="(item, i) in allParentsFramework" :key="i">
                {{ item.name }}
                <RightOutlined v-if="i !== allParentsFramework.length - 1" />
              </span>
            </Space>
          </Col>
          <Col span="4">
            <Steps
              class="designer-steps"
              v-model:current="currentStepValue"
              size="small"
              type="navigation"
              :style="{ marginBottom: '0px', paddingTop: '0' }"
            >
              <Step>
                <template #title>
                  <Badge color="#f50" :offset="[5, 0]"> 设计模型 </Badge>
                </template>
              </Step>
            </Steps>
          </Col>
          <Col span="10" style="text-align: right">
            <Space>
              <a-button type="primary" @click="handleSave(true)" :loading="saveBtnLoading">
                保存
              </a-button>
              <Button type="default" @click="handleClose">关闭</Button>
            </Space>
          </Col>
        </Row>
      </div>
    </template>

    <div class="flex h-full">
      <div class="w-full bg-white">
        <IntegralDesigner
          ref="framePageRef"
          translate-prefix="bpmn.business."
          :panel="false"
          :theme="isDark ? 'dark' : 'light'"
          @xml-changed="handleSave()"
        />
      </div>

      <div
        class="w-1/3 bg-white ml-4 p-2 base-info-box"
        :class="{ 'base-info-box-collapse': collapseBaseInfo }"
        style="padding-top: 10px; height: 100%; overflow-y: scroll"
        v-loading="formLoading"
      >
        <Tooltip
          :title="collapseBaseInfo ? '展开' : '收起'"
          @click="collapseBaseInfo = !collapseBaseInfo"
        >
          <span style="cursor: pointer" class="font-bold text-md cursor">
            <MenuFoldOutlined v-show="collapseBaseInfo" /><!-- 左箭头 -->
            <MenuUnfoldOutlined v-show="!collapseBaseInfo" /><!-- 右箭头 -->
            基本信息
          </span>
        </Tooltip>

        <BasicForm v-show="!collapseBaseInfo" class="!mt-4" />
      </div>
    </div>
  </BasicModal>
</template>

<script lang="ts" setup>
  import { computed, defineEmits, defineExpose, nextTick, ref, unref } from 'vue';
  import { Badge, Button, Col, Modal, Row, Space, Steps, Tooltip, message } from 'ant-design-vue';
  import { IntegralDesigner } from '#/assets/business-designer/business-designer';
  import { getByFlowId, getById, saveOrUpdate } from '#/api/bpm/businessFlowApply';
  // import { BasicModal, useModalInner } from '@/components/Modal';
  // import { BasicForm, useForm } from '@/components/Form';
  import {useVbenModal} from '@vben/common-ui';
  import {useVbenForm} from '#/adapter/form';

  import {authSettingFormSchema, businessFlowApplyFormSchema} from './businessFlowApply.data';
  // import { useTabs } from '@/hooks/web/useTabs';
  import { getAllParentsById } from '#/api/bpm/framework';
  // import { ResultEnum } from '@/enums/httpEnum';
  import { changeURLPar } from '#/utils/domUtils';
  import { MenuFoldOutlined, MenuUnfoldOutlined, RightOutlined } from '@ant-design/icons-vue';
  import { getCategoryIdsByAppSn } from '#/api/flowable/bpmn/modelInfo';
  import { usePreferences } from '@vben/preferences';
  import {useRouter} from 'vue-router';

  // import { useGo } from '@/hooks/web/usePage';
  // import { useDarkModeTheme } from '@/hooks/setting/useDarkModeTheme';
  import {getFlowAuthorizeByBusinessFlowId} from "#/api/bpm/flowAuthorize";

  const emit = defineEmits(['success']);
  const router = useRouter();

  const { isDark } = usePreferences();

  const Step = Steps.Step;
  const formLoading = ref(false);
  // const go = useGo();

  const collapseBaseInfo = ref(false);
  const isUpdate = ref(false);
  const saveBtnLoading = ref(false);
  // const submitBtnLoading = ref(false);
  const mainId = ref('');
  const modelBaseInfo = ref<Record<string, any>>({});

  // const { closeCurrent } = useTabs();
  const framePageRef = ref<any>();
  const allParentsFramework = ref<Record<string, any>[]>([]);
  const currentStepValue = ref(0);
  const dataTypeRef = ref('');
  const typeRef = ref('');

  /*const [registerForm, { resetFields, updateSchema, setFieldsValue, validate }] = useForm({
    labelWidth: 100,
    schemas: businessFlowApplyFormSchema,
    showActionButtonGroup: false,
  });*/

  // const [registerModal, { closeModal }] = useModalInner(loadBaseData);

  const [BasicForm, formApi] = useVbenForm({
    commonConfig: {
      labelWidth: 100,
    },
    schema: businessFlowApplyFormSchema,
    showDefaultActions: false,
  });

  const [BasicModal, modalApi] = useVbenModal({
    fullscreenButton: false,
    onCancel() {
      modalApi.close();
    },
    onConfirm() {
      // await baseFormApi.submitForm();
      // handleSubmit();
    },
    onOpenChange: async (isOpen) => {
      if (!isOpen) {
        return null;
      }
      modalApi.setState({loading: true, confirmLoading: true});
      const formData = modalApi.getData();
      loadBaseData(formData)
      modalApi.setState({loading: false, confirmLoading: false});
    },
  });


  async function loadBaseData(data) {
    console.log('load');
    const { frameworkId, id, dataType, type } = data;
    dataTypeRef.value = dataType;
    typeRef.value = type;

    // await resetFields();
    formApi.resetForm();
    await nextTick();
    framePageRef.value?.togglePanel(false);
    framePageRef.value?.toggleTheme(isDark.value ? 'dark' : 'light');

    let formData: Record<string, any> = {};

    // 获取流程分类ID
    let categoryIds = await getCategoryIdsByAppSn({ appSn: 'businessFlow' });

    await formApi.updateSchema([
      {
        fieldName: 'modelKey',
        label: '绑定流程',
        component: 'ModelInfoSelector',
        componentProps: {
          multiple: false,
          title: '选择流程模板',
          extendParams: {
            searchInfo: { appSn: 'businessFlow' },
            showLeftTreeNodes: categoryIds,
          },
        },
        colProps: { span: 24 },
      },
    ]);

    if (id) {
      mainId.value = id;

      if (dataType === 'flowApply') {
        formData = await getById({ id });
      } else {
        formData = await getByFlowId({ id });
      }
      // 如果从数据库删除了数据，导致获取数据为空则弹出提示
      if (!formData) {
        Modal.warning({
          title: '提示',
          content: '获取数据为空，无法编辑！',
          onOk: handleBack,
        });
        return;
      }

      isUpdate.value = true;

      await loadShowHeader(formData.frameworkId);

      const { modelKey, modelName, ownerCode, ownerName } = formData;
      await formApi.setValues({
        ...formData,
        modelKey: [{ modelKey, name: modelName }],
        ownerCode: [{ code: ownerCode, name: ownerName }],
      });

      collapseBaseInfo.value = true;
    } else {
      if (!frameworkId) {
        Modal.warning({
          title: '提示',
          content: '请选择架构再进入编辑',
          onOk: handleBack,
        });
        return;
      }

      await formApi.setValues({ frameworkId });
      await loadShowHeader(frameworkId);
    }
  }

  function handleBack() {
    // closeCurrent();
    // go({ name: 'BusinessFlow' });
    router.push({ name: 'BusinessFlow' });
  }

  async function loadShowHeader(frameworkId) {
    const allParents = await getAllParentsById({ frameworkId });
    if (allParents) {
      const currentParent = allParents[0];
      if (currentParent.ownerCode) {
        await formApi.setValues({
          ownerCode: [
            {
              code: currentParent.ownerCode,
              name: currentParent.ownerName,
            },
          ],
          frameworkId: currentParent.id,
        });
      }
    }

    allParentsFramework.value = allParents.reverse();
  }

  const getTitle = computed(() => (!unref(isUpdate) ? '新增业务流程' : '修改业务流程'));

  async function genValues(values) {
    // if (unref(dataTypeRef) !== 'flowApply') {
    //   values.id = '';
    // }
    values.modelName = values.modelKey?.[0].name;
    values.modelKey = values.modelKey?.[0].key;

    values.diagramsInfoXml = await getProcessDesignerSvgXml();
    values.ownerName = values.ownerCode.map((item) => item.name)?.[0];
    values.ownerCode = values.ownerCode.map((item) => item.code)?.[0];

    delete values.authRange;
  }

  async function handleSave(showMessage = false) {
    try {
      saveBtnLoading.value = true;
      const {valid} = await formApi.validate();
      if(!valid){
        return;
      }
      const values = await formApi.getValues();
      await genValues(values);
      const { success, msg, data } = await saveOrUpdate(values);

      if (success) {
        if (showMessage) {
          message.success(msg);
        }

        if (data) {
          console.log({ ...data });
          mainId.value = data.id;
          await formApi.setValues({
            id: data.id,
            businessFlowId: data.businessFlowId,
            diagramsInfoId: data.diagramsInfoId,
          });
        }

        const newUrl = changeURLPar(window.location.href, 'id', mainId.value);
        window.history.replaceState({ path: newUrl }, '', newUrl);
      } else {
        if (showMessage) {
          message.success(data.msg);
        }
      }
    } catch (e) {
      console.error(e);
      collapseBaseInfo.value = false;
      return Promise.reject('验证失败！');
    } finally {
      saveBtnLoading.value = false;
    }
  }

  async function getProcessDesignerSvgXml() {
    const { xml } = await framePageRef.value!.provideModeler!.saveXML();
    return xml;
  }

  function handleClose() {
    // closeModal();
    modalApi.close();
    emit('success', unref(modelBaseInfo));
  }
  defineExpose(modalApi);
</script>

<style lang="scss">
  /*@import '@/assets/business-designer/style.css';
  @import '@/assets/hilight-js/index.css';
  .business-flow-apply-container {
    > .ant-modal {
      > .ant-modal-content {
        > .ant-modal-header {
          cursor: default !important;
        }
      }
    }
    .ant-modal-content {
      .ant-modal-header {
        margin-bottom: 0;

        .designer-steps {
          .ant-steps-item-title {
            overflow: visible;
          }
        }
      }
      .ant-modal-body {
        .scroll-container {
          padding-top: 0;
        }
      }
    }

    .base-info-box {
      width: 600px;
      transition: width 0.25s;
      border-left: 1px solid var(--border-color, #eee);
    }
    .base-info-box > span {
      cursor: pointer;
    }
    .base-info-box-collapse {
      width: 40px;
      text-align: center;
    }
    .custom-wrapper-content {
      .ant-page-header-content {
        padding-top: 0;
      }
    }
  }*/
</style>
