<script lang="ts" setup>
  import { PerEnum } from '#/enums/perEnum';
  import { ref, onMounted } from 'vue';
  import { Button, Tag, message} from 'ant-design-vue';
  import {useVbenVxeGrid} from '#/adapter/vxe-table';
  import type {VbenFormProps} from '@vben/common-ui';
  import type { Recordable } from '@vben/types';
  import type {VxeGridProps} from '#/adapter/vxe-table';
  import {Page} from '@vben/common-ui';
  import { TableAction } from '#/components/table-action';

  import { getFlowCategories, deleteByIds } from '#/api/base/category';
  import { columns, searchFormSchema } from './category.data';
  import CategoryModal from './CategoryModal.vue';

  import {getCompaniesListData} from '#/api/org/company';

  const PerPrefix = "Category:";

  const categoryModalRef = ref();

  const companiesMap = ref([]);

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

  const gridOptions: VxeGridProps = {
    checkboxConfig: {
      highlight: true,
      labelField: 'name',
    },
    columns,
    showOverflow: true,
    columnConfig: {resizable: true},
    pagerConfig: {
      enabled: false,
    },
    rowConfig: {
      keyField: 'id',
      isHover: true,
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
          return await getFlowCategories({
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
        auth: [PerPrefix + PerEnum.ADD],
        tooltip: '添加子分类',
        icon: 'ant-design:plus-outlined',
        onClick: handleCreateChild.bind(null, row),
      },
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
        onClick: (e) => {
          e.stopPropagation();
        },
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

  onMounted(() => {
    getCompaniesListData().then((res) => {
      res.forEach((item) => {
        companiesMap.value[item.id] = item;
      });
    });
  });

  function handleCreate() {
    categoryModalRef.value.setData({});
    categoryModalRef.value.open();
    categoryModalRef.value.setState({
      title: '新增流程分类'
    });
  }

  function handleEdit(record: Recordable<any>, e) {
    e.stopPropagation();
    categoryModalRef.value.setData(record);
    categoryModalRef.value.open();
    categoryModalRef.value.setState({
      title: '修改流程分类'
    });
  }

  function handleCreateChild(record: Recordable<any>, e) {
    e.stopPropagation();
    categoryModalRef.value.setData({
      pid: record.id,
      frontShow: 1,
    });
    categoryModalRef.value.open();
    categoryModalRef.value.setState({
      title: '新增【' + record.name + '】的子分类'
    });
  }

  async function handleDelete(record: Recordable<any>, e) {
    e.stopPropagation();
    if (record.children && record.children.length > 0) {
      message.warning('有子节点，不能删除！');
      return;
    }
    const {success, msg} = await deleteByIds([record.id]);
    if (success) {
      tableApi.reload();
      message.success(msg);
    } else {
      message.error(msg);
    }
  }

  function handleSuccess() {
    tableApi.reload();
  }
</script>

<template>
  <Page auto-content-height>
    <BasicTable>
      <template #toolbar-tools>
        <Button v-access:code="PerPrefix+PerEnum.ADD" type="primary" @click="handleCreate">新增</Button>
      </template>
      <template #action="{ row }">
        <TableAction :actions="createActions(row)"/>
      </template>
      <template #cName="{ row }">
        {{ companiesMap[row.companyId]?.shortName }}
      </template>
      <template #frontShow="{ row }">
        <Tag v-if="row.frontShow === 1" class="text-green-500">显示</Tag>
        <Tag v-else class="text-gray-500" >隐藏</Tag>
      </template>
    </BasicTable>
    <CategoryModal ref="categoryModalRef" @success="handleSuccess" />
  </Page>
</template>
