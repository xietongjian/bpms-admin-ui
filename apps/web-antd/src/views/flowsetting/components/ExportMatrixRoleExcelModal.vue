<template>
  <BasicModal class="w-[800px]" contentClass="">
    <BasicTable class="[&_.vxe-grid--form-wrapper>div]:pb-3 [&_.vxe-grid--form-wrapper form]:bg-red">
    </BasicTable>
  </BasicModal>
</template>
<script lang="ts" setup>
import {ref, defineEmits, nextTick} from 'vue';
import type {VxeGridProps, VxeGridListeners} from '#/adapter/vxe-table';
import type {VbenFormProps} from '@vben/common-ui';

import {useVbenModal} from '@vben/common-ui';
import {useVbenVxeGrid} from "#/adapter/vxe-table";
import {message} from 'ant-design-vue';
import dayjs from 'dayjs';

const emit = defineEmits(['success']);

/*  const formOptions: VbenFormProps = {
    showCollapseButton: false,
    submitOnEnter: true,
    commonConfig: {
      labelWidth: 60,
    },
    actionWrapperClass: 'col-span-3 col-start-3 text-left ml-4',
    resetButtonOptions: {
      show: false,
    },
    schema: searchFormSchema,
  };*/

const columns: any[] = [
  {
    title: '名称',
    type: 'checkbox',
    field: 'name',
    align: 'left',
  },
  {
    title: '标识',
    field: 'sn',
    width: 180,
    align: 'left',
  },
  {
    title: '备注',
    field: 'note',
    align: 'left',
  },
];
const searchFormSchema = [
  {
    fieldName: 'keyword',
    label: '关键字',
    component: 'Input',
    componentProps: {
      placeholder: '请输入名称/标识',
      allowClear: true,
    },
    labelWidth: 60,
    colProps: {span: 18},
  },
];

const gridOptions: VxeGridProps<any> = {
  showHeaderOverflow: true,
  showOverflow: false,
  columns,
  columnConfig: {resizable: true},
  checkboxConfig: {
    highlight: true,
    labelField: 'name',
    trigger: 'row',
  },
  height: 'auto',
  border: false,
  stripe: true,
  pagerConfig: {
    enabled: false,
  },
  rowConfig: {
    keyField: 'id',
    isHover: true,
  },
  exportConfig: {},
};
const formOptions: VbenFormProps = {
  showCollapseButton: false,
  submitOnEnter: true,
  commonConfig: {
    labelWidth: 60,
  },
  actionWrapperClass: 'col-span-2 col-start-2 text-left ml-2',
  resetButtonOptions: {
    show: false,
  },
  schema: searchFormSchema,
};

const [BasicTable, tableApi] = useVbenVxeGrid({gridOptions, formOptions});

const [BasicModal, modalApi] = useVbenModal({
  draggable: true,
  onCancel() {
    modalApi.close();
  },
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      const values = modalApi.getData<Record<string, any>>();
      const {roles} = values;

      setTimeout(() => {
        const {reloadData} = tableApi.grid;
        reloadData(roles);
        modalApi.setState({loading: false, confirmLoading: false});
      });
    } else {

    }
  },
  onConfirm() {
    // handleSubmit();
    handleOk();
  },
});

/*const [registerModal, { closeModal }] = useModalInner((data) => {
  const { roles, exportFileName } = data;
  fileName.value = exportFileName;
  // 展示用于导出的数据列
  setTableData(roles);
});*/

async function handleOk() {
  const selectedRow = tableApi.grid.getCheckboxRecords();

  if (!selectedRow) {
    message.warn('请选择要导出的行！');
    return;
  }

  const {openExport, exportData, getFullData} = tableApi.grid;

  const nowDate = dayjs().format('YYYYMMDDHHmmssSSS');

  debugger;
  // const res = await
  exportData({
    filename: `下载角色人员配置${nowDate}`,
    sheetName: 'Sheet1',
    download: true,
    type: 'xlsx',
    isHeader: true,
    data: getFullData()
    /*original: false,
    message: false,
    isHeader: true,
    useStyle:true, //是否导出样式
    columns: [{
        colId: 1,
        field: 'test',
        title: '第一列',
        width: 100,
        minWidth: 100,

      },
      { colId: 2, field: 'test1', title: '第二列', type: 'string' }
    ],
    data: [
      {
        test: 123123, test1: 33333
      }
    ],*/
    // types: ['xlsx', 'pdf', 'doc'], //导出格式
    //modes: ['all'], //导出所有
  });
  // 执行下载Excel功能
  message.success('导出成功！');

  // modalApi.close();

  // emit('success', {
  //   selectedRow,
  // });
}

defineExpose(modalApi);
</script>

<style lang="scss">
.export-matrix-role-modal {
  .ant-modal-body {
    .scroll-container {
      padding: 0;
    }
  }

  .vben-basic-table-form-container {
    padding: 0;
  }
}
</style>
