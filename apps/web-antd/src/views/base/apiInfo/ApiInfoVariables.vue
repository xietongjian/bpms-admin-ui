<template>
  <div class="w-full h-full">
    <BasicTable :loading="true" ref="tableRef" class="variable-table !py-1 !px-0" v-bind="gridOptions">
      <template #action="{ row }">
        <TableAction outside :actions="createActions(row)" />
      </template>
      <template #requiredOpen="{ row }">
        <Switch v-model:checked="row.required" />
      </template>
    </BasicTable>

    <div class="w-[500px] m-auto" >
      <Button
          :loading="gridOptions.loading"
          type="dashed"
          class="w-full"
          @click="handleAddRow">添加变量</Button>
      <!--      <a-button type="primary" style="width: 100%;" @click="handleSubmit">保存</a-button>-->
    </div>
    <div class="h-3"></div>
  </div>
</template>
<script lang="ts" setup>
import { defineComponent, reactive, ref, unref, watch, onMounted, computed, nextTick } from 'vue';
import { vxeFlowVariableTableColumns } from './apiInfo.data';
import {Tag, Button, message, Switch} from 'ant-design-vue';
import {useVbenVxeGrid} from '#/adapter/vxe-table';
import {TableAction} from '#/components/table-action';

defineComponent({
  name: 'ApiVariableSetting',
});

const props = defineProps({
  variables: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'query',
  }
});

const loadingRef = ref(false);

const tableRef = ref<any>();

vxeFlowVariableTableColumns.forEach(item => {
  if(item.field === 'required'){
    return;
    if(props.type === 'path'){
      delete item.editRender;
    } else {
      item.editRender = {
        name: 'ASwitch',
        placeholder: '请点击输入',
        defaultValue: false,
      };
    }
  }
});

const gridOptions = reactive<any>({
  id: 'VxeTable-' + (new Date().getTime()),
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
  toolbarConfig: {
    enabled: false,
  },
  pagerConfig: {
    enabled: false,
  },
  formConfig: {
    enabled: false,
    items: [],
  },
  editConfig: {
    trigger: 'click',
    mode: 'row',
    drag: true,
  },
  validConfig: {
    autoPos: true,
    showMessage: true,
  },
  editRules: {
    label: [{ required: true, message: '请输入字段名' }],
    field: [
      { required: true, message: '请输入字段标识' },
      { pattern: '^[a-zA-Z_$][a-zA-Z\\d_$]*$', message: '格式不正确' },
      {
        validator({ cellValue }) {
          const { fullData } = tableRef.value?.getTableData();
          // 判断是否有重复的key
          const keyMap = {};
          for (let item of fullData) {
            if (!item.field) {
              return new Error('存在重复的字段标识');
            }
            if (keyMap[item.field]) {
              message.error({
                content: '存在重复的字段标识',
                style: { marginTop: '40px' },
              });
              return new Error('存在重复的变量标识');
            }
            keyMap[item.field] = true;
          }
        },
      },
    ],
  },
});

const [BasicTable, tableApi] = useVbenVxeGrid({gridOptions});

onMounted(async () => {
  await nextTick();
  loadData();
});

async function loadData() {
  // debugger;
  tableRef.value?.remove();
  if (!props.variables) {
    return;
  }
  const variablesData = JSON.parse(props.variables);
  gridOptions.loading = true;
  if (variablesData) {
    variablesData.forEach((item) => {
      tableRef.value?.insertAt(item, -1);
    });
  }
  gridOptions.loading = false;
}

function handleAddRow() {
  const emptyRow = {
    field: undefined,
    label: undefined,
    required: props.type === 'path',
    helpMessage: undefined,
    defaultValue: undefined
  };
  tableApi.grid?.insertAt(emptyRow, -1);
}

const createActions = (record) => {
  const actions: any[] = [
    {
      label: '删除',
      danger: true,
      popConfirm: {
        placement: 'left',
        title: '是否确认删除',
        confirm: () => {
          return tableApi.grid?.remove(record);
        },
        okButtonProps: {
          danger: true
        }
      },
    },
  ];
  return actions;
};
watch(
    () => props.variables,
    (newVal, oldVal) => {
      loadData();
    },
);

async function handleSubmit() {
  gridOptions.loading = true;
  const $table = tableRef.value;
  if ($table) {
    const errMap = await $table.validate();
    if (errMap) {
      gridOptions.loading = false;
    } else {
      const { fullData } = tableRef.value?.getTableData();
      // 判断是否有重复的key
      const keyMap = {};
      for (let item of fullData) {
        if (keyMap[item.field]) {
          message.error({ content: '存在重复的变量标识', style: { marginTop: '40px' } });
          gridOptions.loading = false;

          return Promise.reject('存在重复的变量标识');
        }
        keyMap[item.field] = true;
      }
      const resultData = fullData.map((item) => {
        return {
          field: item.field,
          label: item.label,
          required: item.required,
          helpMessage: item.helpMessage,
          defaultValue: item.defaultValue,
        };
      });
      gridOptions.loading = false;
      return Promise.resolve(resultData);
    }
  } else {
    gridOptions.loading = false;
    return Promise.reject(false);
  }
}

defineExpose({
  handleSubmit,
});
</script>
<style lang="scss">
.api-variable-setting {
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
