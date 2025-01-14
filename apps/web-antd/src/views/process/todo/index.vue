<template>
  <Page auto-content-height>
    <BasicTable>
      <template #formName="{ row }">
        <Tooltip placement="top" title="流程图预览">
          <TypographyLink @click="handleBpmnPreview(row.processDefinitionKey, row.processInstanceId)">
            <PartitionOutlined class="mr-2"/>
          </TypographyLink>
        </Tooltip>
        <TypographyLink @click="handleViewForm(row)">
          {{ row.formName }}
        </TypographyLink>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'startPersonName'">
          <EmpInfo :no="record.startPersonCode" :name="record.startPersonName" />
        </template>

        <template v-if="column.key === 'duration'">
          {{ timeDurationFormatter(record.duration) }}
        </template>


      </template>
    </BasicTable>
    <BpmnPreviewModal ref="bpmnPreviewModalRef" />
<!--    <ProcessFormModal ref="processFormModalRef" @register="registerProcessFormModal" @reload="reloadData" />-->
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

  import { TypographyLink, Tooltip } from 'ant-design-vue';
  import { PartitionOutlined } from '@ant-design/icons-vue';
  import { todoTableSchema, searchFormSchema } from './data';
  import { getAppingTasksPagerModel, getApps } from '#/api/process/process';
  import { EmpInfo } from '#/views/components/EmpInfo';
  import { timeDurationFormatter } from '#/utils';
import {BpmnPreviewModal, ProcessFormPreviewDrawer} from '#/views/components/preview';

  //import { useProcessStore } from '@/store/modules/process';
  // import ProcessFormModal from '#/views/flowoperation/processTask/ProcessFormModal.vue';

/*  const [
    registerBpmnPreviewModal,
    { openModal: openBpmnPreviewModal, setModalProps: setBpmnPreviewProps },
  ] = useModal();
  const [
    registerProcessFormModal,
    { openModal: openProcessFormModal, setModalProps: setProcessFormModalProps },
  ] = useModal();*/

const bpmnPreviewModalRef = ref(),
    processFormPreviewDrawerRef = ref()
;
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

const gridOptions: VxeGridProps<any> = {
  checkboxConfig: {
    highlight: true,
    labelField: 'name',
  },
  columns: todoTableSchema,
  columnConfig: {resizable: true},
  height: 'auto',
  keepSource: true,
  border: false,
  stripe: true,
  proxyConfig: {
    ajax: {
      query: async ({page}, formValues) => {
        return await getAppingTasksPagerModel({
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


  /*useRequest(
    () => {
      reload();
      return Promise.resolve({});
    },
    {
      refreshOnWindowFocus: true,
      focusTimespan: 1000,
    },
  );*/

  function genApproveUrl(record) {
    let toUrl = `/process/approve/${record.processDefinitionKey || 0}/${record.processInstanceId || 0}/${record.businessKey || 0}/${record.taskId}/0`;
    if (record.processStatus === 'BH' && record.name === '提交人') {
      toUrl = `/process/launch/${record.processDefinitionKey || 0}/${record.processInstanceId || 0}/${record.businessKey || 0}/${record.taskId}/0`;
    }
    return toUrl;
  }

/*  getApps().then((res) => {
    const { updateSchema } = getForm();
    updateSchema({
      field: 'appSn',
      componentProps: { options: res },
    });
  });*/

  function handleViewForm(record: Recordable<any>) {
    processFormPreviewDrawerRef.value.setData({
      ...record,
      procInstId: record.processInstanceId,
      modelKey: record.processDefinitionKey,
      showOperation: true,
    });
    processFormPreviewDrawerRef.value.open();
    processFormPreviewDrawerRef.value.setState({title: `查看流程【${record.formName}】的表单`});

    /*openProcessFormModal(true, {
      record,
    });
    setProcessFormModalProps({
      width: 1000,
      title: `查看流程【${record.formName}】的表单`,
      showOkBtn: false,
      centered: true,
      cancelText: '关闭',
      maskClosable: true,
    });*/
  }

  function handleBpmnPreview(modelKey, procInstId) {
    bpmnPreviewModalRef.value.setData({modelKey, procInstId});
    bpmnPreviewModalRef.value.open();
  }

  function reloadData() {
    setTimeout(() => {
      reload();
    }, 200);
  }

  function dataChangeEvent() {
    //processStore.reloadTodoTaskCount();
  }
</script>
