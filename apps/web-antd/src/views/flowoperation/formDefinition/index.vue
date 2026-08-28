<template>
  <div>
    <ColPage
      :left-max-width="50"
      :left-min-width="10"
      :left-width="15"
      :split-handle="true"
      :split-line="true"
      :resizable="true"
      :left-collapsible="true"
      :auto-content-height="true"
      content-class="h-full"
    >
      <template #left>
        <div class="h-full bg-card">
          <FlowCategoryTree ref="flowCategoryTreeRef" @select="handleCategorySelect" />
        </div>
      </template>
      <Grid ref="gridRef">
        <template #toolbar-actions>
          <Segmented v-model:value="formInfoType" :options="typeOptions" />
        </template>
        <template #name="{ row }">
          {{ row.name }}
        </template>
        <template #action="{ row }">
          <TableAction align="center" :actions="buildMainActions(row)" />
        </template>
        <template #expandContent="{ row }">
          <SubBasicTable
            :gridOptions="createSubGridOptions(row)"
            @page-change="({ currentPage, pageSize }) => handlePageChange(row, currentPage, pageSize)"
          >
            <template #statusName="{ row: subRow }">
              <Tag :color="getStatusColor(subRow.formStatus)">
                {{ subRow.statusName }}
              </Tag>
            </template>
            <template #action="{ row: subRow }">
              <TableAction align="center" :actions="buildSubActions(subRow, row)" />
            </template>
          </SubBasicTable>
        </template>
      </Grid>
      <BpmnPreviewModal ref="bpmnPreviewModalRef" />
      <FormInfoDefDesignerModal ref="formInfoDefDesignerModalRef" :form-info-type="formInfoType" />
      <FormPreviewModal ref="formPreviewModalRef" />
    </ColPage>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive, watch } from 'vue';
  import { Segmented, Tag } from 'ant-design-vue';
  import { ColPage } from '@vben/common-ui';
  import type { VbenFormProps } from '@vben/common-ui';
  import type { VxeGridProps } from '#/adapter/vxe-table';
  import { useVbenVxeGrid } from '#/adapter/vxe-table';
  import { TableAction } from '#/components/table-action';

  import FlowCategoryTree from '#/views/components/leftTree/FlowCategoryTree.vue';
  import { BpmnPreviewModal } from '#/views/components/preview';
  import FormPreviewModal from '#/views/components/form/formMaking/FormPreviewModal.vue';

  import { pageList, getFormInfoDefPagerModel } from '#/api/form/customForm';
  import {
    pageList as bizPageList,
    getBizFormInfoDefPagerModel,
  } from '#/api/form/bizForm';

  import {
    columns as mainColumns,
    subColumns,
    searchFormSchema,
    getStatusColor,
  } from './modelInfo.data';

  import FormInfoDefDesignerModal from './FormInfoDefDesignerModal.vue';

  import type { ActionItem } from '@vben/common-ui';
  import type { Recordable } from '@vben/types';

  const formInfoType = ref<string>('customDef');

  const typeOptions = [
    { label: '自定义表单', value: 'customDef' },
    { label: '业务表单', value: 'bizDef' },
  ];

  const flowCategoryTreeRef = ref();
  const bpmnPreviewModalRef = ref();
  const formInfoDefDesignerModalRef = ref();
  const formPreviewModalRef = ref();

  const currentCategory = ref<Record<string, any>>({});

  const expandData = reactive<Recordable<any>>({});
  const loading = reactive<Recordable<any>>({});

  // 主表格操作按钮
  function buildMainActions(row: Record<string, any>): ActionItem[] {
    return [
      {
        label: '流程图预览',
        icon: 'ant-design:partition-outlined',
        onClick: () => handleBpmnPreview(row),
      },
    ];
  }

  // 子表格操作按钮
  function buildSubActions(
    subRecord: Record<string, any>,
    _parentRow: Record<string, any>,
  ): ActionItem[] {
    return [
      {
        label: '编辑表单',
        icon: 'ant-design:edit-outlined',
        onClick: () => handleEditForm(subRecord),
      },
      {
        label: '表单预览',
        icon: 'ant-design:eye-outlined',
        onClick: () => handleSubFormPreview(subRecord),
      },
    ];
  }

  const formOptions: VbenFormProps = {
    showCollapseButton: false,
    submitOnEnter: true,
    commonConfig: { labelWidth: 120 },
    schema: searchFormSchema,
  };

  // 加载子表数据
  const loadSubData = async (row: Recordable<any>, currentPage: number, pageSize: number) => {
    loading[row.id] = true;
    try {
      const params = {
        query: { pageNum: currentPage, pageSize },
        entity: { code: row.modelKey },
      };
      let res: any;
      if (formInfoType.value === 'customDef') {
        res = await getFormInfoDefPagerModel(params);
      } else {
        res = await getBizFormInfoDefPagerModel(params);
      }
      expandData[row.id] = {
        list: res?.rows || res?.data || [],
        currentPage,
        pageSize,
        total: res?.total || 0,
        loaded: true,
      };
    } catch (e) {
      console.error(e);
    } finally {
      loading[row.id] = false;
    }
  };

  // 子表分页切换
  const handlePageChange = (row: Recordable<any>, currentPage: number, pageSize: number) => {
    loadSubData(row, currentPage, pageSize);
  };

  const gridOptions: VxeGridProps = {
    columns: mainColumns,
    height: 'auto',
    expandConfig: {
      trigger: 'row',
      lazy: true,
      loadMethod: ({ row }: any) => {
        return loadSubData(row, 1, 10);
      },
    },
    proxyConfig: {
      ajax: {
        query: async ({ page }: any, formValues: any) => {
          const params = {
            query: { pageNum: page.currentPage, pageSize: page.pageSize },
            entity: {
              ...formValues,
              modelType: 0,
              categoryCode: currentCategory.value?.code || '',
            },
          };

          if (formInfoType.value === 'customDef') {
            return await pageList(params);
          } else {
            return await bizPageList(params);
          }
        },
      },
    },
    toolbarConfig: {
      refresh: true,
    },
    rowConfig: {
      keyField: 'id',
    },
  };

  const [Grid, gridApi] = useVbenVxeGrid({ formOptions, gridOptions });

  const subGridOptions: VxeGridProps = {
    columns: subColumns,
    columnConfig: { resizable: true },
    height: 'auto',
    border: false,
    keepSource: true,
    autoResize: false,
    stripe: true,
    round: false,
    proxyConfig: {
      enabled: false,
    },
  };

  const createSubGridOptions = (row: Recordable<any>) => {
    return {
      columns: subColumns,
      columnConfig: { resizable: true },
      loading: loading[row.id],
      data: expandData[row.id]?.list || [],
      toolbarConfig: { enabled: false },
      pagerConfig: {
        currentPage: expandData[row.id]?.currentPage || 1,
        pageSize: expandData[row.id]?.pageSize || 10,
        total: expandData[row.id]?.total || 0,
        align: 'center',
      },
    };
  };

  const [SubBasicTable, subTableApi] = useVbenVxeGrid({ gridOptions: subGridOptions });

  const gridRef = ref(gridApi);

  // 切换形式类型时清除数据并重新加载
  watch(formInfoType, () => {
    Object.keys(expandData).forEach((key) => delete expandData[key]);
    Object.keys(loading).forEach((key) => delete loading[key]);
    gridApi.reload();
  });

  function handleCategorySelect(node: Record<string, any>) {
    currentCategory.value = node;
    Object.keys(expandData).forEach((key) => delete expandData[key]);
    Object.keys(loading).forEach((key) => delete loading[key]);
    gridApi.reload();
  }

  // 流程图预览
  function handleBpmnPreview(record: Record<string, any>) {
    bpmnPreviewModalRef.value.setData({ modelKey: record.modelKey });
    bpmnPreviewModalRef.value.open();
    bpmnPreviewModalRef.value.setState({ title: `流程预览 - ${record.name}` });
  }

  // 编辑表单（子表格）
  function handleEditForm(subRecord: Record<string, any>) {
    formInfoDefDesignerModalRef.value.setData({
      id: subRecord.id,
      modelKey: subRecord.modelKey,
      name: subRecord.name,
      version: subRecord.version,
      formStatus: subRecord.formStatus,
      categoryCode: subRecord.categoryCode || currentCategory.value?.code,
    });
    formInfoDefDesignerModalRef.value.open();
    formInfoDefDesignerModalRef.value.setState({
      title: `编辑表单 - ${subRecord.name}`,
    });
  }

  // 表单预览（子表格 - 使用子记录的 formJson）
  function handleSubFormPreview(subRecord: Record<string, any>) {
    const formJson = JSON.parse(subRecord.formJson);
    formPreviewModalRef.value.setData({ formJson });
    formPreviewModalRef.value.open();
    formPreviewModalRef.value.setState({ title: `预览 - ${subRecord.name}` });
  }
</script>
