import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import {z} from '#/adapter/form';
import type {VxeGridProps} from '#/adapter/vxe-table';
import {h, markRaw} from "vue";
import Upload from "#/views/components/common/widgets/upload/index.vue";
import Esign from "#/views/components/common/widgets/esign/index.vue";

/**
 * 审批意见
 */
export const approveMsgSchemas: FormSchema[] = [
  {
    fieldName: 'attachmentList',
    modelPropName: 'value',
    defaultValue: [],
    disabledOnChangeListener: false,
    component: markRaw(Upload),
    wrapperClass: 'approve-attachment-wrapper',
    formItemClass: 'approve-attachment-form-item'
    /**
     * .ant-upload-select {
     *     position: absolute;
     *     bottom: 48px;
     *     right: 20px;
     *     z-index: 9;
     *   }
     */
  },
  {
    fieldName: 'signImg',
    modelPropName: 'value',
    label: '',
    defaultValue: '',
    disabledOnChangeListener: false,
    component: markRaw(Esign),
    wrapperClass: 'approve-sign-wrapper',
    formItemClass: 'absolute bottom-[35px] right-[50px] z-10'
  },
  {
    fieldName: 'approveMsg',
    label: '',
    component: 'Textarea',
    componentProps: {
      placeholder: '请输入审批意见！',
      autoSize: {
        minRows: 3,
        maxRows: 5,
      },
      resizable: false,
    },
    rules: z
      .string({
        required_error: '审批意见不能为空！'
      })
      .min(1, "审批意见不能为空！")
      .max(4000, "字符长度不能大于4000！"),
    labelWidth: 0,
  },
];


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
    fieldName: 'actionType',
    label: 'actionType',
    component: 'Input',
    dependencies: {
      show: false,
      triggerFields: ['actionType']
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
    suffix: () => h('span', {class: 'text-red-600'}, '加签审批完成之后是否流转到我审批'),
    dependencies: {
      if: (values) => values.actionType === 'addsign',
      triggerFields: ['signType']
    },
  },
  {
    fieldName: 'attachmentList',
    modelPropName: 'value',
    defaultValue: [],
    disabledOnChangeListener: false,
    component: markRaw(Upload),
    wrapperClass: 'approve-attachment-wrapper ![&_.ant-upload-select]:bottom-10',
    formItemClass: 'approve-attachment-form-item pb-2 [&_.ant-upload-select]:!bottom-8'
  },
  {
    fieldName: 'signImg',
    modelPropName: 'value',
    label: '',
    defaultValue: '',
    disabledOnChangeListener: false,
    component: markRaw(Esign),
    wrapperClass: 'approve-sign-wrapper',
    formItemClass: 'absolute bottom-[3px] right-[50px] z-10'
  },
  {
    fieldName: 'approveMsg',
    label: '审批意见',
    formItemClass: 'items-start',
    component: 'Textarea',
    componentProps: {
      placeholder: '请输入审批意见！',
      autoSize: {
        minRows: 3,
        maxRows: 5,
      },
      resizable: false,
    },
    rules: z
      .string({
        required_error: '审批意见不能为空！'
      })
      .min(1, "审批意见不能为空！")
      .max(4000, "字符长度不能大于4000！"),
  },
  /*{
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
  },*/
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
        fieldName: 'backToStepNodeList',
        label: '选择驳回节点',
        component: 'Input',
        defaultValue: '0',
        formItemClass: '!items-start',
    },
  {
      fieldName: 'attachmentList',
      modelPropName: 'value',
      defaultValue: [],
      disabledOnChangeListener: false,
      component: markRaw(Upload),
      wrapperClass: 'approve-attachment-wrapper ![&_.ant-upload-select]:bottom-10',
      formItemClass: 'approve-attachment-form-item pb-2 [&_.ant-upload-select]:!bottom-8'
  },
  {
      fieldName: 'signImg',
      modelPropName: 'value',
      label: '',
      defaultValue: '',
      disabledOnChangeListener: false,
      component: markRaw(Esign),
      wrapperClass: 'approve-sign-wrapper',
      formItemClass: 'absolute bottom-[3px] right-[50px] z-10'
  },
  {
      fieldName: 'approveMsg',
      label: '审批意见',
      formItemClass: 'items-start',
      component: 'Textarea',
      componentProps: {
          placeholder: '请输入审批意见！',
          autoSize: {
              minRows: 3,
              maxRows: 5,
          },
          resizable: false,
      },
      rules: z
          .string({
              required_error: '审批意见不能为空！'
          })
          .min(1, "审批意见不能为空！")
          .max(4000, "字符长度不能大于4000！"),
  },

];
