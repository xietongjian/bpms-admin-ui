<template>
  <Page auto-content-height>
    <BasicTable @fetch-success="dataChangeEvent" @register="registerTodoTable">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'startPersonName'">
          <EmpInfo :no="record.startPersonCode" :name="record.startPersonName" />
        </template>

        <template v-if="column.key === 'duration'">
          {{ timeDurationFormatter(record.duration) }}
        </template>

        <template v-if="column.key === 'formName'">
          <Tooltip placement="top" title="流程图预览">
            <a>
              <PartitionOutlined
                @click="showFlowDiagram(record.processDefinitionKey, record.processInstanceId)"
                class="flow-diagram-icon mr-2 default-color0"
              />
            </a>
          </Tooltip>

          <!--          <router-link target="_blank" :to="genApproveUrl(record)" rel="opener">
            {{ record.formName }}
          </router-link>-->
          <TypographyLink @click="handleViewForm(record)">
            {{ record.formName }}
          </TypographyLink>
          <!--
          approve/:modelKey/:procInstId/:bizId/:taskId/:showPost
          -->
        </template>
      </template>
    </BasicTable>
    <BpmnPreviewModal ref="bpmnPreviewModalRef" @register="registerBpmnPreviewModal" />
    <ProcessFormModal ref="processFormModalRef" @register="registerProcessFormModal" @reload="reloadData" />
  </Page>
</template>
<script lang="ts" setup>
import {ref} from 'vue';
  import { useVbenVxeGrid } from '#/adapter/vxe-table';
  import type {VxeGridProps} from '#/adapter/vxe-table';
  import type {VbenFormProps} from '@vben/common-ui';
  import {Page, useVbenModal} from '@vben/common-ui';

  import { TypographyLink, Tooltip } from 'ant-design-vue';
  import { PartitionOutlined } from '@ant-design/icons-vue';
  // import BpmnPreviewModal from '@/views/components/preview/bpmnPreview/index.vue';
  import { todoTableSchema, searchFormSchema } from './data';
  import { getAppingTasksPagerModel, getApps } from '#/api/process/process';
  import { EmpInfo } from '#/views/components/EmpInfo';
  import { timeDurationFormatter } from '#/utils';
  //import { useProcessStore } from '@/store/modules/process';
  // import ProcessFormModal from '@/views/flowoperation/processTask/ProcessFormModal.vue';
import {listColumns} from "#/views/base/app/app.data";

/*  const [
    registerBpmnPreviewModal,
    { openModal: openBpmnPreviewModal, setModalProps: setBpmnPreviewProps },
  ] = useModal();
  const [
    registerProcessFormModal,
    { openModal: openProcessFormModal, setModalProps: setProcessFormModalProps },
  ] = useModal();*/


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

  function handleViewForm(record: Recordable) {
    record.allowsOperation = true;
    openProcessFormModal(true, {
      record,
    });
    setProcessFormModalProps({
      width: 1000,
      title: `查看流程【${record.formName}】的表单`,
      showOkBtn: false,
      centered: true,
      cancelText: '关闭',
      maskClosable: true,
    });
  }

  function showFlowDiagram(modelKey, procInstId) {
    openBpmnPreviewModal(true, {
      modelKey: modelKey,
      procInstId: !procInstId || procInstId === '0' ? '' : procInstId, // 参数空时传过来的是0
      isUpdate: true,
    });
    setBpmnPreviewProps({
      centered: true,
      useWrapper: false,
      showOkBtn: false,
      cancelText: '关闭',
    });
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
