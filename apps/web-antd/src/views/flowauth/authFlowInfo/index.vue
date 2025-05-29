<template>
  <Page auto-content-height>
    <BasicTable>
      <template #toolbar-tools>
        <Button v-access:code="PerPrefix+PerEnum.ADD" type="primary" @click="handleCreate"> 新增</Button>
      </template>
      <template #action="{ row }">
        <TableAction :actions="createActions(row)"/>
      </template>
      <template #authUserName="{ row }">
        <EmpInfo :no="row.authUser" :name="row.authUserName"/>
      </template>
      <template #currUserName="{ row }">
        <EmpInfo :no="row.currUser" :name="row.currUserName"/>
      </template>
      <template #authFlowKeys="{ row }">
        <div v-if="row.authType === '1'"> 所有流程</div>
        <div v-else>
          <div>
            <Space>
              <Tag
                  class="tag-item"
                  color="processing"
                  v-for="item in row.authFlowItems.slice(0, 2)"
              >
                {{ item.modelName }}
              </Tag>
              <Popover
                  v-if="row.authFlowItems.slice(2).length > 0"
                  title="授权模板"
                  placement="left"
                  class=""
              >
                <template #content>
                  <div
                      class="popover-details"
                      style="width: 300px; max-height: 400px; overflow: auto"
                  >
                    <div class="mb-2" v-if="row.authFlowItems.length > 0">
                      <Divider
                          style="height: 1px; background-color: #7cb305; margin: 0"
                          orientation="left"
                      />
                      <Space>
                        <Tag
                            class="tag-item"
                            color="processing"
                            v-if="row.authFlowItems && row.authFlowItems.length > 0"
                            v-for="item in row.authFlowItems"
                        >
                          {{ item.modelName }}
                        </Tag>
                      </Space>
                    </div>
                  </div>
                </template>
                <div>
                  <Tag color="warning">+{{ row.authFlowItems.slice(2).length }}</Tag>
                </div>
              </Popover>
            </Space>
          </div>
        </div>
      </template>
    </BasicTable>
    <AuthFlowInfoModal ref="authFlowInfoModalRef" @success="handleSuccess"/>
  </Page>
</template>
<script lang="ts" setup>
import {ref} from 'vue';
import {PerEnum} from '#/enums/perEnum';
import type {VxeGridProps} from '#/adapter/vxe-table';
import type {VbenFormProps} from '@vben/common-ui';
import type {Recordable} from '@vben/types';

import {Page} from '@vben/common-ui';
import {Popover, Button, Divider, Space, Tag, message} from 'ant-design-vue';
import {TableAction} from '#/components/table-action';

import {columns, searchFormSchema} from './authFlowInfo.data';
import AuthFlowInfoModal from './AuthFlowInfoModal.vue';
import {deleteByIds, getAuthPointListByPage} from '#/api/flowauth/authFlowInfo';
import {EmpInfo} from '#/views/components/EmpInfo';
import {useVbenVxeGrid} from "#/adapter/vxe-table";

const PerPrefix = "AuthFlowInfo:";
const authFlowInfoModalRef = ref();

const formOptions: VbenFormProps = {
  showCollapseButton: false,
  submitOnEnter: true,
  commonConfig: {
    labelWidth: 60,
  },
  wrapperClass: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  actionWrapperClass: 'col-span-2 col-start-2 text-left m2-4',
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
        return getAuthPointListByPage({
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
      onClick: handleEdit.bind(null, row),
    },
    {
      auth: [PerPrefix + PerEnum.DELETE],
      tooltip: '删除',
      icon: 'ant-design:delete-outlined',
      danger: true,
      popConfirm: {
        title: '是否确认删除',
        confirm: handleDelete.bind(null, row),
        placement: 'left',
        okButtonProps: {
          danger: true,
        }
      },
    },
  ];
}

/*const [registerModal, { openModal, setModalProps }] = useModal();

const [registerTable, { reload }] = useTable({
  title: '列表',
  api: getAuthPointListByPage,
  columns,
  formConfig: {
    labelWidth: 120,
    schemas: searchFormSchema,
    showAdvancedButton: false,
    showResetButton: false,
    autoSubmitOnEnter: true,
  },
  canColDrag: true,
  useSearchForm: true,
  bordered: true,
  showIndexColumn: true,
  actionColumn: {
    width: 100,
    title: '操作',
    dataIndex: 'action',
  },
});*/

function handleCreate() {
  authFlowInfoModalRef.value.setData({});
  authFlowInfoModalRef.value.open();
  authFlowInfoModalRef.value.setState({
    title: '新建'
  });
}

function handleEdit(record: Recordable<any>) {
  authFlowInfoModalRef.value.setData(record);
  authFlowInfoModalRef.value.open();
  authFlowInfoModalRef.value.setState({
    title: '编辑'
  });
}

function handleDelete(record: Recordable<any>) {
  deleteByIds({id: record.id}).then(() => {
    tableApi.reload();
  });
}

function handleSuccess() {
  setTimeout(() => {
    tableApi.reload();
  }, 200);
}
</script>

<style lang="scss" scoped>
.popover-details {
  .ant-space-align-center {
    flex-flow: wrap;

    .tag-item {
      margin: 2px 0;
    }
  }
}
</style>
