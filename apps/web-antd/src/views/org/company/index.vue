<script lang="ts" setup>
import {PerEnum} from '#/enums/perEnum';
import {useVbenVxeGrid, VxeGridProps} from '#/adapter/vxe-table';
import {Page, useVbenModal, type VbenFormProps} from '@vben/common-ui';
import {deleteByIds, getCompanies} from '#/api/org/company';
import {columns, searchFormSchema} from './company.data';
import companyModal from './company-modal.vue';


const [CompanyModal, modalApi] = useVbenModal({
  connectedComponent: companyModal,
  centered: true,
});

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
  columns,
  columnConfig: {resizable: true},
  pagerConfig: {
    enabled: false,
  },
  rowConfig: {
    keyField: 'id',
  },
  treeConfig: {
    parentField: 'pid',
    rowField: 'id',
    transform: true,
  },
  height: 'auto',
  keepSource: true,
  border: false,
  stripe: true,
  proxyConfig: {
    ajax: {
      query: async ({page}, formValues) => {
        return await getCompanies({
          entity: formValues || {},
        });
      },
    },
  },
};

const [BasicTable, tableApi] = useVbenVxeGrid({formOptions, gridOptions});

function handleCreate() {
  setModalProps({title: '新增公司', centered: true});
  openModal(true, {
    isUpdate: false,
  });
}

function handleEdit(record: Recordable, e) {
  e.stopPropagation();
  setModalProps({title: '修改公司', centered: true});
  openModal(true, {
    record,
    isUpdate: true,
  });
}

function handleCreateChild(record: Recordable, e) {
  e.stopPropagation();
  setModalProps({title: '新增【' + record.cname + '】的子公司'});
  record = {
    pid: record.id,
    status: 1,
  };
  openModal(true, {
    record,
    isUpdate: true,
  });
}

function handleDelete(record: Recordable) {
  if (record.children && record.children.length > 0) {
    createMessage.warning('有子节点，不能删除！');
    return;
  }
  deleteByIds([record.id]).then((res) => {
    reload();
  });
}

function doSearch() {
  reload();
}

function handleSuccess() {
  setTimeout(() => {
    reload();
  }, 200);
}
</script>


<template>
  <Page auto-content-height>
    <BasicTable >
      <template #toolbar>
        <Authority :value="'Company:' + PerEnum.ADD">
          <a-button type="primary" @click="handleCreate"> 新增</a-button>
        </Authority>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
              :actions="[
              {
                auth: 'Company:' + PerEnum.ADD,
                tooltip: '添加子公司',
                icon: 'ant-design:plus-outlined',
                onClick: handleCreateChild.bind(null, record),
              },
              {
                auth: 'Company:' + PerEnum.UPDATE,
                tooltip: '修改',
                icon: 'clarity:note-edit-line',
                onClick: handleEdit.bind(null, record),
              },
              {
                auth: 'Company:' + PerEnum.DELETE,
                tooltip: '删除',
                icon: 'ant-design:delete-outlined',
                color: 'error',
                onClick: (e) => {
                  e.stopPropagation();
                },
                popConfirm: {
                  title: '是否确认删除',
                  confirm: handleDelete.bind(null, record),
                  placement: 'left',
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <CompanyModal @success="handleSuccess"/>
  </Page>
</template>
