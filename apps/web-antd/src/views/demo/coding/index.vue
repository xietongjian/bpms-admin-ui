<template>
  <Page>
    <!-- Reference SQL -->
    <div class="section">
      <div class="sql-hint">
        SELECT c.COLUMN_NAME, c.DATA_TYPE, c.IS_NULLABLE, c.CHARACTER_MAXIMUM_LENGTH,
        c.COLUMN_COMMENT, c.COLUMN_DEFAULT, c.COLUMN_KEY FROM information_schema.columns AS c WHERE
        c.table_schema = 'flow-6.6' AND c.table_name = 'tbl_privilege_login_log' ORDER BY
        c.ORDINAL_POSITION;
      </div>
    </div>

    <!-- TextArea to paste column definitions -->
    <div class="section">
      <a-textarea v-model:value="tableStrData" :auto-size="true" />
      <a-button type="primary" class="my-4" @click="genColumnList">
        解析字段
      </a-button>
    </div>

    <!-- Form for code generation parameters -->
    <div class="section">
      <BasicForm />
    </div>

    <!-- Editable Table for parsed columns -->
    <div class="section">
      <BasicTable :table-title="'数据库字段'" />
    </div>

    <!-- Tabs with generated code output -->
    <div class="bottom-section">
      <a-tabs>
        <a-tab-pane tab="index.vue" key="1">
          <a-button type="primary" class="my-4" @click="handleDownByData">
            index.vue文件下载
          </a-button>
          <br />
          <a-textarea v-model:value="indexVueCode" :auto-size="true" />
        </a-tab-pane>
        <a-tab-pane tab="data.ts" key="2">
          <a-button type="primary" class="my-4" @click="handleDataTsDownByData">
            data.ts文件下载
          </a-button>
          <br />
          <a-textarea v-model:value="dataTsCode" :auto-size="true" />
        </a-tab-pane>
        <a-tab-pane tab="Modal.vue" key="3">
          <a-button type="primary" class="my-4" @click="handleModalDownByData">
            Modal.vue文件下载
          </a-button>
          <br />
          <a-textarea v-model:value="modalVueCode" :auto-size="true" />
        </a-tab-pane>
        <a-tab-pane tab="api.ts" key="4">
          <a-button type="primary" class="my-4" @click="handleApiTsDownByData">
            api.ts文件下载
          </a-button>
          <br />
          <a-textarea v-model:value="apiTsCode" :auto-size="true" />
        </a-tab-pane>
        <a-tab-pane tab="model.ts" key="5">
          <a-button type="primary" class="my-4" @click="handleModelTsDownByData">
            Model.ts文件下载
          </a-button>
          <br />
          <a-textarea v-model:value="modelTsCode" :auto-size="true" />
        </a-tab-pane>
      </a-tabs>
    </div>
  </Page>
</template>

<script lang="ts" setup>
import { ref, unref } from 'vue';
import { Page } from '@vben/common-ui';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import type { VxeGridProps } from '#/adapter/vxe-table';
import { useVbenForm } from '#/adapter/form';
import { downloadByData } from '#/utils/file/download';

import genIndexVueCode from './index_vue';
import genIndexVueLeftTreeCode from './index_vue_left_tree';
import genDataTsCode from './data_ts';
import genModalVueCode from './Modal_vue';
import genApiTsCode from './api_ts';
import genModelTsCode from './Model_ts';
import { columnName2FieldName } from './utils';

const dataTypeMap: Record<string, string> = {
  varchar: 'Input',
  int: 'InputNumber',
  date: 'DatePicker',
  timestamp: 'DatePicker',
};

const componentItems = [
  { label: 'Input', value: 'Input' },
  { label: 'InputNumber', value: 'InputNumber' },
  { label: 'Select', value: 'Select' },
  { label: 'DatePicker', value: 'DatePicker' },
  { label: 'Switch', value: 'Switch' },
  { label: 'Checkbox', value: 'Checkbox' },
  { label: 'Textarea', value: 'Textarea' },
  { label: 'RadioGroup', value: 'RadioGroup' },
  { label: 'ApiSelect', value: 'ApiSelect' },
  { label: 'ApiTreeSelect', value: 'ApiTreeSelect' },
];

const formData = ref<Record<string, any>>({});
const indexVueCode = ref<string>('');
const dataTsCode = ref<string>('');
const modalVueCode = ref<string>('');
const apiTsCode = ref<string>('');
const modelTsCode = ref<string>('');

