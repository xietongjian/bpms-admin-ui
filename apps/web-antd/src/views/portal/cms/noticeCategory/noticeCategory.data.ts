import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import {FormValidPatternEnum} from "#/enums/commonEnum";
import { z } from '#/adapter/form';
import type {VxeGridProps} from '#/adapter/vxe-table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { OrderNoDefaultEnum, RemarkDefaultEnum } from '#/enums/commonEnum';
// import {baseColumns} from "#/utils";

export const columns: VxeGridProps['columns'] = [
  {
    title: '名称',
    field: 'name',
    minWidth: 200,
    align: 'left',
    slots: { customRender: 'nameRender' },
    resizable: true,
  },
  {
    title: '标识',
    field: 'sn',
    width: 100,
    align: 'left',
  },
  /*{
    title: '是否关联主体的签发人',
    field: 'refSubjectSigner',
    width: 100,
    align: 'center',
    customRender: ({record}) => {
      const enable = record.refSubjectSigner;
      const color = enable ? 'green' : 'red';
      const text = enable ? '是' : '否';
      return h(Tag, {color: color}, () => text);
    },
  },
  {
    title: '是否有签发人',
    field: 'haveSigner',
    width: 100,
    align: 'center',
    customRender: ({record}) => {
      const enable = record.haveSigner;
      const color = enable ? 'green' : 'red';
      const text = enable ? '是' : '否';
      return h(Tag, {color: color}, () => text);
    },
  },*/
  {
    title: '排序号',
    field: 'orderNo',
    width: 100,
    align: 'left',
  },
  {
    title: '签发人姓名',
    field: 'signerName',
    width: 100,
    align: 'left',
    slots: { customRender: 'signerNameRender' },
  },
  {
    title: '启用状态',
    field: 'status',
    width: 100,
    align: 'center',
    customRender: ({ record }) => {
      const enable = record.status;
      const color = enable ? 'green' : 'red';
      const text = enable ? '启用' : '停用';
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: '备注',
    field: 'remark',
    width: 100,
    align: 'left',
  },
  {
    title: '操作',
    width: 120,
    align: 'center',
    slots: { default: 'action' },
    fixed: 'right',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    fieldName: 'keyword',
    label: '关键字',
    component: 'Input',
    componentProps: {
      placeholder: '请输入名称',
    },
    labelWidth: 60,
    // colProps: {
    //   span: 6,
    //   lg: { span: 6, offset: 0 },
    //   sm: { span: 10, offset: 0 },
    //   xs: { span: 16, offset: 0 },
    // },
  },
];

export const formSchema: FormSchema[] = [
  {
    fieldName: 'id',
    label: '主键',
    required: false,
    component: 'Input',
    show: false,
  },
  {
    fieldName: 'pid',
    label: '父级ID',
    required: false,
    component: 'Input',
    show: false,
  },
  {
    fieldName: 'name',
    label: '名称',
    required: true,
    component: 'Input',
    show: true,
    /*rules: [
      {
        required: true,
        whitespace: true,
        message: '名称不能为空！',
      },
      {
        max: 260,
        message: '字符长度不能大于260！',
      },
    ],*/
  },
  {
    fieldName: 'sn',
    label: '标识',
    required: true,
    component: 'Input',
    show: true,
  },
  {
    fieldName: 'style',
    label: '样式',
    required: false,
    component: 'Input',
    slot: 'styleRenderSlot',
    show: true,
  },
  {
    fieldName: 'haveSigner',
    label: '是否有签发人',
    colProps: { span: 6 },
    required: false,
    component: 'Switch',
    defaultValue: false,
    show: true,
    componentProps: {
      checkedChildren: '是',
      unCheckedChildren: '否',
    },
  },
  {
    fieldName: 'refSubjectSigner',
    component: 'RadioGroup',
    label: '',
    colProps: { span: 10 },
    defaultValue: true,
    componentProps: {
      options: [
        {
          label: '关联主体的签发人',
          value: true,
        },
        {
          label: '自定义',
          value: false,
        },
      ],
    },
    show: ({ values }) => {
      return !!values.haveSigner;
    },
    dynamicRules: ({ values }) => {
      return values.haveSigner ? [{ required: true, message: '请选择签发人类型' }] : [];
    },
  },
  {
    fieldName: 'signerSelector',
    label: '',
    colProps: { span: 6 },
    labelWidth: 0,
    required: false,
    component: 'PersonalSelector',
    componentProps: {
      placeholder: '请选择签发人',
    },
    show: ({ values }) => {
      return values.haveSigner && !values.refSubjectSigner;
    },
    dynamicRules: ({ values }) => {
      return values.haveSigner && !values.refSubjectSigner
        ? [{ required: true, message: '请选择签发人' }]
        : [];
    },
  },
  {
    fieldName: 'status',
    label: '启用状态',
    required: false,
    component: 'Switch',
    defaultValue: true,
    show: true,
    componentProps: {
      checkedChildren: '启用',
      unCheckedChildren: '禁用',
    },
  },
  {
    fieldName: 'orderNo',
    label: '排序号',
    helpMessage: '数值越小越靠前！',
    required: false,
    component: 'InputNumber',
    show: true,
    colProps: {
      span: 10,
    },
    defaultValue: OrderNoDefaultEnum.VALUE,
    componentProps: {
      min: OrderNoDefaultEnum.MIN,
      max: OrderNoDefaultEnum.MAX,
    },
  },
  {
    fieldName: 'remark',
    label: '备注',
    required: false,
    component: 'InputTextArea',
    show: true,
/*    rules: [
      {
        max: 512,
        message: '字符长度不能大于512！',
      },
    ],*/
    colProps: {
      span: 22,
    },
    componentProps: {
      autoSize: {
        minRows: RemarkDefaultEnum.MIN_ROWS,
        maxRows: RemarkDefaultEnum.MAX_ROWS,
      },
    },
  },
];
