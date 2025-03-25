<template>
  <BasicModal
    :footer="null"
    v-bind="$attrs"
    @register="registerModal"
    wrap-class-name="framework-designer-container "
  >
    <template #title>
      <div style="width: 100%">
        <Row>
          <Col span="10">
            <span v-if="!modelBaseInfo.name">
              新建{{ dataType === 'framework' ? '架构' : '体系' }}
            </span>
            <Tooltip v-else placement="leftBottom">
              <template #title>
                {{ modelBaseInfo.name }}
              </template>
              编辑 -
              <TypographyText @click="doCopyContent(modelBaseInfo.name)">{{
                modelBaseInfo.name
              }}</TypographyText>
            </Tooltip>
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
                  <Badge color="#f50" :offset="[5, 0]">
                    设计{{ dataType === 'framework' ? '架构' : '体系' }}
                  </Badge>
                </template>
              </Step>
            </Steps>
          </Col>
          <Col span="10" style="text-align: right">
            <Space>
              <Button type="primary" @click="handleSave" :loading="saveBtnLoading"> 保存 </Button>
              <Button type="default" @click="handleClose">关闭</Button>
            </Space>
          </Col>
        </Row>
      </div>
    </template>

    <div class="flex h-full">
      <div class="w-full bg-white">
        <IntegralDesigner
          ref="logicFlowRef"
          :minimap="minimap"
          :panel="false"
          :theme="isDark ? 'dark' : 'light'"
          :file-name="modelBaseInfo.name"
          translate-prefix="logicflow.base."
          @data-changed="handleSave"
        />
      </div>

      <div
        class="w-1/3 bg-white ml-4 p-2 base-info-box overflow-y-auto"
        :class="{ 'base-info-box-collapse': collapseBaseInfo }"
        style="padding-top: 10px; height: 100%; overflow-y: scroll"
        v-loading="formLoading"
      >
        <Tooltip
          :title="collapseBaseInfo ? '展开' : '收起'"
          @click="collapseBaseInfo = !collapseBaseInfo"
        >
          <span style="cursor: pointer" class="font-bold text-md">
            <MenuFoldOutlined v-show="collapseBaseInfo" /><!-- 左箭头 -->
            <MenuUnfoldOutlined v-show="!collapseBaseInfo" /><!-- 右箭头 -->
            基本信息
          </span>
        </Tooltip>

        <BasicForm @register="registerForm" v-show="!collapseBaseInfo" class="!mt-4" />
      </div>
    </div>
  </BasicModal>
</template>

