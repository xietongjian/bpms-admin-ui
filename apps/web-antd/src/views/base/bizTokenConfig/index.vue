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
      <template #method="{row}">
        <Tag v-if="row.type === 'GET'" color="#108ee9">GET</Tag>
        <Tag v-else color="#87d068">POST</Tag>
      </template>

      <template #expandedRowRender="{ record }">
        <div v-if="record.type === 'sc'">
          <Descriptions :title="null" size="small">
            <DescriptionsItem label="请求地址" :span="3">{{ record.url || '-' }}</DescriptionsItem>
            <DescriptionsItem label="请求方式">{{ record.method || '-' }}</DescriptionsItem>
            <DescriptionsItem label="Token名称">{{ record.tokenName || '-' }}</DescriptionsItem>
            <DescriptionsItem label="Token键名">{{ record.tokenKey || '-' }}</DescriptionsItem>
            <DescriptionsItem label="注册地址">{{ record.serverAddr || '-' }}</DescriptionsItem>
            <DescriptionsItem label="命名空间">{{ record.namespaceId || '-' }}</DescriptionsItem>
            <DescriptionsItem label="组名">{{ record.groupName || '-' }}</DescriptionsItem>
            <DescriptionsItem label="请求参数" :span="3">
              {{ record.params || '{}' }}
            </DescriptionsItem>
            <DescriptionsItem label="备注" :span="3">
              {{ record.remark || '-' }}
            </DescriptionsItem>
          </Descriptions>
        </div>
        <div v-else>
          <Descriptions :title="null" size="small">
            <DescriptionsItem label="请求地址" :span="3">{{ record.url || '-' }}</DescriptionsItem>
            <DescriptionsItem label="请求方式">{{ record.method || '-' }}</DescriptionsItem>
            <DescriptionsItem label="Token名称">{{ record.tokenName || '-' }}</DescriptionsItem>
            <DescriptionsItem label="Token键名">{{ record.tokenKey || '-' }}</DescriptionsItem>
            <DescriptionsItem label="请求参数" :span="3">
              {{ record.params || '{}' }}
            </DescriptionsItem>
            <DescriptionsItem label="备注" :span="3">
              {{ record.remark || '-' }}
            </DescriptionsItem>
          </Descriptions>
        </div>
      </template>
    </BasicTable>
    <BizTokenConfigDrawer ref="bizTokenConfigDrawerRef" @register="registerDrawer" @success="handleSuccess" />
  </Page>
</template>
<script lang="ts" setup>
  import { onMounted } from 'vue';
  import { PerEnum } from '#/enums/perEnum';

  import type {VxeGridProps} from '#/adapter/vxe-table';
  import type {VbenFormProps} from '@vben/common-ui';
  import type {Recordable} from '@vben/types';

  import {Page} from '@vben/common-ui';
  import {Button, Space, Image, Tag, message} from 'ant-design-vue';
  import {useVbenVxeGrid} from '#/adapter/vxe-table';
  import {TableAction} from '#/components/table-action';

  import { getAll, deleteBusinessTokenById } from '#/api/base/bizTokenConfig';
  import { columns, searchFormSchema } from './bizTokenConfig.data';
  import BizTokenConfigDrawer from './BizTokenConfigDrawer.vue';
  import { Tag, Descriptions } from 'ant-design-vue';


  const DescriptionsItem = Descriptions.Item;
  const PerPrefix= 'BizTokenConfig:';
  const formOptions: VbenFormProps = {
    showCollapseButton: false,
    submitOnEnter: true,
    commonConfig: {
      labelWidth: 60,
    },
    wrapperClass: 'grid-cols-1 md:grid-cols-3 lg:grid-cols-4',
    resetButtonOptions: {
      show: false,
    },
    schema: searchFormSchema,
  };

  const gridOptions: VxeGridProps<any> = {
    columns,
    columnConfig: {resizable: true},
    height: 'auto',
    keepSource: true,
    border: false,
    stripe: true,
    proxyConfig: {
      ajax: {
        query: async ({page}, formValues) => {
          return getAll({
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

  function createActions(row: Recordable<any>) {
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
  /*const [registerDrawer, { openDrawer, setDrawerProps }] = useDrawer();

  const [registerTable, { reload, getForm }] = useTable({
    title: '列表',
    api: getAll,
    columns,
    expandRowByClick: true,
    formConfig: {
      labelWidth: 100,
      schemas: searchFormSchema,
      showAdvancedButton: false,
      showResetButton: false,
      showSubmitButton: true,
      autoSubmitOnEnter: false,
    },
    pagination: false,
    canColDrag: true,
    useSearchForm: true,
    bordered: true,
    showIndexColumn: true,
    actionColumn: {
      width: 140,
      title: '操作',
      dataIndex: 'action',
    },
  });
*/
  onMounted(() => {
    // const {updateSchema, getFieldsValue} = getForm();
  });

  function handleCreate() {
    const { getFieldsValue } = getForm();
    const value = getFieldsValue();
    openDrawer(true, {
      isUpdate: false,
      record: value,
    });
    setDrawerProps({
      // centered: true,
      width: 800,
    });
  }

  function handleEdit(record: Recordable, e) {
    e.stopPropagation();
    openDrawer(true, {
      record,
      isUpdate: true,
    });
    setDrawerProps({
      // centered: true,
      width: 800,
    });
  }

  function handleDelete(record: Recordable<any>, e) {
    e.stopPropagation();
    const {success, msg} = deleteBusinessTokenById({ id: record.id });
    if(success){
      tableApi.reload();
      message.success(msg)
    } else {
      message.error(msg)
    }
  }

  function handleSuccess() {
    setTimeout(() => {
      tableApi.reload();
    }, 200);
  }
</script>
