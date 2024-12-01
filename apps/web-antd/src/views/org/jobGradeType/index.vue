
<script lang="ts" setup>
import {ref} from 'vue';
import type {VxeGridProps} from '#/adapter/vxe-table';
import type {VbenFormProps} from '@vben/common-ui';

  import { PerEnum } from '#/enums/perEnum';
  import {AccessControl} from '@vben/access';
  import {useVbenVxeGrid} from '#/adapter/vxe-table';
  // import { useModal } from '@/components/Modal';
  import { columns, searchFormSchema } from './jobGradeType.data';
  import JobGradeTypeModal from './JobGradeTypeModal.vue';
  import { getJobGradeTypes, deleteById } from '#/api/org/jobGradeType';
  import type { Recordable } from '@vben/types';
  import { TableAction } from '#/components/table-action';
import {Button, Image, Tag, Tooltip, Popconfirm, message} from 'ant-design-vue';
import {useAccess} from '@vben/access';
import {listColumns} from "#/views/base/app/app.data";
import {getAppListByPage} from "#/api/base/app";
const PerPrefix = "JobGradeType:";


const {hasAccessByCodes} = useAccess();
  /*const [registerModal, { openModal }] = useModal();
  const [registerTable, { reload }] = useTable({
    title: '列表',
    api: getJobGradeTypes,
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
    pagination: false,
    showIndexColumn: false,
    isTreeTable: true,
    actionColumn: {
      width: 100,
      title: '操作',
      dataIndex: 'action',
    },
  });
*/

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
  height: 'auto',
  keepSource: true,
  border: false,
  stripe: true,
  proxyConfig: {
    ajax: {
      query: async ({page}, formValues) => {
        return await getJobGradeTypes({
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


function handleCreate() {
    openModal(true, {
      isUpdate: false,
    });
  }

  function handleEdit(record: Recordable) {
    openModal(true, {
      record,
      isUpdate: true,
    });
  }

  function handleDelete(record: Recordable) {
    deleteById([record.id]).then(() => {
      reload();
    });
  }

  function handleSuccess() {
    setTimeout(() => {
      reload();
    }, 200);
  }

  function createActions(record: Recordable) {
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
        color: 'error',
        popConfirm: {
          title: '是否确认删除',
          confirm: handleDelete.bind(null, record),
          placement: 'left',
        },
      },
    ]
  }
</script>
<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar-tools>
        <Button v-if="hasAccessByCodes([PerPrefix + PerEnum.ADD])" type="primary" @click="handleCreate"> 新增</Button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
              :actions="createActions(record)"
          />
        </template>
      </template>
    </BasicTable>
    <JobGradeTypeModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
