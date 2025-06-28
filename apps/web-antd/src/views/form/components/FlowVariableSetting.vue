<template>
  <div class="flow-variable-setting">
    <div class="px-6 pt-2 flex justify-end">
      <Button type="link" @click="downloadTemplate">下载模板</Button>
      <Button class="ml-2" type="link" @click="openUploadModal">导入</Button>
    </div>
    <BasicTable :loading="true" class="variable-table" ref="tableRef" v-bind="gridOptions">
      <template #action="{ row }">
        <TableAction outside :actions="createActions(row)" />
      </template>
      <template #innerVariableRender="{ row }">
        <Tag v-if="row.innerVariable" color="#87d068">是</Tag>
        <Tag v-else>否</Tag>
      </template>
    </BasicTable>

    <div class="w-[500px] m-auto">
      <Button
        :loading="gridOptions.loading"
        type="dashed"
        class="w-full"
        @click="handleAddRow"
        >添加流程变量</Button
      >
      <!--      <a-button type="primary" style="width: 100%;" @click="handleSubmit">保存</a-button>-->
    </div>
    <div class="h-[50px]"></div>

    <FlowVariableFileModal ref="flowVariableFileModalRef" @success="handleResetVariables" />
  </div>
</template>

<script lang="ts" setup>
  import { defineComponent, reactive, ref, watch, onMounted, nextTick } from 'vue';
  import { vxeFlowVariableTableColumns } from './modelInfo.data';
  import {
    downloadVariableTemplate,
    getProcessVariableByModelKey,
    saveOrUpdateProcessVariable,
  } from '#/api/flowable/bpmn/modelInfo';
  import { Tag, Button, message } from 'ant-design-vue';
  import { TableAction } from '#/components/table-action';

  import {useVbenVxeGrid} from '#/adapter/vxe-table';
  import { downloadByUrl } from '#/utils/file/download';
  import FlowVariableFileModal from '#/views/form/components/FlowVariableFileModal.vue';
  // import { useModal } from '@/components/Modal';
  import type {VxeGridProps} from '#/adapter/vxe-table';

  const flowVariableFileModalRef = ref();

  defineComponent({
    name: 'FlowVariableSetting',
  });

  const props = defineProps({
    modelId: {
      type: String,
      default: '',
    },
    modelKey: {
      type: String,
      default: '',
    },
    modelName: {
      type: String,
      default: '',
    },
    formType: {
      type: String,
      default: 'custom',
    },
  });

  const loadingRef = ref(false);
  // const { message } = useMessage();

  const tableRef = ref<any>();

  const gridOptions = reactive<VxeGridProps>({
    minHeight: 200,
    maxHeight: 500,
    size: 'small',
    keepSource: true,
    border: false,
    showOverflow: true,
    showFooter: true,
    stripe: true,
    loading: false,
    // editConfig: { trigger: 'click', mode: 'cell', showStatus: true },
    columns: vxeFlowVariableTableColumns,
    pagerConfig: {
      enabled: false,
    },
    toolbarConfig: {
      enabled: false,
      buttons: [
        {
          content: '新增',
          buttonRender: {
            name: 'AButton',
            props: {
              type: 'warning',
            },
            events: {
              click: () => {
                tableApi.grid.insertAt({ name: '新增的' }, -1);
              },
            },
          },
        },
      ],
    },
    formConfig: {
      enabled: false,
      items: [],
    },
    editConfig: {
      trigger: 'click',
      mode: 'row',
      /*beforeEditMethod({row, rowIndex}) {
        if (rowIndex === 1) {
          return false
        }
        return true
      }*/
    },
    validConfig: {
      autoPos: true,
      showMessage: true,
    },
    editRules: {
      "key": [
        { required: true, trigger: 'blur', content: '请输入变量标识' },
        { pattern: '^[a-zA-Z_$][a-zA-Z\\d_$]*$', content: '格式不正确' },
        {
          validator({ cellValue }) {
            const { fullData } = tableApi.grid?.getTableData();
            // 判断是否有重复的key
            const keyMap = {};
            if(fullData.length === 1){
              if (!fullData[0].key) {
                return new Error('请输入变量标识');
              }
            }
            for (let item of fullData) {
              if (!item.key) {
                return new Error('请输入变量标识');
              }
              if (keyMap[item.key]) {
                message.error({
                  content: '存在重复的变量标识',
                  style: { marginTop: '40px' },
                });
                return new Error('存在重复的变量标识');
              }
              keyMap[item.key] = true;
            }
          },
        },
      ],
      "value": [{ required: true, content: '请输入变量名称' }],
    },
  });
  const [BasicTable, tableApi] = useVbenVxeGrid({gridOptions});
  async function loadData() {
    if (!props.modelKey) {
      return;
    }
    gridOptions.loading = true;
    const data = await getProcessVariableByModelKey({ modelKey: props.modelKey });
    if (data) {
      const rows = JSON.parse(data.variables);
      rows.forEach((item) => {
        tableApi.grid?.insertAt(item, -1);
      });
    }
    gridOptions.loading = false;
  }

  // 下载模板
  async function downloadTemplate() {
    const { data } = await downloadVariableTemplate();
    downloadByUrl({
      url: URL.createObjectURL(data),
      fileName: '变量导入模板.xlsx',
    });
  }
  // 打开文件上传模态框
  function openUploadModal() {
    openModal(true, {});
  }
  // 上传完成后重新更新表格数据
  function handleResetVariables(newData: any[] = []) {
    console.log('imported new variables', newData);
    newData.forEach(({ fieldName, fieldSn }) => {
      tableApi.grid?.insertAt({ value: fieldName, key: fieldSn }, -1);
    });
  }

  function handleAddRow() {
    const emptyRow = { key: undefined, value: undefined, innerVariable: false };
    // tableRef.value?.insertAt(emptyRow, -1);
    tableApi.grid.insertAt(emptyRow, -1);
  }

  const createActions = (record) => {
    const actions: any[] = [
      {
        label: '删除',
        danger: true,
        popConfirm: {
          title: '是否确认删除',
          confirm: () => {
            tableApi.grid?.remove(record);
          },
          okButtonProps: { danger: true },
        },
      },
    ];
    return actions;
  };

  async function handleSubmit() {
    await nextTick();
    if (!props.modelKey) {
      return Promise.reject(false);
    }
    gridOptions.loading = true;
    const $table = tableApi.grid;
    if ($table) {
      const errMap = await $table.validate();
      if (errMap) {
        console.error(errMap);
        gridOptions.loading = false;
      } else {
        const { fullData } = $table!.getTableData();
        if(fullData.length === 1){
          if(!fullData[0].key){
            return Promise.reject(false);
          }
        }
        // 判断是否有重复的key
        const keyMap = {};
        for (let item of fullData) {
          if (keyMap[item.key]) {
            message.error({ content: '存在重复的变量标识', style: { marginTop: '40px' } });
            gridOptions.loading = false;

            return Promise.reject(false);
          }
          keyMap[item.key] = true;
        }
        const resultData = fullData.map((item) => {
          return {
            key: item.key,
            value: item.value,
            innerVariable: item.innerVariable,
          };
        });
        // 提交
        const values = {
          name: props.modelName,
          modelKey: props.modelKey,
          variables: JSON.stringify(resultData),
        };

        const {data, msg, success} = await saveOrUpdateProcessVariable(values);
        if (success) {
          message.success({ content: msg, style: { marginTop: '40px' } });
          gridOptions.loading = false;
          return Promise.resolve(true);
        } else {
          message.error(msg);
          gridOptions.loading = false;
          return Promise.reject(false);
        }
      }
    } else {
      gridOptions.loading = false;
      return Promise.reject(false);
    }
  }

  // const [registerModal, { openModal }] = useModal();

  watch(
    () => props.modelKey,
    () => loadData(),
  );

  onMounted(async () => {
    loadingRef.value = false;
    if (props.modelId) {
      // loadFormData();
    }
    await nextTick();
    loadData();
  });

  defineExpose({
    handleSubmit,
  });
</script>

<style lang="scss">
  .flow-variable-setting {
    border: 1px solid var(--border-color);
    border-top: 0;
    height: 100%;
    overflow-y: auto;
    max-width: 1200px;
    margin: auto;

    .variable-table {
      width: 100%;
      height: auto;
      flex: 1;
    }
  }
</style>
