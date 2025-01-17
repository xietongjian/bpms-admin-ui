<template>
  <Page auto-content-height>
    <BasicTable table-title="列表">
      <template #toolbar-tools>
        <Button @click="handleExport" type="primary">导出</Button>
      </template>
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
      <template #processStatus="{row}">
        <ProcessStatus
            :status="row.processStatus"
            :statusName="row.processStatusName"
        />
      </template>
      <template #currentAssignees="{ row }">
        <template v-if="row.currentAssignees && row.currentAssignees.length>0" >
          <template v-if="row.currentAssignees.length > 2">
            <Space>
              <template v-for="item in row.currentAssignees.slice(0, 2)" >
                <EmpInfo v-if="item.type === 'user'" :no="item.code" :name="item.name" />
                <Popover v-else :title="'角色信息'">
                  <template #content>
                    <div>名称：{{item.name}}</div>
                    <div>标识：{{item.code}}</div>
                  </template>
                  {{item.name}}
                </Popover>
              </template>
              <Popover >
                <template #content>
                  <template v-for="item in row.currentAssignees.slice(2, row.currentAssignees.length)" >
                    <EmpInfo v-if="item.type==='user'" :no="item.code" :name="item.name" />
                  </template>
                </template>
                <Badge :count="row.currentAssignees.length-2" :number-style="{ backgroundColor: '#52c41a' }" />
              </Popover>
            </Space>
          </template>
          <template v-else>
            <Space>
              <template v-for="item in row.currentAssignees" >
                <EmpInfo v-if="item.type === 'user'" :no="item.code" :name="item.name" />
                <Popover v-else :title="'角色信息'">
                  <template #content>
                    <div>名称：{{item.name}}</div>
                    <div>标识：{{item.code}}</div>
                  </template>
                  {{item.name}}
                </Popover>
              </template>
            </Space>
          </template>
        </template>
        <template v-else>
          -
        </template>
      </template>

      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'duration'">
          {{ timeDurationFormatter(record.duration) }}
        </template>
      </template>
    </BasicTable>
    <BpmnPreviewModal ref="bpmnPreviewModalRef" />
<!--    <ProcessFormModal
      @register="registerProcessFormModal"
      @visible-change="handleProcessFormVisibleChange"
    />-->
    <ProcessFormPreviewDrawer ref="processFormPreviewDrawerRef" />

    <ExportFormExcelModal
      @register="registerExportFormExcelModal"
    />
  </Page>
</template>
<script lang="ts" setup>
import {ref,h } from 'vue';
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import type {VxeGridProps} from '#/adapter/vxe-table';
import type {VbenFormProps} from '@vben/common-ui';
import {Page, useVbenModal} from '@vben/common-ui';
import type {Recordable} from '@vben/types';

  import {Space, Button, Badge, Popover, Tooltip, TypographyLink} from 'ant-design-vue';
  import {DownloadOutlined, PartitionOutlined} from '@ant-design/icons-vue';
import {BpmnPreviewModal, ProcessFormPreviewDrawer} from '#/views/components/preview';

// import BpmnPreviewModal from '#/views/components/preview/bpmnPreview/index.vue';
  import { launchedTableColumns, searchFormSchema } from './data';
  import {findMyProcessinstancesPagerModel, getApps} from "#/api/process/process";
  import { EmpInfo } from '#/views/components/EmpInfo';
  // import {timeDurationFormatter} from "@/utils";
  // import { useRequest } from '@vben/hooks';
  // import ProcessFormModal from '#/views/flowoperation/processTask/ProcessFormModal.vue';
  // import {downloadBlob, downloadByOnlineUrl} from "@/utils/file/download";
  // import {exportExcel} from "#/api/report/nodeCount";
  // import ExportFormExcelModal from "./ExportFormExcelModal.vue";
import {getAppingTasksPagerModel} from "#/api/process/process";
import {ProcessStatus} from "#/views/components/common";

 /* const [registerBpmnPreviewModal, { openModal: openBpmnPreviewModal, setModalProps: setBpmnPreviewProps }] = useModal();
  const [
    registerExportFormExcelModal,
    {
      closeModal: closeExportFormExcelModal,
      openModal: openExportFormExcelModal,
      setModalProps: setExportFormExcelModalProps,
    },
  ] = useModal();

  const [
    registerProcessFormModal,
    { openModal: openProcessFormModal, setModalProps: setProcessFormModalProps },
  ] = useModal();*/

  /*const [registerLaunchedTable, { reload, getForm }] = useTable({
    api: findMyProcessinstancesPagerModel,
    title: '',
    columns: launchedTableColumns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
      showAdvancedButton: false,
      showResetButton: false,
      autoSubmitOnEnter: true,
    },
    useSearchForm: true,
    showIndexColumn: true,
    immediate: false
  });*/
const bpmnPreviewModalRef = ref(),
    processFormPreviewDrawerRef = ref();


const formOptions: VbenFormProps = {
  showCollapseButton: false,
  submitOnEnter: true,
  commonConfig: {
    labelWidth: 60,
  },
  fieldMappingTime: [['dateRange', ['startTime', 'endTime'], 'YYYY-MM-DD']],
  wrapperClass: 'grid-cols-1 md:grid-cols-3 lg:grid-cols-4',
  resetButtonOptions: {
    show: true,
  },
  schema: searchFormSchema,
};

const gridOptions: VxeGridProps = {
  checkboxConfig: {
    highlight: true,
    labelField: 'name',
  },
  columns: launchedTableColumns,
  columnConfig: {resizable: true},
  height: 'auto',
  keepSource: true,
  border: false,
  stripe: true,
  proxyConfig: {
    ajax: {
      query: async ({page}, formValues) => {
        return await findMyProcessinstancesPagerModel({
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


/*useRequest(()=>{
    reload();
    return Promise.resolve({});
  }, {
    refreshOnWindowFocus: true,
  });*/

/*  getApps().then(res=>{
    const {updateSchema} = getForm();
    updateSchema({
      field: 'appSn',
      componentProps: { options: res },
    });
  });*/

  function handleExport() {
    openExportFormExcelModal(true, {

    });
    setExportFormExcelModalProps({
      width: 900,
      okText: '导出数据',
      okButtonProps: {
        icon: h(DownloadOutlined),
      },
    });
    /*exportExcel(values)
      .then((res) => {
        downloadBlob(res, '人员节点统计.xlsx');
      })
      .finally(() => {
        setTimeout(() => {
          closeFullLoading();
        }, 500);
      });*/
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


function handleBpmnPreview(modelKey: string, procInstId: string) {
  bpmnPreviewModalRef.value.setData({modelKey, procInstId});
  bpmnPreviewModalRef.value.open();
}

</script>
<style lang="scss">
  //@import '../index.scss';
</style>
