<template>
  <Page auto-content-height contentFullHeight class="flow-apply-form">
    <template #headerContent>
      <div class="flex">
        <div class="w-full" style="font-size: 14px; line-height: 32px">
          <Space size="small">
            <h1 class="title mb-0 mt-0">{{ getTitle }}：</h1>
            <span v-for="(item, i) in allParentsFramework">
              {{ item.name }}
              <RightOutlined v-if="i !== allParentsFramework.length - 1" />
            </span>
          </Space>
        </div>
        <div class="text-right">
          <Space size="middle">
            <a-button @click="handleBack">返回</a-button>
            <a-button type="primary" @click="handleSave" :loading="saveBtnLoading"> 保存 </a-button>
          </Space>
        </div>
      </div>
    </template>

    <div class="flex h-full">
      <div class="w-full bg-white">
        <ProcessPage ref="framePageRef" :frameSrc="formUrl" />
      </div>

      <div
        class="w-1/3 bg-white ml-4 p-2 base-info-box"
        :class="{ 'base-info-box-collapse': collapseBaseInfo }"
        style="padding-top: 10px; height: 80vh; overflow-y: scroll"
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
  </Page>
</template>
<script lang="ts" setup>
  import { defineComponent, ref, computed, unref, onMounted, defineEmits, reactive, toRefs } from 'vue';
  import {Page} from '@vben/common-ui';
  import { Space, Tabs, Tooltip, Steps, Modal, Collapse, Popconfirm, message } from 'ant-design-vue';
  import { getById, saveOrUpdate, getAllParentsById } from '#/api/bpm/framework';
  import { BasicForm, Rule, useForm } from '@/components/Form';
  import { flowFrameworkFormSchema, flowSystemFormSchema } from '../framework.data';

  import { useRouter } from 'vue-router';
  import { changeURLPar } from '#/utils/domUtils';
  import ProcessPage from '../../components/ProcessDesignerFrame.vue';
  import { MenuUnfoldOutlined, MenuFoldOutlined, RightOutlined } from '@ant-design/icons-vue';

  import {useVbenForm} from "#/adapter/form";
  import {formSchema} from "#/views/org/jobGradeType/jobGradeType.data";

  const emit = defineEmits(['success'])
  // const frameworkLibs = ['archimate', 'arrows2', 'atlassian'];
  const frameworkLibs = [];
  const processLibs = [];


  const collapseBaseInfo = ref(false);
  const { currentRoute } = useRouter();
  const isUpdate = ref(false);
  const submitBtnVisibility = ref(false);
  const saveBtnLoading = ref(false);
  const submitBtnLoading = ref(false);
  const mainId = ref('');
  const {
    query: { systemId, id, pid, dataType, type },
  } = unref(currentRoute);

  // const { setTitle, closeCurrent } = useTabs();

  const framePageRef = ref(null);
  const formUrl = ref<string>('');
  const allParentsFramework = ref([]);

  const [BasicForm, formApi] = useVbenForm({
    commonConfig: {
      labelWidth: 100,
    },
    schemas: type === 'framework' ? flowFrameworkFormSchema : flowSystemFormSchema,
    showDefaultActions: false,
  });

  onMounted(async () => {
    await formApi.resetForm();
    let formData = {};

    const libs = type === 'framework' ? frameworkLibs.join(';') : processLibs.join(';');
    const tempA = document.createElement('a');

    let loadUrl = '';

    if (id) {
      // 编辑时加载数据
      mainId.value = id;
      formData = await getById({ id });
      isUpdate.value = true;

      await loadShowHeader(id);

      formApi.setValues({
        ...formData,
      });
      // 加载责任人
      if (formData.ownerCode) {
        formApi.setValues({
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
        formApi.setValues({
          ownerDept: [
            {
              code: formData.deptId,
              name: formData.deptName,
            },
          ],
        });
      }

      tempA.href = '/flow/bpm/diagrams/getXmlByte/' + formData.id;
      loadUrl = '#U' + tempA.href;
      collapseBaseInfo.value = true;
    } else {
      if (type === 'framework') {
        await loadShowHeader(pid);
        formApi.setValues({
          pid: pid || '',
        });
      } else {
      }
    }
    formUrl.value =
        '/static/drawio/index.html?dev=1&lang=zh&save=remote&drafts=0&splash=0&format=1&libs=' +
        libs +
        '&picker=0&db=0&od=0&tr=0&gh=0&gl=0&gapi=0&mainId=' +
        mainId.value +
        loadUrl;
  });

  function handleBack() {
    // closeCurrent();
    // go({ name: 'ProcessFramework' });
  }

  function handleCloseFunc() {
    return Promise.resolve(true);
  }

  async function loadShowHeader(frameworkId) {
    const headerResult = await getAllParentsById({ frameworkId });
    allParentsFramework.value = headerResult.reverse();
    // await setFieldsValue({
    //   processSystemId: systemId,
    // });
  }

  const getTitle = computed(() => {
    const typeName = type === 'system' ? '体系' : '架构';
    return !unref(isUpdate) ? '流程建模' + typeName : '编辑模型' + typeName;
  });

  // setTitle(getTitle);

  async function genValues(values) {
    const xml = await getProcessDesignerSvgXml();
    values.diagramsInfoXml = xml;

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
      saveBtnLoading.value = true;
      const {valid} = await formApi.validate();
      const values = await formApi.getValues();
      await genValues(values);
      //values['frameworkId'] = frameworkId.value;
      const {success, msg, data} = await saveOrUpdate(values);

      if (success) {
        message.success(msg);
        mainId.value = data.id;
        const newUrl = changeURLPar(window.location.href, 'id', mainId.value);
        window.history.replaceState(
            {
              path: newUrl,
            },
            '',
            newUrl,
        );

        formApi.setValues({
          id: data.id,
          diagramsInfoId: data.diagramsInfoId,
        });

        const libs = type === 'framework' ? frameworkLibs.join(';') : processLibs.join(';');
        const tempA = document.createElement('a');
        tempA.href = '/flow/bpm/diagrams/getXmlByte/' + mainId.value;
        const loadUrl = '#U' + tempA.href;
        formUrl.value =
            '/static/drawio/index.html?dev=1&lang=zh&save=remote&drafts=0&splash=0&format=1&libs=' +
            libs +
            '&picker=0&db=0&od=0&tr=0&gh=0&gl=0&gapi=0&mainId=' +
            mainId.value +
            loadUrl;
      } else {
        message.error(msg);
      }
    } catch (e) {
      collapseBaseInfo.value = false;
      return Promise.reject('验证失败！');
    } finally {
      saveBtnLoading.value = false;
    }
  }

  function getProcessDesignerSvgXml() {
    return unref(framePageRef).frameRef.contentWindow.doGetXml();
  }

</script>
<style lang="less">
  .base-info-box {
    width: 600px;
    transition: width 0.25s;
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
</style>
