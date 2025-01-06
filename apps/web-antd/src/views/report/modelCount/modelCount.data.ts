import type {VxeGridProps} from '#/adapter/vxe-table';
import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import { Tag } from 'ant-design-vue';
import { z } from '#/adapter/form';

import { h } from 'vue';

// PROCESS_FORM_CUSTOM(0, "自定义流程表单"), PROCESS_FORM_BIZ(1, "业务流程表单"), PROCESS_FORM_TASK(2, "任务流程表单");
const FormTypeEnum = {
  '0': '自定义流程表单',
  '1': '业务流程表单',
  '2': '任务流程表单',
};

export const columns: VxeGridProps['columns'] = [
  {
    title: '名称',
    field: 'name',
    align: 'left',
  },
  {
    title: 'KEY',
    field: 'modelKey',
    align: 'left',
  },
  /*{
    title: '分类名称',
    field: 'categoryName',
    width: 100,
    align: 'left'
  },*/
  {
    title: '表单类型',
    field: 'formType',
    width: 120,
    align: 'center',
    customRender: ({ record }) => {
      const { formType } = record;
      let color = '';
      if (null === formType) {
        color = 'gray';
      } else if (~~formType === 0) {
        color = '#108ee9';
      } else if (~~formType === 1) {
        color = 'green';
      } else if (~~formType === 2) {
        color = 'red';
      } else {
        color = 'gray';
      }
      return h(Tag, { color: color }, () => FormTypeEnum[record.formType] || '未知');
    },
  },
  /*{
    title: '系统',
    field: 'appName',
    width: 100,
    align: 'left'
  },
  {
    title: '应用范围',
    field: 'appliedRangeName',
    width: 100,
    align: 'left'
  },*/
  /*{
    title: '状态',
    field: 'statusName',
    width: 70,
    align: 'center',
    customRender: ({ record }) => {
      const {status, statusName}= record;
      var color = '';
      if (~~status === 2) {
        color = 'yellow';
      }else if(~~status === 3) {
        color = 'green';
      }else if(~~status === 4){
        color = 'red';
      }else {
        color = 'gray';
      }
      return h(Tag, { color: color }, () => statusName);
    },
  },*/
  {
    title: '更新时间',
    field: 'updateTime',
    width: 150,
    align: 'left',
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
  /*  {
    fieldName: 'keyword',
    label: '关键字',
    component: 'Input',
    componentProps: {
      placeholder: '请输入名称/编码',
    },
    labelWidth: 60,
    colProps: {span: 6, lg:{span: 6, offset:0}, sm:{span: 10, offset: 0}, xs:{span: 16, offset: 0}},
  },*/
  {
    fieldName: 'formType',
    label: '表单类型',
    component: 'Select',
    labelWidth: 70,
  },
  {
    fieldName: 'deptId',
    label: '归属部门',
    component: 'OrgSelector',
    labelWidth: 70,
  },
];

export const modelInfoFormSchema: FormSchema[] = [
  {
    fieldName: 'id',
    label: 'ID',
    component: 'Input',
    dependencies: {
      show: false,
      triggerFields: ['id']
    }
  },
  {
    fieldName: 'categoryCode',
    label: 'ID',
    component: 'Input',
    dependencies: {
      show: false,
      triggerFields: ['categoryCode']
    }  },
  {
    fieldName: 'name',
    label: '名称',
    component: 'Input',
    rules: z
        .string({
          required_error: '名称不能为空',
        })
        .trim()
        .min(1, "名称不能为空")
        .max(200, "字符长度不能大于200！")
   /* rules: [
      {
        required: true,
        whitespace: true,
        message: '名称不能为空！',
      },
      {
        max: 200,
        message: '字符长度不能大于200！',
      },
    ],*/
  },
  {
    fieldName: 'modelKey',
    label: '标识',
    component: 'Input',
    // required: true,
  },
  {
    fieldName: 'appSn',
    label: '所属系统',
    component: 'Select',
    componentProps: {
      getPopupContainer: () => document.body,
    },
    rules: "selectRequired"
    // required: true,
  },
];
