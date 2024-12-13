import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import {FormValidPatternEnum} from "#/enums/commonEnum";
import { z } from '#/adapter/form';
import type {VxeGridProps} from '#/adapter/vxe-table';
import { OrderNoDefaultEnum } from '#/enums/constantEnum';
// import {uploadApi} from "#/api/sys/upload";

const colProps = {
  span: 24,
};
export const columns: VxeGridProps['columns'] = [
  {
    title: '图标名称',
    field: 'name',
    width: 100,
    align: 'center',
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

export const iconCategoryFormSchema: FormSchema[] = [
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

export const iconInfoFormSchema: FormSchema[] = [
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
    label: '图标名称',
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
    fieldName: 'sn',
    label: '标识',
    required: true,
    component: 'Input',
    /*rules: [
      {
        required: true,
        whitespace: true,
        message: '标识不能为空！',
      },
      {
        max: 255,
        message: '标识长度不能大于255！',
      },
    ],*/
    colProps,
  },
  {
    fieldName: 'icon',
    label: '图标',
    component: 'Input',
    slot: 'iconImg',
    colProps: {
      style: '',
      span: 10,
    },
  },
  /*{
    field: 'icon',
    label: '图标',
    required: false,
    component: 'ImageUpload',
    show: true,
    componentProps: {
      api: uploadApi,
      name: 'file',
      maxCount: 1,
      listType: 'picture-card',
      maxSize: 1,
      maxNumber: 1,
      multiple: false,
      helpText: '(仅支持gif,png)大小不超过1M，建议上传尺寸(像素)：200px*200px',
      accept: ['gif', 'png'],
    },
    colProps: {
      span: 12,
    },
  },*/
];
