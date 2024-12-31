<template>
  <PageWrapper title="数据清理" contentFullHeight>
    <Alert type="warning" show-icon>
      <template #icon>
        <HeatMapOutlined style="color: orangered" />
      </template>
      <!--      <template #message>
        <Space>
          <span>当前运行环境：</span>
          <span class="font-bold">{{envConst[currentEnv]}}</span>
        </Space>
      </template>-->
      <template #description>
        功能说明：
        <p> 1、根据流程定义Key或业务表单Key或流程实例ID清理数据 </p>
        温馨提示：
        <p> 1、清理数据为不可逆操作，操作请慎重！ </p>
      </template>
    </Alert>

    <CollapseContainer class="mt-4" title="通过业务表单Key清理">
      <BasicForm @register="registerBizKeyForm" loading="true" />
      <div class="p-4" style="padding-top: 0; padding-left: 150px">
        <Authority :value="'DataClean:' + PerEnum.UPDATE">
          <a-button :loading="cleanByBizKeyLoading" type="error" @click="handleCleanByBizKey"
            >开始清理</a-button
          >
        </Authority>
      </div>
    </CollapseContainer>

    <CollapseContainer class="mt-4" title="通过流程ProcInstId清理">
      <BasicForm @register="registerProcInstIdForm" />
      <div class="p-4" style="padding-top: 0; padding-left: 150px">
        <Authority :value="'DataClean:' + PerEnum.UPDATE">
          <a-button
            :loading="cleanByProcInstIdLoading"
            type="error"
            @click="handleCleanByProcInstId"
            >开始清理</a-button
          >
        </Authority>
      </div>
    </CollapseContainer>

    <CollapseContainer class="mt-4" title="通过流程ModelKey清理">
      <BasicForm @register="registerModelKeyForm" />
      <div class="p-4" style="padding-top: 0; padding-left: 150px">
        <Authority :value="'DataClean:' + PerEnum.UPDATE">
          <a-button :loading="cleanByModelKeyLoading" type="error" @click="handleCleanByModelKey"
            >开始清理</a-button
          >
        </Authority>
      </div>
    </CollapseContainer>

    <CollapseContainer class="mt-4" title="通过流程ModelKey删除流程模板">
      <BasicForm @register="registerDeleteModelByModelKeyForm" />
      <div class="p-4" style="padding-top: 0; padding-left: 150px">
        <Authority :value="'DataClean:' + PerEnum.UPDATE">
          <a-button :loading="deleteModelByModelKeyLoading" type="error" @click="handleDeleteModelByModelKey"
            >开始删除</a-button
          >
        </Authority>
      </div>
    </CollapseContainer>

    <CollapseContainer class="mt-4" title="模型同步">
      <!--      <BasicForm @register="registerModelSyncForm" />-->
      <div class="p-4" style="padding-top: 0; padding-left: 150px">
        <Authority :value="'DataClean:' + PerEnum.UPDATE">
          <Space>
            <a-button :loading="bpmnModelSyncLoading" type="error" @click="handleBpmnModelSync"
              >同步BPMN</a-button
            >
            <a-button :loading="dmnModelSyncLoading" type="error" @click="handleDmnModelSync"
              >同步DMN</a-button
            >
          </Space>
        </Authority>
      </div>
    </CollapseContainer>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { BasicForm, useForm } from '@/components/Form/index';
  import { CollapseContainer } from '@/components/Container/index';
  import { useMessage } from '@/hooks/web/useMessage';
  import { PageWrapper } from '@/components/Page';
  import { bizKeyFormSchema, procInstIdFormSchema, modelKeyFormSchema, deleteModelByModelKeyFormSchema } from './dataClean.data';
  import { Alert, Space } from 'ant-design-vue';
  import {
    cleanByBizKeys,
    cleanByModelKeys,
    cleanByProcInstIds, deleteModelByModelKey,
    syncModel,
  } from '@/api/flowoperation/dataClean';
  import { HeatMapOutlined } from '@ant-design/icons-vue';

  import { ResultEnum } from '@/enums/httpEnum';
  import { PerEnum } from '@/enums/perEnum';
  import { Authority } from '@/components/Authority';

  const cleanByBizKeyLoading = ref<boolean>(false);
  const cleanByProcInstIdLoading = ref<boolean>(false);
  const cleanByModelKeyLoading = ref<boolean>(false);
  const deleteModelByModelKeyLoading = ref<boolean>(false);
  const bpmnModelSyncLoading = ref<boolean>(false);
  const dmnModelSyncLoading = ref<boolean>(false);
  const { createMessage, createConfirm } = useMessage();

  const [registerBizKeyForm, { validate: validateBizKeyForm, setProps }] = useForm({
    labelWidth: 150,
    schemas: bizKeyFormSchema,
    showActionButtonGroup: false,
  });

  const [registerProcInstIdForm, { validate: validateProcInstIdForm }] = useForm({
    labelWidth: 150,
    schemas: procInstIdFormSchema,
    showActionButtonGroup: false,
  });

  const [registerModelKeyForm, { validate: validateModelKeyForm }] = useForm({
    labelWidth: 150,
    schemas: modelKeyFormSchema,
    showActionButtonGroup: false,
  });

  const [registerDeleteModelByModelKeyForm, { validate: validateDeleteModelByModelKeyForm }] = useForm({
    labelWidth: 150,
    schemas: deleteModelByModelKeyFormSchema,
    showActionButtonGroup: false,
  });

  onMounted(() => {
    /*getEnv().then(res=>{
    currentEnv.value = res;
  });*/
  });

  async function handleCleanByBizKey() {
    // setProps({
    //   loading: true,
    // });
    const values = await validateBizKeyForm();
    createConfirm({
      iconType: 'warning',
      title: '提示',
      content: '数据清理为不可逆操作，确定要执行吗？',
      okButtonProps: {
        type: 'error',
      },
      onOk: async () => {
        cleanByBizKeyLoading.value = true;
        cleanByBizKeys(values)
          .then((res) => {
            const resData = res.data;
            if (resData.code === ResultEnum.SUCCESS) {
              createMessage.success(resData.msg);
            } else {
              createMessage.error(resData.msg);
            }
          })
          .finally(() => {
            cleanByBizKeyLoading.value = false;
          });
      },
    });
  }

  async function handleCleanByProcInstId() {
    const values = await validateProcInstIdForm();
    createConfirm({
      iconType: 'warning',
      title: '提示',
      content: '数据清理为不可逆操作，确定要执行吗？',
      okButtonProps: {
        type: 'error',
      },
      onOk: async () => {
        cleanByProcInstIdLoading.value = true;
        cleanByProcInstIds(values)
          .then((res) => {
            const resData = res.data;
            if (resData.code === ResultEnum.SUCCESS) {
              createMessage.success(resData.msg);
            } else {
              createMessage.error(resData.msg);
            }
          })
          .finally(() => {
            cleanByProcInstIdLoading.value = false;
          });
      },
    });
  }

  async function handleCleanByModelKey() {
    const values = await validateModelKeyForm();
    createConfirm({
      iconType: 'warning',
      title: '提示',
      content: '数据清理为不可逆操作，确定要执行吗？',
      okButtonProps: {
        type: 'error',
      },
      onOk: async () => {
        cleanByModelKeyLoading.value = true;
        cleanByModelKeys(values)
          .then((res) => {
            const resData = res.data;
            if (resData.code === ResultEnum.SUCCESS) {
              createMessage.success(resData.msg);
            } else {
              createMessage.error(resData.msg);
            }
          })
          .finally(() => {
            cleanByModelKeyLoading.value = false;
          });
      },
    });
  }

  async function handleDeleteModelByModelKey() {
    const values = await validateDeleteModelByModelKeyForm();
    debugger;
    createConfirm({
      iconType: 'warning',
      title: '提示',
      content: '删除流程模板，将同时删除该模板的所有数据，为不可逆操作，确定要执行吗？',
      okButtonProps: {
        type: 'error',
      },
      onOk: async () => {
        deleteModelByModelKeyLoading.value = true;
        if(values.modelKeys){
          values.modelKeys.split(',');
        }
        deleteModelByModelKey(values)
          .then((res) => {
            const {success, msg} = res.data;
            if (success) {
              createMessage.success(msg);
            } else {
              createMessage.error(msg);
            }
          })
          .finally(() => {
            deleteModelByModelKeyLoading.value = false;
          });
      },
    });
  }

  async function handleBpmnModelSync() {
    // const values = await validateModelKeyForm();
    createConfirm({
      iconType: 'warning',
      title: '提示',
      content: '同步Bpmn模板，确定要执行吗？',
      okButtonProps: {
        type: 'error',
      },
      onOk: async () => {
        bpmnModelSyncLoading.value = true;
        syncModel({ modelType: 0 })
          .then((res) => {
            const resData = res.data;
            if (resData.code === ResultEnum.SUCCESS) {
              createMessage.success(resData.msg);
            } else {
              createMessage.error(resData.msg);
            }
          })
          .finally(() => {
            bpmnModelSyncLoading.value = false;
          });
      },
    });
  }

  async function handleDmnModelSync() {
    createConfirm({
      iconType: 'warning',
      title: '提示',
      content: '同步Dmn模板，确定要执行吗？',
      okButtonProps: {
        type: 'error',
      },
      onOk: async () => {
        dmnModelSyncLoading.value = true;
        syncModel({ modelType: 4 })
          .then((res) => {
            const resData = res.data;
            if (resData.code === ResultEnum.SUCCESS) {
              createMessage.success(resData.msg);
            } else {
              createMessage.error(resData.msg);
            }
          })
          .finally(() => {
            dmnModelSyncLoading.value = false;
          });
      },
    });
  }
</script>

<style lang="less" scoped>
  .center-align {
    text-align: center;
  }
</style>
