<script lang="ts" setup>
import { ref } from 'vue';
import type { Recordable } from '@vben/types';
import type { VxeGridProps } from '#/adapter/vxe-table';
import type { VbenFormProps } from '@vben/common-ui';
import { Page } from '@vben/common-ui';
import { Button, message } from 'ant-design-vue';
import { PerEnum } from '#/enums/perEnum';
import { useVbenVxeGrid, VbenTableAction } from '#/adapter/vxe-table';
import { columns, searchFormSchema } from './motivate.data';
import MotivateModal from './MotivateModal.vue';
import { deleteMotivateInfo, getMotivateInfoPage } from '#/api/base/motivateInfo';

const PerPrefix = 'MotivateInfo:';

const motivateModalRef = ref();

const formOptions: VbenFormProps = {
  showCollapseButton: false,
  submitOnEnter: true,
  commonConfig: {
    labelWidth: 60,
  },
  resetButtonOptions: {
    show: false,
  },
  schema: searchFormSchema,
  wrapperClass: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  actionWrapperClass: 'pl-2 !justify-end md:!justify-start',
  actionPosition: 'left',
  actionLayout: 'inline',
};

const gridOptions: VxeGridProps = {
  columns,
  columnConfig: { resizable: true },
  height: 'auto',
  keepSource: true,
  border: false,
  stripe: true,
  showOverflow: false,
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues) => {
        // 处理 department 字段转换
        const params: any = {
          pageIndex: page.currentPage - 1,
          pageSize: page.pageSize,
          entity: { ...formValues },
        };
        if (formValues?.department?.[0]?.name) {
          params.entity.deptName = formValues.department[0].name;
          delete params.entity.department;
        }
        return await getMotivateInfoPage(params);
      },
    },
  },
};

const [BasicTable, tableApi] = useVbenVxeGrid({ formOptions, gridOptions });

function handleAdd() {
  motivateModalRef.value.setData({});
  motivateModalRef.value.open();
  motivateModalRef.value.setState({
    title: '新增',
  });
}

function handleEdit(record: any) {
  motivateModalRef.value.setData(record);
  motivateModalRef.value.open();
  motivateModalRef.value.setState({
    title: '修改',
  });
}

async function handleDelete(record: Recordable<any>) {
  try {
    const result = await deleteMotivateInfo({ id: record.id });
    const { success, msg } = result;
    if (success) {
      message.success(msg || '删除成功！');
      await tableApi.reload();
    } else {
      message.error(msg);
    }
  } catch (e: any) {
    message.error(e?.message || '删除失败');
  }
}

function createActions(row: Recordable<any>) {
  return [
    {
      auth: [PerPrefix + PerEnum.UPDATE],
      text: '修改',
      icon: 'ant-design:form-outlined',
      onClick: handleEdit.bind(null, row),
    },
    {
      auth: [PerPrefix + PerEnum.DELETE],
      text: '删除',
      icon: 'ant-design:delete-outlined',
      danger: true,
      popConfirm: {
        title: '是否确认删除',
        confirm: handleDelete.bind(null, row),
        placement: 'left',
      },
    },
  ];
}

function handleSuccess() {
  tableApi.reload();
}
</script>

<template>
  <Page auto-content-height>
    <BasicTable table-title="激励信息管理">
      <template #toolbar-tools>
        <Button
          v-access:code="PerPrefix + PerEnum.ADD"
          type="primary"
          @click="handleAdd"
        >
          新增
        </Button>
      </template>

      <template #action="{ row }">
        <VbenTableAction align="center" :actions="createActions(row)" />
      </template>
    </BasicTable>
    <MotivateModal ref="motivateModalRef" @onSuccess="handleSuccess" />
  </Page>
</template>
