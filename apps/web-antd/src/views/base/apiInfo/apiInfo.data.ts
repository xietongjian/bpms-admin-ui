import { OrderNoDefaultEnum, RemarkDefaultEnum } from '#/enums/constantEnum';
import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import {FormValidPatternEnum} from "#/enums/commonEnum";
import { z } from '#/adapter/form';
import type {VxeGridProps} from '#/adapter/vxe-table';

// import { CodeEditor, MODE } from '#/components/CodeEditor';

import { Tag } from 'ant-design-vue';
import { h } from 'vue';

const colProps = {
  span: 24,
};
export const columns: VxeGridProps['columns'] = [
  {
    title: '接口名',
    field: 'name',
    align: 'left',
    resizable: true,
  },
  {
    title: '请求方式',
    field: 'method',
    align: 'left',
    width: 90,
    customRender: ({ record }) => {
      const { method } = record;
      let color = '';
      if (method === 'POST') {
        color = 'green';
      } else if (method === 'GET') {
        color = 'lime';
      } else {
        color = 'blue';
      }
      return h(Tag, { color: color }, () => method);
    },
  },
  {
    title: '请求地址',
    field: 'url',
    width: 150,
    align: 'left',
    resizable: true,
  },
  {
    title: '所属分类',
    field: 'categoryId',
    width: 120,
    align: 'left',
  },
  {
    title: '排序号',
    field: 'orderNo',
    width: 120,
    align: 'left',
  },
  {
    title: '创建时间',
    field: 'createTime',
    width: 180,
  },
  {
    title: '接口描述',
    field: 'remark',
    align: 'left',
    width: 180,
  },
  {
    field: 'action',
    fixed: 'right',
    slots: {default: 'action'},
    title: '操作',
    width: 120,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    fieldName: 'keyword',
    label: '关键字',
    component: 'Input',
    componentProps: {
      placeholder: '请输入名称/标识',
    },
    labelWidth: 60,
    colProps: {
      span: 8,
      lg: { span: 8, offset: 0 },
      sm: { span: 10, offset: 0 },
      xs: { span: 16, offset: 0 },
    },
  },
];

export const apiCategoryFormSchema: FormSchema[] = [
  {
    fieldName: 'id',
    label: 'ID',
    component: 'Input',
    show: false,
  },
  {
    fieldName: 'pid',
    label: '父级分类',
    component: 'TreeSelect',
    show: ({ values }) => {
      return !!values.pid && !values.id;
    },
    componentProps: {
      fieldNames: {
        label: 'name',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
    colProps: { span: 24 },
  },
  {
    fieldName: 'name',
    label: '分类名称',
    required: true,
    component: 'Input',
    /*rules: [
      {
        required: true,
        whitespace: true,
        message: '分类名称不能为空！',
      },
      {
        max: 255,
        message: '分类名称长度不能大于255！',
      },
    ],*/
    colProps,
  },
  {
    fieldName: 'orderNo',
    label: '排序号',
    helpMessage: '数值越小越靠前！',
    required: false,
    component: 'InputNumber',
    defaultValue: OrderNoDefaultEnum.VALUE,
    componentProps: {
      min: OrderNoDefaultEnum.MIN,
      max: OrderNoDefaultEnum.MAX,
    },
  },
];

export const apiInfoFormSchema: FormSchema[] = [
  {
    fieldName: 'id',
    label: 'ID',
    component: 'Input',
    show: false,
  },
  {
    fieldName: 'categoryId',
    label: '分类',
    required: true,
    component: 'TreeSelect',
    componentProps: {
      fieldNames: {
        label: 'name',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
    colProps: { span: 16 },
  },
  {
    fieldName: 'name',
    label: '接口名称',
    required: true,
    component: 'Input',
    /*rules: [
      {
        required: true,
        whitespace: true,
        message: '名称不能为空！',
      },
      {
        max: 255,
        message: '名称长度不能大于255！',
      },
    ],*/
    colProps,
  },
  {
    fieldName: 'remark',
    label: '接口描述',
    required: false,
    component: 'InputTextArea',
    componentProps: {
      autoSize: {
        minRows: RemarkDefaultEnum.MIN_ROWS,
        maxRows: RemarkDefaultEnum.MAX_ROWS,
      },
    },
    colProps,
  },
  {
    fieldName: 'method',
    label: '请求地址',
    required: true,
    defaultValue: 'GET',
    fields: ['url'],
    // defaultValueObj: { method: 'GET', url: ''},
    component: 'Input',
    slot: 'urlSlot',
    colProps,
  },
  {
    fieldName: 'headers',
    label: '请求头参数',
    required: false,
    slot: 'headersSlot',
    colProps,
  },
  {
    fieldName: 'pathVariables',
    label: '路径参数',
    required: false,
    slot: 'pathVariablesSlot',
    colProps,
  },
  {
    fieldName: 'queryVariables',
    label: '查询参数',
    required: false,
    slot: 'queryVariablesSlot',
    component: 'Input',
    colProps,
  },
  {
    fieldName: 'requestBody',
    label: '请求体',
    // slot: 'requestBodySlot',
    required: false,
    component: 'Input',
    render: ({ model, field }) => {
      return h(CodeEditor, {
        style: "border: 1px solid rgb(217, 217, 217);",
        value: model[field],
        mode: MODE.JSON,
        onChange: (value: string) => {
          model[field] = value;
        },
        config: {
          tabSize: 10,
        },
      });
    },
    colProps,
  },
  {
    fieldName: 'responseBodyCase',
    label: '响应示例',
    required: false,
    component: 'Input',
    render: ({ model, field }) => {
      return h(CodeEditor, {
        style: "border: 1px solid rgb(217, 217, 217);",
        value: model[field],
        mode: MODE.JSON,
        onChange: (value: string) => {
          model[field] = value;
        },
        config: {
          tabSize: 10,
        },
      });
    },
    colProps,
  },
];

export const vxeFlowVariableTableColumns = [
  {
    title: '序号',
    type: 'seq',
    fixed: 'left',
    width: '48',
    align: 'center',
  },
  {
    title: '字段标识',
    width: 120,
    field: 'field',
    align: 'left',
    editRender: {
      name: 'AInput',
      placeholder: '请点击输入',
    },
  },
  {
    title: '字段名',
    field: 'label',
    align: 'left',
    editRender: {
      name: 'AInput',
      placeholder: '请点击输入',
    },
  },
  {
    title: '是否必填',
    width: 90,
    field: 'required',
    align: 'center',
    slots: { default: 'requiredRender' },
    editRender: {
      name: 'ASwitch',
      placeholder: '请点击输入',
      defaultValue: false,
    },
  },
  {
    title: '字段描述',
    field: 'helpMessage',
    align: 'left',
    editRender: {
      name: 'AInput',
      placeholder: '请点击输入',
    },
  },
  {
    title: '默认值',
    field: 'defaultValue',
    align: 'left',
    editRender: {
      name: 'AInput',
      placeholder: '请点击输入',
    },
  },
  {
    width: 60,
    title: '操作',
    align: 'center',
    slots: { default: 'action' },
    fixed: 'center',
  },
];
