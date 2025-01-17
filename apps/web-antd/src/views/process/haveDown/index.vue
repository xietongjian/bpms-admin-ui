<template>
  <Page auto-content-height>
    <BasicTable >
      <template #formName="{ row }">
        <Tooltip placement="top" title="流程图预览">
          <TypographyLink @click="handleBpmnPreview(row.processDefinitionKey, row.processInstanceId)">
            <PartitionOutlined class="mr-2"/>
          </TypographyLink>
        </Tooltip>
        <TypographyLink @click="handleViewForm(row)">
          {{row.name}}
        </TypographyLink>
      </template>
      <template #processStatus="{row}">
        <ProcessStatus
            :status="row.processStatus"
            :statusName="row.processStatusName"
        />
      </template>
      <template #startPersonName="{ row }">
        <EmpInfo :no="row.startPersonCode" :name="row.startPersonName" />
      </template>
      <template #duration="{ row }">
        {{ timeDurationFormatter(row.duration) }}
      </template>
    </BasicTable>
    <BpmnPreviewModal ref="bpmnPreviewModalRef" />
<!--    <ProcessFormModal
      @register="registerProcessFormModal"
      @visible-change="handleProcessFormVisibleChange"
    />-->
    <ProcessFormPreviewDrawer ref="processFormPreviewDrawerRef" />

  </Page>
</template>
<script lang="ts" setup>

import {ref} from 'vue';
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import type {VxeGridProps} from '#/adapter/vxe-table';
import type {VbenFormProps} from '@vben/common-ui';
import type {Recordable} from '@vben/types';

import {Page} from '@vben/common-ui';
  // import { BasicTable, useTable } from '@/components/Table';
  import {TypographyLink, Tooltip} from 'ant-design-vue';
  import {PartitionOutlined} from '@ant-design/icons-vue';
import {BpmnPreviewModal, ProcessFormPreviewDrawer} from '#/views/components/preview';
  import { haveDownTableColumns, searchFormSchema } from './data';
  import {getApplyedTasksPagerModel} from "#/api/process/process";
  // import { useModal } from '@/components/Modal';
  import {EmpInfo} from '#/views/components/EmpInfo';
import {ProcessStatus} from "#/views/components/common";
  // import {timeDurationFormatter} from "@/utils";
  // import { useProcessStore } from '@/store/modules/process';
  // import { useRequest } from '@vben/hooks';
  // import ProcessFormModal from '#/views/flowoperation/processTask/ProcessFormModal.vue';

  // const processStore = useProcessStore();

  // const [registerBpmnPreviewModal, { openModal: openBpmnPreviewModal, setModalProps: setBpmnPreviewProps }] = useModal();
/*  const [
    registerProcessFormModal,
    { openModal: openProcessFormModal, setModalProps: setProcessFormModalProps },
  ] = useModal();*/
  /*const [registerHaveDownTable, {reload, getForm }] = useTable({
    api: getApplyedTasksPagerModel,
    title: '',
    columns: haveDownTableColumns,
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

const bpmnPreviewModalRef = ref(),
    processFormPreviewDrawerRef = ref();


const formOptions: VbenFormProps = {
  showCollapseButton: false,
  submitOnEnter: true,
  fieldMappingTime: [['dateRange', ['startTime', 'endTime'], 'YYYY-MM-DD']],
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
  columns: haveDownTableColumns,
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

function handleBpmnPreview(modelKey: string, procInstId: string) {
  bpmnPreviewModalRef.value.setData({modelKey, procInstId});
  bpmnPreviewModalRef.value.open();
}

  function handleViewForm(record: Recordable<any>) {
    processFormPreviewDrawerRef.value.setData({
      ...record,
      procInstId: record.processInstanceId,
      modelKey: record.processDefinitionKey,
    });
    processFormPreviewDrawerRef.value.open();
    processFormPreviewDrawerRef.value.setState({title: `查看流程【${record.formName}】的表单`});
  }

</script>
<style lang="scss">
  //@import '../index.scss';
</style>
