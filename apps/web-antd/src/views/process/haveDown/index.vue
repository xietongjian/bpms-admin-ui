<template>
  <Page auto-content-height>
    <BasicTable @fetch-success="dataChangeEvent" @register="registerHaveDownTable" >
      <template #formName="{ row }">
        <Tooltip placement="top" title="流程图预览">
          <TypographyLink @click="handleBpmnPreview(row.processDefinitionKey, row.processInstanceId)">
            <PartitionOutlined class="mr-2"/>
          </TypographyLink>
        </Tooltip>
        <TypographyLink @click="handleViewForm(row)">
          {{row.formName}}
        </TypographyLink>
      </template>
      <template #formName="{ row }">
        <Tooltip placement="top" title="流程图预览">
          <a>
            <PartitionOutlined @click="showFlowDiagram(row.processDefinitionKey, row.processInstanceId)" class="flow-diagram-icon mr-2"/>
          </a>
        </Tooltip>
        <TypographyLink @click="handleViewForm(row)">
          {{ row.formName }}
        </TypographyLink>
      </template>
      <template #startPersonName="{ row }">
        <EmpInfo :no="row.startPersonCode" :name="row.startPersonName" />
      </template>
      <template #duration="{ row }">
        {{ timeDurationFormatter(row.duration) }}
      </template>
    </BasicTable>
    <BpmnPreviewModal ref="bpmnPreviewModalRef" />
    <ProcessFormModal
      @register="registerProcessFormModal"
      @visible-change="handleProcessFormVisibleChange"
    />
  </Page>
</template>
<script lang="ts" setup>

import {ref} from 'vue';
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import type {VxeGridProps} from '#/adapter/vxe-table';
import type {VbenFormProps} from '@vben/common-ui';
import {Page} from '@vben/common-ui';
  // import { BasicTable, useTable } from '@/components/Table';
  import {TypographyLink, Tooltip} from 'ant-design-vue';
  import {PartitionOutlined} from '@ant-design/icons-vue';
import {BpmnPreviewModal} from '#/views/components/preview';
  import { haveDownTableSchema, searchFormSchema } from './data';
  import {getApplyedTasksPagerModel, getApps} from "#/api/process/process";
  // import { useModal } from '@/components/Modal';
  import {EmpInfo} from '#/views/components/EmpInfo';
  // import {timeDurationFormatter} from "@/utils";
  // import { useProcessStore } from '@/store/modules/process';
  // import { useRequest } from '@vben/hooks';
  // import ProcessFormModal from '@/views/flowoperation/processTask/ProcessFormModal.vue';

  // const processStore = useProcessStore();

  // const [registerBpmnPreviewModal, { openModal: openBpmnPreviewModal, setModalProps: setBpmnPreviewProps }] = useModal();
/*  const [
    registerProcessFormModal,
    { openModal: openProcessFormModal, setModalProps: setProcessFormModalProps },
  ] = useModal();*/
  /*const [registerHaveDownTable, {reload, getForm }] = useTable({
    api: getApplyedTasksPagerModel,
    title: '',
    columns: haveDownTableSchema,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
      showAdvancedButton: false,
      showResetButton: false,
      autoSubmitOnEnter: true,
    },
    useSearchForm: true,
    showIndexColumn: true,
    immediate: false,
  });*/

/*  useRequest(()=>{
    reload();
    return Promise.resolve({});
  }, {
    refreshOnWindowFocus: true,
  });

  getApps().then(res=>{
    const {updateSchema} = getForm();
    updateSchema({
      field: 'appSn',
      componentProps: { options: res },
    })
  })*/

const bpmnPreviewModalRef = ref();


const formOptions: VbenFormProps = {
  showCollapseButton: false,
  submitOnEnter: true,
  commonConfig: {
    labelWidth: 60,
  },
  wrapperClass: 'grid-cols-1 md:grid-cols-3 lg:grid-cols-4',
  resetButtonOptions: {
    show: true,
  },
  schema: searchFormSchema,
};

const gridOptions: VxeGridProps<any> = {
  checkboxConfig: {
    highlight: true,
    labelField: 'name',
  },
  columns: haveDownTableSchema,
  columnConfig: {resizable: true},
  height: 'auto',
  keepSource: true,
  border: false,
  stripe: true,
  proxyConfig: {
    ajax: {
      query: async ({page}, formValues) => {
        return await getApplyedTasksPagerModel({
          query: {
            pageNum: page.currentPage,
            pageSize: page.pageSize,
          },
          entity: formValues || {},
        });
      },
    },
  },
};

const [BasicTable, tableApi] = useVbenVxeGrid({formOptions, gridOptions});

function handleBpmnPreview(modelKey, procInstId) {
  bpmnPreviewModalRef.value.setData({modelKey, procInstId});
  bpmnPreviewModalRef.value.open();
}

  function handleViewForm(record: Recordable) {
    openProcessFormModal(true, {
      record,
    });
    setProcessFormModalProps({
      width: 1000,
      title: `查看流程【${record.formName}】的表单`,
      showOkBtn: false,
      centered: true,
      cancelText: '关闭',
      maskClosable: false,
    });
  }

  function handleProcessFormVisibleChange(visible) {
    if (!visible) {
      setTimeout(() => {
        reload();
      }, 200);
    }
  }

  function showFlowDiagram(modelKey, procInstId){
    openBpmnPreviewModal(true, {
      modelKey: modelKey,
      procInstId: (!procInstId||procInstId==='0')?'':procInstId,    // 参数空时传过来的是0
      isUpdate: true,
    });
    setBpmnPreviewProps({
      centered: true,
      useWrapper: false,
      showOkBtn: false,
      cancelText: '关闭',
    });
  }

  function reloadData(){
    reload();
  }

  function dataChangeEvent(){
    // processStore.reloadTodoTaskCount();
  }
</script>
<style lang="less">
  @import '../index.less';
</style>