const tableStrData = ref<string>(
  'id\tvarchar\tNO\t40\t\t\\N\tPRI\n' +
    'name\tvarchar\tYES\t32\t名称\t\\N\t\n' +
    'url\tvarchar\tYES\t128\t链接\t\\N\t\n' +
    'sn\tvarchar\tYES\t64\t标识\t\\N\tMUL\n' +
    'component\tvarchar\tYES\t120\t组件\t\\N\t\n' +
    'status\tint\tYES\t\\N\t是否启用 ： 1启用；0禁用\t\\N\t\n' +
    'state\tvarchar\tYES\t100\t存放该模块有哪些权限值可选\t\\N\t\n' +
    'image\tvarchar\tYES\t200\t图片路径\t\\N\t\n' +
    'order_no\tint\tYES\t\\N\t模块的排序号\t\\N\t\n' +
    'pid\tvarchar\tYES\t40\t父模块id\t\\N\t\n' +
    'app_id\tvarchar\tYES\t40\t系统id\t\\N\t\n' +
    'is_show\tint\tYES\t\\N\t\t1\t\n' +
    'create_time\ttimestamp\tYES\t\\N\t创建时间\t\\N\t\n' +
    'creator\tvarchar\tYES\t32\t创建人\t\\N\t\n' +
    'update_time\ttimestamp\tYES\t\\N\t更新时间\t\\N\t\n' +
    'updator\tvarchar\tYES\t32\t更新人\t\\N\t\n' +
    'del_flag\tint\tYES\t\\N\t删除标识0:删除1：存在\t1\t',
);

function handleTableNameChange(e: any) {
  let tableName = e.target.value;
  tableName = tableName.replace('tbl_', '');
  let nameSplit = tableName.split('_');
  nameSplit = nameSplit.map((str) =>
    str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase()),
  );
  const className = nameSplit.join('');
  const lowerClassName = [...nameSplit];
  lowerClassName[0] = lowerClassName[0].toLowerCase();
  formApi.setValues({
    className,
    lowerClassName: lowerClassName.join(''),
  });
}

const [BasicForm, formApi] = useVbenForm({
  showDefaultActions: true,
  showResetButton: false,
  actionWrapperClass: 'justify-start',
  wrapperClass: 'grid-cols-8',
  schema: [
    {
      fieldName: 'dbName',
      component: 'Input',
      label: '数据库',
      defaultValue: 'flow-6.6',
      componentProps: { class: 'w-full' },
      formItemClass: 'col-span-2',
    },
    {
      fieldName: 'tableName',
      component: 'Input',
      label: '表名',
      rules: 'required',
      componentProps: {
        placeholder: '值改变时执行查询,查看控制台',
        class: 'w-full',
        onChange: handleTableNameChange,
      },
      formItemClass: 'col-span-2',
    },
    {
      fieldName: 'module',
      component: 'Input',
      label: '模块',
      rules: 'required',
      componentProps: { class: 'w-full' },
      formItemClass: 'col-span-2',
    },
    {
      fieldName: 'className',
      component: 'Input',
      label: '类名',
      rules: 'required',
      componentProps: { class: 'w-full' },
      formItemClass: 'col-span-2',
    },
    {
      fieldName: 'lowerClassName',
      component: 'Input',
      label: '类名小写',
      rules: 'required',
      componentProps: { class: 'w-full' },
      formItemClass: 'col-span-2',
    },
    {
      fieldName: 'showLeftTree',
      component: 'Switch',
      label: '显示左侧树',
      formItemClass: 'col-span-1',
    },
    {
      fieldName: 'leftTree',
      component: 'Select',
      label: '左侧树',
      dependencies: {
        show: (model) => model.showLeftTree === true,
      },
      componentProps: {
        class: 'w-full',
        options: [
          { label: '公司树', value: 'CompanyTree' },
          { label: '组织树', value: 'OrgTree' },
          { label: '流程分类树', value: 'FlowCategoryTree' },
        ],
      },
      formItemClass: 'col-span-3',
    },
  ],
  handleSubmit: submitForm,
});

const vxeColumns: VxeGridProps['columns'] = [
  { title: '字段名', field: 'columnName', width: 150, align: 'left' },
  { title: '数据类型', field: 'dataType', width: 80, align: 'left' },
  {
    title: '描述',
    field: 'comment',
    align: 'left',
    editRender: { name: 'input' },
  },
  {
    title: '控件类型',
    field: 'formType',
    width: 180,
    align: 'left',
    editRender: {
      name: '$select',
      options: componentItems,
    },
  },
  {
    title: '验证规则',
    field: 'ruleType',
    width: 140,
    align: 'left',
    editRender: {
      name: '$select',
      options: [
        { label: '名称', value: 'name' },
        { label: '标识', value: 'code' },
        { label: '备注', value: 'remark' },
      ],
    },
  },
  {
    title: '是否必填',
    field: 'required',
    width: 120,
    align: 'left',
    editRender: { name: '$switch' },
    formatter: ({ cellValue }: { cellValue: any }) =>
      cellValue ? '是' : '否',
  },
  {
    title: '表格显示',
    field: 'showInTable',
    width: 120,
    align: 'left',
    editRender: { name: '$switch' },
    formatter: ({ cellValue }: { cellValue: any }) =>
      cellValue ? '是' : '否',
  },
  {
    title: '表单显示',
    field: 'showInForm',
    width: 120,
    align: 'left',
    editRender: { name: '$switch' },
    formatter: ({ cellValue }: { cellValue: any }) =>
      cellValue ? '是' : '否',
  },
  { title: '字段长度', field: 'fieldLength', width: 80, align: 'left' },
  { title: '默认值', field: 'defaultValue', width: 80, align: 'left' },
];

