<template>
  <Page auto-content-height>
    <BasicTable>
      <template #action="{ row }">
        <TableAction :actions="createActions(row)" />
      </template>
    </BasicTable>
    <BpmnPreviewModal ref="bpmnPreviewModalRef" />
  </Page>
</template>
<script lang="ts" setup>
  import { ref, nextTick } from 'vue';

  import type {VxeGridProps} from '#/adapter/vxe-table';
  import type {VbenFormProps} from '@vben/common-ui';
  import type {Recordable} from '@vben/types';

  import {Page} from '@vben/common-ui';
  import {Button, Space, Image, Tag, message} from 'ant-design-vue';
  import {useVbenVxeGrid} from '#/adapter/vxe-table';
  import {TableAction} from '#/components/table-action';

  import {BpmnPreviewModal} from '#/views/components/preview';

  import { columns, searchFormSchema } from './modelCount.data';


  import { getModelPagerModel } from '#/api/report/modelCount';
  import { getAllFormType } from '#/api/form/form';


  import {PerEnum} from "#/enums/perEnum";
  import {getGroupListByPage} from "#/api/privilege/group";


  const bpmnPreviewModalRef = ref();
  // const go = useGo();

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
          return getModelPagerModel({
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
  function handleBpmnPreview(modelKey: string, procInstId = "") {
    bpmnPreviewModalRef.value.setData({modelKey, procInstId});
    bpmnPreviewModalRef.value.open();
  }
  /*const [registerModal, { openModal }] = useModal();
  const [
    registerBpmnPreviewModal,
    { openModal: openBpmnPreviewModal, setModalProps: setBpmnPreviewProps },
  ] = useModal();
  const loadingRef = ref(false);

  const [registerTable, { getForm, reload }] = useTable({
    title: '列表',
    api: getModelPagerModel,
    columns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
      showAdvancedButton: false,
      showResetButton: false,
      autoSubmitOnEnter: true,
      submitFunc: doSearchFunc,
    },
    useSearchForm: true,
    showIndexColumn: false,
    bordered: true,
    actionColumn: {
      width: 80,
      title: '操作',
      dataIndex: 'action',
    },
  });*/

  nextTick(() => {
    // const { updateSchema } = getForm();
    //
    // getAllFormType().then((res) => {
    //   updateSchema([
    //     {
    //       field: 'formType',
    //       componentProps: { options: res },
    //     },
    //   ]);
    // });
  });

  /**
   *  自定义搜索功能
   **/
  async function doSearchFunc() {
    const { validate, setProps } = getForm();
    try {
      const values = await validate();
      setProps({
        submitButtonOptions: {
          loading: true,
        },
      });
      await tableApi.reload(values);
    } catch (error) {
    } finally {
      setProps({
        submitButtonOptions: {
          loading: false,
        },
      });
    }
  }

  function createActions(record: Recordable<any>) {
    return [
      {
        icon: 'ant-design:partition-outlined',
        tooltip: '流程图预览',
        label: '',
        onClick: handlePreview.bind(null, record),
      },
    ];
  }

  function handlePreview(record: Recordable<any>) {
    handleBpmnPreview(record.modelKey);
  }

  function handleSuccess() {
    tableApi.reload();
  }
</script>

<style lang="less" scoped>
  .modelInfo-roles {
    > span {
      margin-right: 4px;
    }
  }
</style>
