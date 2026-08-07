import { OrderNoDefaultEnum, RemarkDefaultEnum } from '#/enums/commonEnum';
import type { VbenFormSchema as FormSchema } from '@vben/common-ui';
import { z } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';
import { getDocCateListData } from '#/api/base/docManage';

export const columns: VxeGridProps['columns'] = [
  {
    title: '标题',
    field: 'title',
    align: 'left',
    resizable: true,
    minWidth: 200,
    showHeaderOverflow: true,
  },
  {
    title: '文档分类',
    field: 'docCateId',
    align: 'left',
    width: 120,
    showHeaderOverflow: true,
  },
  {
    title: '排序号',
    field: 'orderNo',
    align: 'right',
    width: 80,
    showHeaderOverflow: true,
  },
  {
    title: '状态',
    field: 'status',
    width: 70,
    showHeaderOverflow: true,
    slots: { default: 'status' },
  },
  {
    title: '创建人',
    field: 'creator',
    width: 140,
    showHeaderOverflow: true,
  },
  {
    title: '创建时间',
    field: 'createTime',
    width: 160,
    showHeaderOverflow: true,
  },
  {
    title: '修改人',
    field: 'updator',
    width: 140,
    showHeaderOverflow: true,
  },
  {
    title: '修改时间',
    field: 'updateTime',
    width: 160,
    showHeaderOverflow: true,
  },
  {
    title: '备注',
    field: 'remark',
    align: 'left',
    minWidth: 120,
    showHeaderOverflow: true,
  },
  {
    field: 'action',
    fixed: 'right',
    slots: { default: 'action' },
    title: '操作',
    width: 160,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    fieldName: 'keyword',
    label: '关键字',
    component: 'Input',
    componentProps: {
      placeholder: '请输入关键字',
      allowClear: true,
    },
    labelWidth: 60,
  },
];

export const docCateFormSchema: FormSchema[] = [
  {
    fieldName: 'id',
    label: 'ID',
    component: 'Input',
    dependencies: {
      show: false,
      triggerFields: ['id'],
    },
  },
  {
    fieldName: 'pid',
    label: '父级分类',
    component: 'TreeSelect',
    dependencies: {
      show: ({ values }) => {
        return !!values.pid && !values.id;
      },
      triggerFields: ['pid', 'id'],
    },
    componentProps: {
      fieldNames: {
        label: 'name',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
  },
  {
    fieldName: 'cateName',
    label: '分类名称',
    component: 'Input',
    rules: z
      .string({ required_error: '分类名称不能为空' })
      .trim()
      .min(1, '分类名称不能为空')
      .max(255, '分类名称长度不能大于255！'),
  },
  {
    fieldName: 'orderNo',
    label: '排序号',
    help: '数值越小越靠前！',
    component: 'InputNumber',
    defaultValue: OrderNoDefaultEnum.VALUE,
    componentProps: {
      min: OrderNoDefaultEnum.MIN,
      max: OrderNoDefaultEnum.MAX,
    },
  },
];

export const docManageFormSchema: FormSchema[] = [
  {
    fieldName: 'id',
    label: 'ID',
    component: 'Input',
    dependencies: {
      show: false,
      triggerFields: ['id'],
    },
  },
  {
    fieldName: 'docCateId',
    label: '分类',
    component: 'ApiTreeSelect',
    componentProps: {
      api: getDocCateListData,
      treeDataSimpleMode: { id: 'id', pId: 'pid', rootPid: null },
      fieldNames: {
        label: 'cateName',
        value: 'id',
      },
      getPopupContainer: () => document.body,
      class: 'w-full',
    },
    wrapperClass: 'w-full',
    formItemClass: 'w-full',
    rules: 'selectRequired',
  },
  {
    fieldName: 'title',
    label: '标题',
    component: 'Input',
    rules: z
      .string({ required_error: '标题不能为空' })
      .trim()
      .min(1, '标题不能为空')
      .max(255, '标题长度不能大于255！'),
  },
  {
    fieldName: 'orderNo',
    label: '排序号',
    help: '数值越小越靠前！',
    component: 'InputNumber',
    defaultValue: OrderNoDefaultEnum.VALUE,
    componentProps: {
      min: OrderNoDefaultEnum.MIN,
      max: OrderNoDefaultEnum.MAX,
    },
  },
  {
    fieldName: 'remark',
    label: '文档简介',
    component: 'Textarea',
    componentProps: {
      autoSize: {
        minRows: RemarkDefaultEnum.MIN_ROWS,
        maxRows: RemarkDefaultEnum.MAX_ROWS,
      },
    },
  },
  {
    fieldName: 'content',
    label: '文档内容',
    component: 'Textarea',
    componentProps: {
      autoSize: {
        minRows: 10,
        maxRows: 30,
      },
    },
  },
];
