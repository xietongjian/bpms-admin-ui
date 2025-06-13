<template>
  <Page auto-content-height title="数据清理" contentFullHeight>
    <Alert type="warning" show-icon>
      <template #icon>
        <HeatMapOutlined style="color: orangered"/>
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

    <Card class="mt-4" title="通过业务表单Key清理">
      <BizKeyForm/>
      <div class="p-4 pl-[150px] pt-0">
        <Button v-access:code="PerPrefix+PerEnum.UPDATE" :loading="cleanByBizKeyLoading" danger
                @click="handleCleanByBizKey"
        >开始清理
        </Button
        >
      </div>
    </Card>

    <Card class="mt-4" title="通过流程ProcInstId清理">
      <ProcInstIdForm />
      <div class="p-4 pl-[150px] pt-0">
        <Button v-access:code="PerPrefix+PerEnum.UPDATE"
                :loading="cleanByProcInstIdLoading"
                danger
                @click="handleCleanByProcInstId"
        >开始清理
        </Button
        >
      </div>
    </Card>

    <Card class="mt-4" title="通过流程ModelKey清理">
      <ModelKeyForm />
      <div class="p-4 pl-[150px] pt-0">
        <Button v-access:code="PerPrefix+PerEnum.UPDATE" :loading="cleanByModelKeyLoading" danger
                @click="handleCleanByModelKey"
        >开始清理
        </Button
        >
      </div>
    </Card>

    <Card class="mt-4" title="通过流程ModelKey删除流程模板">
      <DeleteModelByModelKeyForm />
      <div class="p-4 pl-[150px] pt-0">
        <Button v-access:code="PerPrefix+PerEnum.UPDATE" :loading="deleteModelByModelKeyLoading"
                danger @click="handleDeleteModelByModelKey"
        >开始删除
        </Button
        >
      </div>
    </Card>

    <Card class="mt-4" title="模型同步">
      <!--      <BasicForm @register="registerModelSyncForm" />-->
      <div class="p-4 pl-[150px] pt-0">
        <Space>
          <Button v-access:code="PerPrefix+PerEnum.UPDATE" :loading="bpmnModelSyncLoading" danger
                  @click="handleBpmnModelSync"
          >同步BPMN
          </Button
          >
          <Button v-access:code="PerPrefix+PerEnum.UPDATE" :loading="dmnModelSyncLoading" danger
                  @click="handleDmnModelSync"
          >同步DMN
          </Button
          >
        </Space>
      </div>
    </Card>
  </Page>
</template>
<script lang="ts" setup>
import {ref, onMounted} from 'vue';
import {
  bizKeyFormSchema,
  procInstIdFormSchema,
  modelKeyFormSchema,
  deleteModelByModelKeyFormSchema
} from './dataClean.data';
import {Alert, Button, Space, message, Card, Modal, Collapse} from 'ant-design-vue';
import {Page} from '@vben/common-ui';
import {useVbenForm} from '#/adapter/form';

import {
  cleanByBizKeys,
  cleanByModelKeys,
  cleanByProcInstIds, deleteModelByModelKey,
  syncModel,
} from '#/api/flowoperation/dataClean';
import {HeatMapOutlined} from '@ant-design/icons-vue';

import {PerEnum} from '#/enums/perEnum';

const PerPrefix = 'DataClean:';

const cleanByBizKeyLoading = ref<boolean>(false);
const cleanByProcInstIdLoading = ref<boolean>(false);
const cleanByModelKeyLoading = ref<boolean>(false);
const deleteModelByModelKeyLoading = ref<boolean>(false);
const bpmnModelSyncLoading = ref<boolean>(false);
const dmnModelSyncLoading = ref<boolean>(false);


const [BizKeyForm, bizKeyFormApi] = useVbenForm({
  commonConfig: {
    componentProps: {
      // class: 'w-full',
    },
    labelWidth: 140
  },
  showDefaultActions: false,
  layout: 'horizontal',
  schema: bizKeyFormSchema,
  wrapperClass: 'grid-cols-1',
});

const [ProcInstIdForm, procInstIdFormApi] = useVbenForm({
  commonConfig: {
    componentProps: {
      // class: 'w-full',
    },
    labelWidth: 140
  },
  showDefaultActions: false,
  layout: 'horizontal',
  schema: procInstIdFormSchema,
  wrapperClass: 'grid-cols-1',
});

const [ModelKeyForm, modelKeyFormApi] = useVbenForm({
  commonConfig: {
    componentProps: {
      // class: 'w-full',
    },
    labelWidth: 140
  },
  showDefaultActions: false,
  layout: 'horizontal',
  schema: modelKeyFormSchema,
  wrapperClass: 'grid-cols-1',
});