<script lang="ts" setup>
  import { ComponentInstance, defineEmits, nextTick, ref, shallowRef, unref } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { flowFrameworkFormSchema, flowSystemFormSchema } from './framework.data';
  import { Badge, Button, Col, Row, Space, Steps, Tooltip, TypographyText } from 'ant-design-vue';
  // import { useMessage } from '@/hooks/web/useMessage';
  import { getLfLocalStorage, IntegralDesigner } from '#/assets/logicflow/lf-designer';
  import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue';
  import { getAllParentsById, getById, saveOrUpdate } from '#/api/bpm/framework';
  // import { BasicForm, useForm } from '@/components/Form';
  // import { copyText } from '#/utils/copyTextToClipboard';
  // import { useDarkModeTheme } from '@/hooks/setting/useDarkModeTheme';

  const { isDark } = useDarkModeTheme();
  const Step = Steps.Step;
  const currentStepValue = ref<number>(0);

  const emit = defineEmits(['success', 'register']);

  const minimap = ref(getLfLocalStorage('minimap'));
  const collapseBaseInfo = ref(false);
  const { createMessage } = useMessage();
  const isUpdate = ref(false);
  const saveBtnLoading = ref(false);
  const mainId = ref('');
  const logicFlowRef = shallowRef<ComponentInstance<typeof IntegralDesigner>>();
  const allParentsFramework = ref<Record<string, any>[]>([]);
  const modelBaseInfo = ref<Record<string, any>>({});
  const formLoading = ref(false);
  const dataType = ref('');

  const [registerForm, { resetFields, resetSchema, setFieldsValue, validate }] = useForm({
    labelWidth: 100,
    showActionButtonGroup: false,
  });

  async function loadShowHeader(frameworkId) {
    const headerResult = await getAllParentsById({ frameworkId });
    allParentsFramework.value = headerResult.reverse();
    // await setFieldsValue({
    //   processSystemId: systemId,
    // });
  }
  function doCopyContent(content) {
    copyText(content);
  }

  // 获取xml
  async function loadBaseInfo(id, type, pid) {
    let formData: Record<string, any> = {};
    minimap.value = getLfLocalStorage('minimap');

    if (type === 'framework') {
      await resetSchema(flowFrameworkFormSchema);
    } else {
      await resetSchema(flowSystemFormSchema);
    }
    await resetFields();

    if (id) {
      // 编辑时加载数据
      mainId.value = id;
      formLoading.value = true;
      formData = await getById({ id });

      isUpdate.value = true;
      await loadShowHeader(id);
      await setFieldsValue({
        ...formData,
      });
      // 加载责任人
      if (formData.ownerCode) {
        await setFieldsValue({
          ownerPersonal: [
            {
              code: formData.ownerCode,
              name: formData.ownerName,
            },
          ],
        });
      }
      // 加载责任部门
      if (formData.deptId) {
        await setFieldsValue({
          ownerDept: [
            {
              code: formData.deptId,
              name: formData.deptName,
            },
          ],
        });
      }

      modelBaseInfo.value = formData;
      collapseBaseInfo.value = true;
      formLoading.value = false;
    } else {
      if (type === 'framework') {
        await loadShowHeader(pid);
        await setFieldsValue({ pid: pid || '' });
      }
    }

    let graphData = {};

    try {
      graphData = JSON.parse(formData.diagramsInfoXml || '{}');
    } catch (e) {
      console.error(e);
    }

    await nextTick();
    logicFlowRef.value?.togglePanel(false);

    // 等待 300ms 加载，处理弹窗动画
    setTimeout(() => {
      try {
        logicFlowRef.value?.importNewData(graphData);
      } catch (e) {
        console.error(e);
      }
    }, 300);
  }

  const [registerModal, { closeModal, changeLoading }] = useModalInner((data) => {
    dataType.value = data.type;
    loadBaseInfo(data.id, data.type, data.pid);
  });

  async function getProcessDesignerSvgXml() {
    const data = logicFlowRef.value?.exportNewData();

    return data ? JSON.stringify(data) : '';
  }
  async function genValues(values) {
    values.diagramsInfoXml = await getProcessDesignerSvgXml();

    //选择人员
    if (values.ownerPersonal && values.ownerPersonal.length > 0) {
      const personal = values.ownerPersonal[0];
      values.ownerCode = personal.code;
      values.ownerName = personal.name;
    }
    //选择部门
    if (values.ownerDept && values.ownerDept.length > 0) {
      const dept = values.ownerDept[0];
      values.deptId = dept.id;
      values.deptName = dept.name;
    }
    delete values.ownerPersonal;
    delete values.ownerDept;
  }

  async function handleSave() {
    try {
      // changeLoading(true);
      saveBtnLoading.value = true;
      const values = await validate();
      await genValues(values);
      const result = await saveOrUpdate(values);
      const { data, success, msg } = result.data;
      if (success) {
        message.success(msg);
        mainId.value = data.id;
        modelBaseInfo.value = data;
        await setFieldsValue({
          id: data.id,
          diagramsInfoId: data.diagramsInfoId,
        });
      } else {
        message.error(msg);
      }
      // changeLoading(false);
      saveBtnLoading.value = false;
    } catch (e) {
      console.error(e);
      collapseBaseInfo.value = false;
      // changeLoading(false);
      saveBtnLoading.value = false;
      return Promise.reject('验证失败！');
    }
  }

  function handleClose() {
    closeModal();
    emit('success', unref(modelBaseInfo));
  }
</script>

<style lang="less">
  @import '@/assets/logicflow/style.css';
  @import '@/assets/hilight-js/index.css';
  .base-info-box {
    width: 600px;
    transition: width 0.25s;
    border-left: 1px solid var(--border-color, #eee);
  }
  .base-info-box > span {
    cursor: pointer;
  }
  .base-info-box-collapse {
    width: 50px;
    text-align: center;
  }
  .flow-apply-form {
    .ant-page-header-content {
      padding-top: 0;
    }
  }

  .framework-designer-container {
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
  }
</style>
