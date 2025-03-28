<template>
  <Page auto-content-height contentFullHeight fixed-height class="custom-wrapper-content">
    <template #headerContent>
      <div class="flex">
        <div class="w-full" style="font-size: 14px; line-height: 32px">
          <Space size="small">
            <h1 class="title mb-0 mt-0">{{ getTitle }}：</h1>
            <span v-for="(item, i) in allParentsFramework" :key="i">
              {{ item.name }}
              <RightOutlined v-if="i !== allParentsFramework.length - 1" />
            </span>
          </Space>
        </div>
        <div class="text-right">
          <Space size="middle">
            <a-button @click="handleBack">返回</a-button>
            <a-button type="primary" @click="handleSave(true)" :loading="saveBtnLoading">
              保存
            </a-button>
          </Space>
        </div>
      </div>
    </template>

    <div class="flex h-full" style="min-height: inherit">
      <IntegralDesigner
        ref="framePageRef"
        translate-prefix="bpmn.business."
        :panel="false"
        :file-name="computedFlowName"
        :theme="isDark ? 'dark' : 'light'"
        @xml-changed="handleSave()"
      />

      <div
        class="w-1/3 h-full bg-white ml-4 p-2 base-info-box overflow-y-auto"
        :class="{ 'base-info-box-collapse': collapseBaseInfo }"
        style="padding-top: 10px"
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

        <BasicForm
          ref="flowInfoFormRef"
          @register="registerForm"
          v-show="!collapseBaseInfo"
          class="!mt-4"
        />
      </div>
    </div>
  </Page>
</template>

<script lang="ts" setup>
  import { computed, nextTick, onMounted, ref, unref, watchEffect } from 'vue';
  import type { ComponentInstance } from 'vue';
  import { useRouter } from 'vue-router';
  import { Modal, Space, Tooltip, message } from 'ant-design-vue';
  import {Page} from '@vben/common-ui';
  import { getBusinessFlowById, getById, saveOrUpdate } from '#/api/bpm/businessFlowApply';
  // import { BasicForm, useForm } from '@/components/Form';
  import {useVbenForm} from '#/adapter/form';
  import { usePreferences } from '@vben/preferences';

  import { businessFlowApplyFormSchema } from './businessFlowApply.data';
  // import { useTabs } from '@/hooks/web/useTabs';
  import { getAllParentsById } from '#/api/bpm/framework';
  // import { ResultEnum } from '@/enums/httpEnum';
  import { changeURLPar } from '#/utils/domUtils';
  import { MenuFoldOutlined, MenuUnfoldOutlined, RightOutlined } from '@ant-design/icons-vue';
  // import { useGo } from '@/hooks/web/usePage';

  import { IntegralDesigner } from '#/assets/business-designer/business-designer';
  const router = useRouter();

  const { isDark } = usePreferences();
  // const go = useGo();
  const { currentRoute } = useRouter();
  const {
    query: { frameworkId, id, dataType },
  } = unref(currentRoute);
  // const { setTitle, closeCurrent } = useTabs();

  const collapseBaseInfo = ref(false);
  const isUpdate = ref(false);
  const saveBtnLoading = ref(false);
  const mainId = ref<string>('');
  const flowInfoFormRef = ref<ComponentInstance<typeof BasicForm>>();
  const framePageRef = ref<ComponentInstance<typeof IntegralDesigner>>();
  const allParentsFramework = ref<Record<string, any>[]>([]);

  /*const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 100,
    schemas: businessFlowApplyFormSchema,
    showActionButtonGroup: false,
  });*/
  const [BasicForm, formApi] = useVbenForm({
    commonConfig: {
      labelWidth: 100,
    },
    schema: businessFlowApplyFormSchema,
    showDefaultActions: false,
  });

  const computedFlowName = computed(() => flowInfoFormRef.value?.formModel?.name);

  onMounted(async () => {
    await resetFields();
    await nextTick();

    framePageRef.value?.togglePanel(false);

    let formData: Record<string, any> = {};

    if (id) {
      collapseBaseInfo.value = true;
      mainId.value = id as string;

      if (dataType === 'flow') {
        formData = await getBusinessFlowById({ id });
      } else {
        formData = await getById({ id });
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

      await framePageRef.value!.provideModeler.importXML(formData.diagramsInfoXml);
      await framePageRef.value!.provideModeler.get('canvas')?.zoom('fit-viewport', 'center');

      await loadShowHeader(formData.frameworkId);

      await setFieldsValue({
        ...formData,
        id: id,
        modelKey: [{ modelKey: formData.modelKey, name: formData.modelName }],
        ownerCode: [{ code: formData.ownerCode, name: formData.ownerName }],
      });
    } else {
      if (!frameworkId) {
        Modal.warning({
          title: '提示',
          content: '请选择架构再进入编辑',
          onOk: handleBack,
        });
        return;
      } else {
        await setFieldsValue({
          frameworkId: frameworkId,
        });
      }
      await loadShowHeader(frameworkId);
    }
  });

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
        await setFieldsValue({
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

  const getTitle = computed(() => (!unref(isUpdate) ? '流程建模' : '修改模型'));
  // watchEffect(() => setTitle(getTitle.value));

  async function genValues(values) {
    // if (dataType !== 'flowApply') {
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
      const values = await validate();
      await genValues(values);
      const { success, msg, data } = await saveOrUpdate(values);
      if (success) {
        if (showMessage) {
          message.success(msg);
        }

        if (data) {
          mainId.value = data.id;
          await setFieldsValue({
            id: data.id,
            businessFlowId: data.businessFlowId,
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
</script>

<style lang="scss">
  @import '#/assets/business-designer/style.css';
  @import '#/assets/hilight-js/index.css';

  .business-designer__wrap {
    min-height: inherit;
  }
  .base-info-box {
    width: 600px;
    transition: width 0.25s;
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
</style>
