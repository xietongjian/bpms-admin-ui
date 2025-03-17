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
      <template #processStatus="{row}">
        <ProcessStatus
            :status="row.processStatus"
            :statusName="row.processStatusName"
        />
      </template>
      <template #startPersonName="{row}">
        <EmpInfo :no="row.startPersonCode" :name="row.startPersonName"/>
      </template>

      <template #duration="{row}">
        {{ timeDurationFormatter(row.duration) }}
      </template>
    </BasicTable>
    <BpmnPreviewModal ref="bpmnPreviewModalRef"/>
    <ProcessFormPreviewDrawer ref="processFormPreviewDrawerRef"/>
  </Page>
</template>
<script lang="ts" setup>
import {ref, shallowRef} from 'vue';
import {useVbenVxeGrid} from '#/adapter/vxe-table';
import type {VxeGridProps} from '#/adapter/vxe-table';
import type {VbenFormProps} from '@vben/common-ui';
import type {Recordable} from '@vben/types';
import {Page} from '@vben/common-ui';

import {TypographyLink, Tooltip} from 'ant-design-vue';
import {PartitionOutlined} from '@ant-design/icons-vue';
import {todoTableColumns, searchFormSchema} from './data';
import {getAppingTasksPagerModel} from '#/api/process/process';
import {EmpInfo} from '#/views/components/EmpInfo';
import {ProcessStatus} from '#/views/components/common';
import {timeDurationFormatter} from '#/utils';
import {BpmnPreviewModal, ProcessFormPreviewDrawer} from '#/views/components/preview';

const bpmnPreviewModalRef = ref(),
  processFormPreviewDrawerRef = shallowRef();
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
  columns: todoTableColumns,
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

function handleViewForm(record: Recordable<any>) {
  processFormPreviewDrawerRef.value.setData({
    ...record,
    procInstId: record.processInstanceId,
    modelKey: record.processDefinitionKey,
    showOperation: true,
  });
  processFormPreviewDrawerRef.value.open();
  processFormPreviewDrawerRef.value.setState({title: `查看流程【${record.formName}】的表单`});
}

function handleBpmnPreview(modelKey, procInstId) {
  bpmnPreviewModalRef.value.setData({modelKey, procInstId});
  bpmnPreviewModalRef.value.open();
}
</script>
