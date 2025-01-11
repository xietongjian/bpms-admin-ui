import { OrderNoDefaultEnum } from '#/enums/commonEnum';
import type {VxeGridProps} from '#/adapter/vxe-table';
import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import { z } from '#/adapter/form';
export const columns: VxeGridProps['columns'] = [
  {
    title: '授权人',
    field: 'currUserName',
    width: 140,
    align: 'center',
    slots: { default: 'currUserName'}
  },
  {
    title: '被授权人',
    field: 'authUserName',
    width: 140,
    align: 'center',
    slots: { default: 'authUserName'}
  },
  {
    title: '授权流程模板名称',
    field: 'authFlowKeys',
    align: 'left',
    slots: {default: 'authFlowKeys'}
  },
  {
    title: '开始时间',
    field: 'startTime',
    width: 180,
    align: 'center',
  },
  {
    title: '结束时间',
    field: 'endTime',
    width: 180,
    align: 'center',
  },

  {
    field: 'action',
    fixed: 'right',
    slots: {default: 'action'},
    title: '操作',
    width: 120,
  },
  /*{
    title: '创建人',
    field: 'creator',
    width: 100,
    align: 'left',
  },
  {
    title: '创建时间',
    field: 'createTime',
    width: 150,
    align: 'center',
  },
  {
    title: '更新人',
    field: 'updator',
    width: 100,
    align: 'left',
  },
  {
    title: '更新时间',
    field: 'updateTime',
    width: 150,
    align: 'center',
  },*/
];

export const searchFormSchema: FormSchema[] = [
  {
    fieldName: 'keyword',
    label: '关键字',
    component: 'Input',
    componentProps: {
      placeholder: '请输入名称/编码',
      allowClear: true,
    },
    labelWidth: 60,
  },
];

export const formSchema: FormSchema[] = [
  {
    fieldName: 'id',
    label: '表id',
    component: 'Input',
    dependencies: {
      show: false,
      triggerFields: ["id"]
    }
  },
  {
    fieldName: 'currUser',
    label: '授权人',
    component: 'PersonalSelector',
    componentProps: {
      multiple: false,
    },
    rules: 'selectRequired'
  },
  {
    fieldName: 'authUser',
    label: '被授权人',
    component: 'PersonalSelector',
    componentProps: {
      multiple: false,
    },
    rules: 'selectRequired'
  },
  {
    fieldName: 'dateRange',
    label: '授权时间',
    component: 'RangePicker',
    rules: 'selectRequired'
  },
  {
    fieldName: 'authType',
    label: '授权范围',
    component: 'RadioButtonGroup',
    defaultValue: '1',
    componentProps: ({ formActionType }) => {
      return {
        options: [
          { label: '所有模板', value: '1' },
          { label: '指定模板', value: '0' },
        ],
      };
    },
  },
  {
    fieldName: 'authFlowKeys',
    label: '流程模板',
    required: ({ values }) => {
      return values.authType === '0';
    },
    component: 'ModelInfoSelector',
    show: ({ values }) => {
      return values.authType === '0';
    },
    componentProps: {
      multiple: true,
      title: '选择流程模板',
    },
  },
];