const [BasicTable, tableApi] = useVbenVxeGrid({
  gridOptions: {
    columns: vxeColumns,
    pagerConfig: { enabled: false },
    border: true,
    editConfig: {
      trigger: 'click',
      mode: 'row',
    },
    validConfig: {
      autoPos: true,
      showMessage: true,
    },
    toolbarConfig: { enabled: false },
  },
});

async function submitForm() {
  try {
    const values = await formApi.validate();
    formData.value = values;
    const { fullData } = tableApi.grid?.getTableData() || { fullData: [] };
    values.fields = fullData;

    let indexCode = '';
    if (values.showLeftTree) {
      indexCode = genIndexVueLeftTreeCode(values);
    } else {
      indexCode = genIndexVueCode(values);
    }

    indexVueCode.value = indexCode;
    dataTsCode.value = genDataTsCode(values);
    modalVueCode.value = genModalVueCode(values);
    apiTsCode.value = genApiTsCode(values);
    modelTsCode.value = genModelTsCode(values);
  } catch (error) {
    console.error(error);
  }
}

function genColumnList() {
  const fieldsArr = tableStrData.value.split('\n');
  const tableData = fieldsArr.map((item) => {
    let fieldValueArr = item.split('\t');
    fieldValueArr = fieldValueArr.map((item) => (item === '\\N' ? '' : item));
    const [columnName, dataType, isNullable, fieldLength, comment, defaultValue, columnKey] =
      fieldValueArr;
    let ruleType = '';
    if (columnName.indexOf('name') !== -1) {
      ruleType = 'name';
    }
    if (columnName.indexOf('sn') !== -1 || columnName.indexOf('code') !== -1) {
      ruleType = 'code';
    }
    if (
      columnName.indexOf('remark') !== -1 ||
      columnName.indexOf('note') !== -1 ||
      columnName.indexOf('desc') !== -1
    ) {
      ruleType = 'remark';
    }
    const showInForm =
      columnName !== 'create_time' &&
      columnName !== 'creator' &&
      columnName !== 'update_time' &&
      columnName !== 'updator' &&
      columnName !== 'del_flag';
    return {
      columnName,
      fieldName: columnName2FieldName(columnName),
      dataType,
      ruleType,
      formType: dataTypeMap[dataType],
      required: isNullable === 'NO',
      showInTable: columnKey !== 'PRI' && columnName !== 'del_flag',
      showInForm,
      fieldLength,
      comment,
      defaultValue,
      isPrimary: columnKey === 'PRI',
    };
  });
  tableApi.grid?.loadData(tableData);
}

function handleDownByData() {
  downloadByData(indexVueCode.value, 'index.vue');
}

function handleModalDownByData() {
  downloadByData(
    modalVueCode.value,
    `${unref(formData).className}Modal.vue`,
  );
}

function handleDataTsDownByData() {
  downloadByData(
    dataTsCode.value,
    `${unref(formData).lowerClassName}.data.ts`,
  );
}

function handleApiTsDownByData() {
  downloadByData(
    apiTsCode.value,
    `${unref(formData).lowerClassName}.ts`,
  );
}

function handleModelTsDownByData() {
  downloadByData(
    modelTsCode.value,
    `${unref(formData).lowerClassName}Model.ts`,
  );
}
</script>

<style lang="less" scoped>
:deep(.section) {
  padding: 10px;
  margin: 16px 16px 12px 16px;
  background: var(--bg-color-container);
  border-radius: 3px;
}

.sql-hint {
  padding: 12px;
  font-family: monospace;
  font-size: 13px;
  color: var(--text-color-secondary);
  white-space: pre-wrap;
  word-break: break-all;
  background: var(--bg-color-page);
  border-radius: 3px;
}

.my-4 {
  margin-top: 16px;
  margin-bottom: 16px;
}

.bottom-section {
  padding: 10px;
  margin: 0 16px 16px 16px;
  background: var(--bg-color-container);
  border-radius: 3px;
}
</style>
