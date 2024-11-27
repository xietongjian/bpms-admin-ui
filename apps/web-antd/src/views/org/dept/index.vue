<script lang="ts" setup>
  import { PerEnum } from '#/enums/perEnum';
  import {AccessControl} from '@vben/access';
  import { ref, unref } from 'vue';
  import type { Recordable } from '@vben/types';

  import {useVbenVxeGrid, VxeGridProps} from '#/adapter/vxe-table';
  import { deleteByIds, getDepts } from '#/api/org/dept';
  import CompanyTree from '@/views/components/leftTree/CompanyTree.vue';
  import { message } from 'ant-design-vue';
  import { useModal } from '@/components/Modal';
  import DeptModal from './DeptModal.vue';
  import SplitPane from '@/views/components/splitPane/index.vue';
  import { columns, searchFormSchema } from './dept.data';
  import { EmpInfo } from '#/views/components/EmpInfo';
  import {Page, VbenFormProps} from "@vben/common-ui";


  const [registerModal, { openModal, setModalProps }] = useModal();
  const currentNode = ref<Recordable>({});


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
          return await getDepts({
            entity: formValues || {},
          });
        },
      },
    },
  };

  const [BasicTable, tableApi] = useVbenVxeGrid({formOptions, gridOptions});

  function handleCreate() {
    setModalProps({ title: '新增部门', centered: true });
    openModal(true, {
      record: { companyId: unref(currentNode)?.id },
      isUpdate: false,
    });
  }

  function handleEdit(record: Recordable) {
    setModalProps({ title: '修改部门', centered: true });
    openModal(true, {
      record,
      isUpdate: true,
    });
  }

  function handleCreateChild(record: Recordable) {
    setModalProps({ title: '新增【' + record.name + '】的子部门' });
    record = { companyId: unref(currentNode)?.id, pid: record.id };
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
      reloadData();
    });
  }

  function doSearch() {
    reloadData();
  }

  function reloadData() {
    if (unref(currentNode) && unref(currentNode).id) {
      reload({ searchInfo: { companyId: unref(currentNode).id } });
    } else {
      setTableData([]);
    }
  }

  function handleSuccess() {
    setTimeout(() => {
      reloadData();
    }, 200);
  }

  function handleSelect(node: any) {
    currentNode.value = node;
    reloadData();
  }
</script>

<template>
  <Page auto-content-height>
    <div class="p-4 h-full">
      <SplitPane>
        <template #left>
          <CompanyTree style="height: 100%" @select="handleSelect" />
        </template>
        <template #main>
          <BasicTable @register="registerTable" class="!pt-0 !pl-0 !pr-0 !pb-0">
            <template #toolbar>
              <Authority :value="'Department:' + PerEnum.ADD">
                <a-button type="primary" @click="handleCreate">新增</a-button>
              </Authority>
            </template>
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'action'">
                <TableAction
                    :stopButtonPropagation="true"
                    :actions="[
                    {
                      auth: 'Department:' + PerEnum.ADD,
                      tooltip: '添加子部门',
                      icon: 'ant-design:plus-outlined',
                      onClick: handleCreateChild.bind(null, record),
                    },
                    {
                      auth: 'Department:' + PerEnum.UPDATE,
                      tooltip: '修改',
                      icon: 'clarity:note-edit-line',
                      onClick: handleEdit.bind(null, record),
                    },
                    {
                      auth: 'Department:' + PerEnum.DELETE,
                      tooltip: '删除',
                      icon: 'ant-design:delete-outlined',
                      color: 'error',
                      popConfirm: {
                        title: '是否确认删除',
                        confirm: handleDelete.bind(null, record),
                        placement: 'left',
                      },
                    },
                  ]"
                />
              </template>

              <template v-else-if="column.key === 'superiorName'">
                <EmpInfo :no="record.superiorCode" :name="record.superiorName" />
              </template>

              <template v-else-if="column.key === 'leaderName'">
                <EmpInfo :no="record.leaderCode" :name="record.leaderName" />
              </template>
            </template>
          </BasicTable>
        </template>
      </SplitPane>
    </div>
    <DeptModal @register="registerModal" @success="handleSuccess" />
  </Page>
</template>