const [DeleteModelByModelKeyForm, deleteModelByModelKeyFormApi] = useVbenForm({
  commonConfig: {
    componentProps: {
      // class: 'w-full',
    },
    labelWidth: 140
  },
  showDefaultActions: false,
  layout: 'horizontal',
  schema: deleteModelByModelKeyFormSchema,
  wrapperClass: 'grid-cols-1',
});

onMounted(() => {
  /*getEnv().then(res=>{
  currentEnv.value = res;
});*/
});

async function handleCleanByBizKey() {
  const {valid} = await bizKeyFormApi.validate();
  if (!valid) {
    return;
  }

  const values = await bizKeyFormApi.getValues();
  Modal.confirm({
    iconType: 'warning',
    title: '提示',
    content: '数据清理为不可逆操作，确定要执行吗？',
    okButtonProps: {
      danger: true,
    },
    onOk: async () => {
      cleanByBizKeyLoading.value = true;
      try {
        const {success, msg} = await cleanByBizKeys(values);
        if (success) {
          message.success(msg);
        } else {
          message.error(msg);
        }
      } finally {
        cleanByBizKeyLoading.value = false;
      }
    },
  });
}

async function handleCleanByProcInstId() {

  const {valid} = await procInstIdFormApi.validate();
  if (!valid) {
    return;
  }
  const values = await procInstIdFormApi.getValues();
  Modal.confirm({
    iconType: 'warning',
    title: '提示',
    content: '数据清理为不可逆操作，确定要执行吗？',
    okButtonProps: {
      danger: true,
    },
    onOk: async () => {
      cleanByProcInstIdLoading.value = true;
      try {
        const {success, msg} = await cleanByProcInstIds(values);
        if (success) {
          message.success(msg);
        } else {
          message.error(msg);
        }
      } finally {
        cleanByProcInstIdLoading.value = false;
      }
    },
  });
}

async function handleCleanByModelKey() {
  const {valid} = await modelKeyFormApi.validate();
  if (!valid) {
    return;
  }
  const values = await modelKeyFormApi.getValues();
  Modal.confirm({
    iconType: 'warning',
    title: '提示',
    content: '数据清理为不可逆操作，确定要执行吗？',
    okButtonProps: {
      danger: true,
    },
    onOk: async () => {
      cleanByModelKeyLoading.value = true;
      try {
        const {success, msg} = await cleanByModelKeys(values);
        if (success) {
          message.success(msg);
        } else {
          message.error(msg);
        }
      } finally {
        cleanByModelKeyLoading.value = false;
      }
    },
  });
}

async function handleDeleteModelByModelKey() {
  const {valid} = await deleteModelByModelKeyFormApi.validate();
  if (!valid) {
    return;
  }
  const values = await deleteModelByModelKeyFormApi.getValues();

  Modal.confirm({
    iconType: 'warning',
    title: '提示',
    content: '删除流程模板，将同时删除该模板的所有数据，为不可逆操作，确定要执行吗？',
    okButtonProps: {
      danger: true,
    },
    onOk: async () => {
      deleteModelByModelKeyLoading.value = true;
      if (values.modelKeys) {
        values.modelKeys.split(',');
      }
      try {
        const {success, msg} = await deleteModelByModelKey(values);
        if (success) {
          message.success(msg);
        } else {
          message.error(msg);
        }
      } finally {
        deleteModelByModelKeyLoading.value = false;
      }
    },
  });
}

async function handleBpmnModelSync() {
  // const values = await validateModelKeyForm();
  Modal.confirm({
    iconType: 'warning',
    title: '提示',
    content: '同步Bpmn模板，确定要执行吗？',
    okButtonProps: {
      danger: true,
    },
    onOk: async () => {
      bpmnModelSyncLoading.value = true;
      try {
        const {success, msg} = await syncModel({modelType: 0});
        if (success) {
          message.success(msg);
        } else {
          message.error(msg);
        }
      } finally {
        bpmnModelSyncLoading.value = false;
      }
    },
  });
}

async function handleDmnModelSync() {
  Modal.confirm({
    iconType: 'warning',
    title: '提示',
    content: '同步Dmn模板，确定要执行吗？',
    okButtonProps: {
      danger: true,
    },
    onOk: async () => {
      dmnModelSyncLoading.value = true;
      try {
        const {success, msg} = await syncModel({modelType: 4});
        if (success) {
          message.success(msg);
        } else {
          message.error(msg);
        }
      } finally {
        dmnModelSyncLoading.value = false;
      }
    },
  });
}
</script>
