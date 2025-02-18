import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import { z } from '#/adapter/form';
import type {VxeGridProps} from '#/adapter/vxe-table';
import {h} from "vue";

export const backToStepTableColumns: VxeGridProps['columns'] = [
  {
    title: '节点名称',
    field: 'nodeName',
    align: 'left',
  },
  {
    title: '审批人姓名',
    field: 'userName',
    width: 120,
    align: 'left',
  },
  {
    title: '审批人工号',
    field: 'userCode',
    width: 120,
    align: 'left',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    fieldName: 'keyword',
    label: '关键字',
    component: 'Input',
    componentProps: {
      placeholder: '请输入名称/标识',
      allowClear: true,
    },
    labelWidth: 60,
  },
];

export const approveActionFormSchema: FormSchema[] = [
  {
    fieldName: 'actionType',
    label: 'actionType',
    component: 'Input',
    dependencies: {
      show: false,
      triggerFields: ['actionType']
    }
  },
  {
    fieldName: 'taskId',
    label: 'taskId',
    component: 'Input',
    dependencies: {
      show: false,
      triggerFields: ['taskId']
    }
  },
  {
    fieldName: 'procInstId',
    label: 'procInstId',
    component: 'Input',
    dependencies: {
      show: false,
      triggerFields: ['procInstId']
    }
  },

  {
    fieldName: 'actionPersonal',
    label: '选择操作人员',
    component: 'PersonalSelector',
    componentProps: {
      multiple: true,
      class: 'w-full'
    },
    rules: "selectRequired"
  },

  {
    fieldName: 'signType',
    component: 'Input',
    label: ' ',
    suffix: () => h('span', { class: 'text-red-600' }, '加签审批完成之后是否流转到我审批'),
    /*renderComponentContent: () => ({
      prefix: () => 'prefix',
      suffix: () => 'suffix',
    }),*/
    dependencies: {
      if: (values)=> values.actionType === 'addsign',
      triggerFields: ['signType']
    },
  },
  {
    fieldName: 'message',
    label: '审批意见',
    component: 'Textarea',
    rules: z
        .string({required_error: '审批意见不能为空！'})
        .min(1, {message: '审批意见不能为空！'})
        .max(4000, '字符长度不能大于4000！'),
    componentProps: {
      autoSize: {
        minRows: 2,
        maxRows: 10,
      },
    },
  },
];
export const fetchBackMessageFormSchema: FormSchema[] = [
  {
    fieldName: 'id',
    label: 'id',
    component: 'Input',
    dependencies: {
      show: false,
      triggerFields: ['id']
    }
  },
  {
    fieldName: 'taskId',
    label: 'taskId',
    component: 'Input',
    dependencies: {
      show: false,
      triggerFields: ['taskId']
    }
  },
  {
    fieldName: 'message',
    label: '审批意见',
    component: 'Textarea',
    rules: z
        .string({required_error: '审批意见不能为空！'})
        .min(1, {message: '审批意见不能为空！'})
        .max(4000, '字符长度不能大于4000！'),
    componentProps: {
      autoSize: {
        minRows: 2,
        maxRows: 10,
      },
    },
  },
];

export const approveBackToStepFormSchema: FormSchema[] = [
  {
    fieldName: 'actionType',
    label: 'actionType',
    component: 'Input',
    dependencies: {
      show: false,
      triggerFields: ['taskId']
    }
  },
  {
    fieldName: 'taskId',
    label: 'taskId',
    component: 'Input',
    dependencies: {
      show: false,
      triggerFields: ['taskId']
    }
  },
  {
    fieldName: 'procInstId',
    label: 'procInstId',
    component: 'Input',
    dependencies: {
      show: false,
      triggerFields: ['taskId']
    }
  },

  {
    fieldName: 'message',
    label: '驳回意见',
    component: 'Textarea',
    rules: z
        .string({required_error: '审批意见不能为空！'})
        .min(1, {message: '审批意见不能为空！'})
        .max(4000, '字符长度不能大于4000！'),
    componentProps: {
      autoSize: {
        minRows: 2,
        maxRows: 10,
      },
    },
  },
  {
    fieldName: 'backToStepNodeList',
    label: '选择驳回节点',
    component: 'Input',
    defaultValue: '0',
    formItemClass: '!items-start',
  },
];
