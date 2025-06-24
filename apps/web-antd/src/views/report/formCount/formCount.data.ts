import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import type {VxeGridProps} from '#/adapter/vxe-table';

export const baseColumns: VxeGridProps['columns'] = [
  {
    title: '名称',
    field: 'name',
    align: 'left',
    minWidth: 300,
    resizable: true,
  },
  {
    title: 'KEY',
    field: 'modelKey',
    width: 100,
    align: 'left',
    resizable: true,
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
    fieldName: 'title',
    label: '流程标题',
    component: 'Input',
    componentProps: {
      placeholder: '请输入标题',
    },
  },
  {
    fieldName: 'launchCompanyIdSelector',
    label: '发起人公司',
    component: 'OrgSelector',
    componentProps: {
      multiple: false,
      selectType: '1',
      placeholder: '请选择公司',
    },
  },
  {
    fieldName: 'superDepartmentIdSelector',
    label: '上级部门',
    component: 'OrgSelector',
    componentProps: {
      multiple: false,
      selectType: '2',
      placeholder: '请选择部门',
    },
  },
  {
    fieldName: 'launchDepartmentIdSelector',
    label: '提交人部门',
    component: 'OrgSelector',
    componentProps: {
      multiple: false,
      selectType: '2',
      placeholder: '请选择部门',
    },
  },
  {
    fieldName: 'uidSelector',
    label: '提交人',
    component: 'PersonalSelector',
    componentProps: {
      placeholder: '请选择提交人',
    },
  },
  {
    fieldName: 'dateRange',
    label: '时间范围',
    component: 'RangePicker',
    labelWidth: 80,
    componentProps: {
      placeholder: ['开始时间', '结束时间'],
      allowClear: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      showTime: true,
    }
  },
];
