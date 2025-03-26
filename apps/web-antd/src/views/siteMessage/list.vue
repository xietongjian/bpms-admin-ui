<template>
  <Page auto-content-height>
    <BasicTable>
      <template #formName="{ row }">
        <Tooltip v-if="row.status === 0">
          <template #title>
            未读
          </template>
          <Badge color="#f50"/>
        </Tooltip>
        <Tooltip placement="top" title="流程图预览">
          <TypographyLink
            @click="handleBpmnPreview(row.processDefinitionKey, row.processInstanceId)">
            <PartitionOutlined class="mr-2"/>
          </TypographyLink>
        </Tooltip>
        <TypographyLink @click="handleViewForm(row)">
          {{ row.title }}
        </TypographyLink>
      </template>
      <template #startPersonName="{row}">
        <EmpInfo :no="row.fromAssignee" :name="row.fromAssigneeName"/>
      </template>
    </BasicTable>
    <BpmnPreviewModal ref="bpmnPreviewModalRef"/>
    <ProcessFormPreviewDrawer ref="processFormPreviewDrawerRef" @onClose="handleProcessFormVisibleChange"/>
  </Page>
</template>
<script lang="ts" setup>
import {ref, shallowRef} from 'vue';

import type {VxeGridProps} from '#/adapter/vxe-table';
import type {VbenFormProps} from '@vben/common-ui';
import type {Recordable} from '@vben/types';

import {Page} from '@vben/common-ui';

import {Badge, Tooltip, TypographyLink, TypographyText} from 'ant-design-vue';
import {messageTableSchema, searchFormSchema} from "./data";
import {pagerModelOnSiteMessage, updateOnSiteMessageStatus} from "#/api/process/siteMessage";
import {EmpInfo} from '#/views/components/EmpInfo';
import {useVbenVxeGrid} from "#/adapter/vxe-table";
import {BpmnPreviewModal, ProcessFormPreviewDrawer} from '#/views/components/preview';
import {PartitionOutlined} from "@ant-design/icons-vue";

const bpmnPreviewModalRef = ref(),
  processFormPreviewDrawerRef = shallowRef();

const formOptions: VbenFormProps = {
  showCollapseButton: false,
  submitOnEnter: true,
  submitOnChange: true,
  commonConfig: {
    labelWidth: 60,
  },
  actionWrapperClass: 'col-span-1 col-start-3 text-left ml-2',
  schema: searchFormSchema,
  wrapperClass: 'grid-cols-1 md:grid-cols-3 lg:grid-cols-4',
};

const gridOptions: VxeGridProps<any> = {
  checkboxConfig: {
    highlight: true,
    labelField: 'name',
  },
  columns: messageTableSchema,
  columnConfig: {resizable: true},
  height: 'auto',
  keepSource: true,
  border: false,
  stripe: true,
  proxyConfig: {
    ajax: {
      query: async ({page}, formValues) => {
        return await pagerModelOnSiteMessage({
          query: {
            pageNum: page.currentPage,
            pageSize: page.pageSize,
          },
          entity: formValues || {},
        }).then(res => {
          return Promise.resolve(res);
        });
      },
    },
  },
};

const [BasicTable, tableApi] = useVbenVxeGrid({formOptions, gridOptions});

function handleProcessFormVisibleChange() {
  setTimeout(() => {
    tableApi.reload();
  }, 2);
}

function handleViewForm(record: Recordable<any>) {
  processFormPreviewDrawerRef.value.setData({
    ...record,
    procInstId: record.processInstanceId,
    modelKey: record.processDefinitionKey,
    showOperation: true,
  });
  processFormPreviewDrawerRef.value.open();
  processFormPreviewDrawerRef.value.setState({title: `查看流程【${record.title}】的表单`});
}

function handleBpmnPreview(modelKey, procInstId) {
  bpmnPreviewModalRef.value.setData({modelKey, procInstId});
  bpmnPreviewModalRef.value.open();
}
</script>
