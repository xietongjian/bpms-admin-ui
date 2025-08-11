<template>
  <Page auto-content-height>
    <BasicTable>
      <template #toolbar-tools>
        <Button type="primary" @click="handleCreate">新增</Button>
      </template>
      <template #action="{ row }">
        <TableAction :actions="createActions(row)"/>
      </template>
      <template #type="{ row }">
        <Tag v-if="row.type === 'sc'" color="#87d068">微服务</Tag>
        <Tag v-else color="#108ee9">RestFull</Tag>
      </template>
      <template #name="{ row }">
        {{row.name}}
      </template>
      <template #nameContent="{row}">
        <div class="bg-secondary p-2 m-2" >
          <Descriptions v-if="row.type === 'sc'" :title="null" size="small">
            <DescriptionsItem label="请求地址" :span="3">{{ row.url || '-' }}</DescriptionsItem>
            <DescriptionsItem label="请求方式">{{ row.method || '-' }}</DescriptionsItem>
            <DescriptionsItem label="Token名称">{{ row.tokenName || '-' }}</DescriptionsItem>
            <DescriptionsItem label="Token键名">{{ row.tokenKey || '-' }}</DescriptionsItem>
            <DescriptionsItem label="注册地址">{{ row.serverAddr || '-' }}</DescriptionsItem>
            <DescriptionsItem label="命名空间">{{ row.namespaceId || '-' }}</DescriptionsItem>
            <DescriptionsItem label="组名">{{ row.groupName || '-' }}</DescriptionsItem>
            <DescriptionsItem label="请求参数" :span="3">
              <pre>{{ JSON.stringify(JSON.parse(row.params), null, 2) || '{}' }}</pre>
            </DescriptionsItem>
            <DescriptionsItem label="备注" :span="3">
              {{ row.remark || '-' }}
            </DescriptionsItem>
          </Descriptions>
          <Descriptions v-else :title="null" size="small">
            <DescriptionsItem label="请求地址" :span="3">{{ row.url || '-' }}</DescriptionsItem>
            <DescriptionsItem label="请求方式">{{ row.method || '-' }}</DescriptionsItem>
            <DescriptionsItem label="Token名称">{{ row.tokenName || '-' }}</DescriptionsItem>
            <DescriptionsItem label="Token键名">{{ row.tokenKey || '-' }}</DescriptionsItem>
            <DescriptionsItem label="请求参数" :span="3">
              <pre>{{ JSON.stringify(JSON.parse(row.params), null, 2) || '{}' }}</pre>
            </DescriptionsItem>
            <DescriptionsItem label="备注" :span="3">
              {{ row.remark || '-' }}
            </DescriptionsItem>
          </Descriptions>
        </div>
      </template>
      <template #method="{row}">
        <Tag v-if="row.type === 'GET'" color="#108ee9">GET</Tag>
        <Tag v-else color="#87d068">POST</Tag>
      </template>
    </BasicTable>
    <BizTokenConfigDrawer ref="bizTokenConfigDrawerRef" @success="handleSuccess" />
  </Page>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { PerEnum } from '#/enums/perEnum';

  import type {VxeGridProps} from '#/adapter/vxe-table';
  import type {VbenFormProps} from '@vben/common-ui';
  import type {Recordable} from '@vben/types';

  import {Page} from '@vben/common-ui';
  import {Button, Tag, message, Descriptions} from 'ant-design-vue';
  import {useVbenVxeGrid} from '#/adapter/vxe-table';
  import {TableAction} from '#/components/table-action';

  import { getAll, deleteBusinessTokenById } from '#/api/base/bizTokenConfig';
  import { columns, searchFormSchema } from './bizTokenConfig.data';
  import BizTokenConfigDrawer from './BizTokenConfigDrawer.vue';

  const bizTokenConfigDrawerRef = ref();

  const expandedRows = ref([]);
  const DescriptionsItem = Descriptions.Item;
  const PerPrefix= 'BizTokenConfig:';
  const formOptions: VbenFormProps = {
    showCollapseButton: false,
    submitOnEnter: true,
    commonConfig: {
      labelWidth: 60,
    },
    wrapperClass: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    actionWrapperClass: 'pl-2 !justify-end md:!justify-start',
    actionPosition: 'left',
    actionLayout: 'inline',
    resetButtonOptions: {
      show: false,
    },
    schema: searchFormSchema,
    handleValuesChange: (values, fieldsChanged) => {
      if(fieldsChanged.includes('type')){
        tableApi.formApi.submitForm();
      }
    }
  };

  const gridOptions: VxeGridProps = {
    columns,
    columnConfig: {resizable: true},
    height: 'auto',
    keepSource: true,
    border: false,
    stripe: true,
    pagerConfig: {
      enabled: false,
    },
    rowConfig: {
      useKey: true,
      keyField: 'id',
    },
    expandConfig: {
      padding: false,
      trigger: 'row',
    },
    proxyConfig: {
      ajax: {
        query: async ({}, formValues) => {
          return getAll(formValues);
        },
      },
    },
  };

  const [BasicTable, tableApi] = useVbenVxeGrid({formOptions, gridOptions});

  function createActions(record: Recordable<any>) {
    return [
      {
        auth: [PerPrefix + PerEnum.UPDATE],
        tooltip: '修改',
        icon: 'clarity:note-edit-line',
        onClick: handleEdit.bind(null, record),
      },
      {
        auth: [PerPrefix + PerEnum.DELETE],
        tooltip: '删除',
        icon: 'ant-design:delete-outlined',
        danger: true,
        popConfirm: {
          placement: 'left',
          title: '是否确认删除',
          confirm: handleDelete.bind(null, record),
          okButtonProps: {
            danger: true
          }
        },
      },
    ];
  }

  async function handleCreate() {
    const { getValues } = tableApi.formApi;
    const value = await getValues();

    bizTokenConfigDrawerRef.value.setData(value);
    bizTokenConfigDrawerRef.value.setState();
    bizTokenConfigDrawerRef.value.open();

    expandedRows.value = tableApi.grid.getRowExpandRecords();
  }

  function handleEdit(record: Recordable<any>, e) {
    e.stopPropagation();

    bizTokenConfigDrawerRef.value.setData(record);
    bizTokenConfigDrawerRef.value.setState();
    bizTokenConfigDrawerRef.value.open();

    expandedRows.value = tableApi.grid.getRowExpandRecords();
  }

  async function handleDelete(record: Recordable<any>, e) {
    e.stopPropagation();
    const {success, msg} = await deleteBusinessTokenById({ id: record.id });
    if(success){
      tableApi.reload();
      message.success(msg)
    } else {
      message.error(msg)
    }
  }

  async function handleSuccess() {
    await tableApi.reload();
    if(expandedRows.value && expandedRows.value.length>0){
      await tableApi.grid.setRowExpand(expandedRows.value, true);

    }
  }
</script>
