<template>
  <Page auto-content-height>
    <BasicTable @fetch-success="dataChangeEvent" @register="registerLaunchedTable" >
      <template #toolbar>
        <Button @click="handleExport" type="primary">导出</Button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'formName'">
          <Tooltip placement="top" title="流程图预览">
            <a>
              <PartitionOutlined @click="showFlowDiagram(record.processDefinitionKey, record.processInstanceId)" class="flow-diagram-icon mr-2"/>
            </a>
          </Tooltip>
          <TypographyLink @click="handleViewForm(record)">
            {{record.formName}}
          </TypographyLink>
        </template>

        <template v-if="column.key === 'duration'">
          {{ timeDurationFormatter(record.duration) }}
        </template>

        <template v-else-if="column.key === 'currentAssignees'">
          <template v-if="record.currentAssignees && record.currentAssignees.length>0" >
            <template v-if="record.currentAssignees.length > 2">
              <Space>
                <template v-for="item in record.currentAssignees.slice(0, 2)" >
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
                    <template v-for="item in record.currentAssignees.slice(2, record.currentAssignees.length)" >
                      <EmpInfo v-if="item.type==='user'" :no="item.code" :name="item.name" />
                    </template>
                  </template>
                  <Badge :count="record.currentAssignees.length-2" :number-style="{ backgroundColor: '#52c41a' }" />
                </Popover>
              </Space>
            </template>
            <template v-else>
              <Space>
                <template v-for="item in record.currentAssignees" >
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
      </template>
    </BasicTable>
    <BpmnPreviewModal @register="registerBpmnPreviewModal" />
    <ProcessFormModal
      @register="registerProcessFormModal"
      @visible-change="handleProcessFormVisibleChange"
    />
    <ExportFormExcelModal
      @register="registerExportFormExcelModal"
    />
  </Page>
</template>
<script lang="ts" setup>
import {ref} from 'vue';
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import type {VxeGridProps} from '#/adapter/vxe-table';
import type {VbenFormProps} from '@vben/common-ui';
import {Page, useVbenModal} from '@vben/common-ui';
  import {Space, Button, Badge, Popover, Tooltip, TypographyLink} from 'ant-design-vue';
  import {DownloadOutlined, PartitionOutlined} from '@ant-design/icons-vue';
  // import BpmnPreviewModal from '@/views/components/preview/bpmnPreview/index.vue';
  import { launchedTableSchema, searchFormSchema } from './data';
  import {findMyProcessinstancesPagerModel, getApps} from "#/api/process/process";
  import { EmpInfo } from '#/views/components/EmpInfo';
  // import {timeDurationFormatter} from "@/utils";
  // import { useRequest } from '@vben/hooks';
  // import ProcessFormModal from '@/views/flowoperation/processTask/ProcessFormModal.vue';
  // import {downloadBlob, downloadByOnlineUrl} from "@/utils/file/download";
  // import {exportExcel} from "#/api/report/nodeCount";
  // import ExportFormExcelModal from "./ExportFormExcelModal.vue";
  import {h} from "vue";
import {todoTableSchema} from "#/views/process/todo/data";
import {getAppingTasksPagerModel} from "#/api/process/process";

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
    columns: launchedTableSchema,
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


const formOptions: VbenFormProps = {
  showCollapseButton: false,
  submitOnEnter: true,
  commonConfig: {
    labelWidth: 60,
  },
  actionWrapperClass: 'col-span-2 col-start-2 text-left ml-4',
  resetButtonOptions: {
    show: false,
  },
  schema: searchFormSchema,
};

const gridOptions: VxeGridProps<any> = {
  checkboxConfig: {
    highlight: true,
    labelField: 'name',
  },
  columns: launchedTableSchema,
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
