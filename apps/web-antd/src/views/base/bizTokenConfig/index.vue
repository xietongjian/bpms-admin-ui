<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <Authority :value="'BizTokenConfig:' + PerEnum.ADD">
          <a-button type="primary" @click="handleCreate">新增</a-button>
        </Authority>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                auth: 'BizTokenConfig:' + PerEnum.UPDATE,
                tooltip: '修改',
                icon: 'clarity:note-edit-line',
                onClick: handleEdit.bind(null, record),
              },
              {
                auth: 'BizTokenConfig:' + PerEnum.DELETE,
                tooltip: '删除',
                icon: 'ant-design:delete-outlined',
                color: 'error',
                popConfirm: {
                  placement: 'left',
                  title: '是否确认删除',
                  confirm: handleDelete.bind(null, record),
                },
              },
            ]"
          />
        </template>
        <template v-if="column.key === 'type'">
          <Tag v-if="record.type === 'sc'" color="#87d068">微服务</Tag>
          <Tag v-else color="#108ee9">RestFull</Tag>
        </template>
        <template v-if="column.key === 'method'">
          <Tag v-if="record.type === 'GET'" color="#108ee9">GET</Tag>
          <Tag v-else color="#87d068">POST</Tag>
        </template>
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
    <BizTokenConfigDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { onMounted } from 'vue';
  import { PerEnum } from '@/enums/perEnum';
  import { Authority } from '@/components/Authority';
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { getAll, deleteBusinessTokenById } from '#/api/base/bizTokenConfig';
  import { columns, searchFormSchema } from './bizTokenConfig.data';
  import BizTokenConfigDrawer from './BizTokenConfigDrawer.vue';
  import { Tag, Descriptions } from 'ant-design-vue';
  import { useDrawer } from '@/components/Drawer';

  const [registerDrawer, { openDrawer, setDrawerProps }] = useDrawer();

  const DescriptionsItem = Descriptions.Item;

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

  function handleDelete(record: Recordable, e) {
    e.stopPropagation();
    deleteBusinessTokenById({ id: record.id }).then(() => {
      reload();
    });
  }

  function handleSuccess() {
    setTimeout(() => {
      reload();
    }, 200);
  }
</script>
