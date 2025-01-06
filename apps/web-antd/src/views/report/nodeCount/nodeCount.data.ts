import type {VxeGridProps} from '#/adapter/vxe-table';
import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import { z } from '#/adapter/form';

export const columns: VxeGridProps['columns'] = [
  {
    title: '模板名称',
    field: 'modelName',
    align: 'left',
  },
  {
    title: '人员姓名',
    field: 'personalName',
    align: 'center',
  },
  {
    title: '角色名称',
    field: 'roleNames',
    align: 'left',
  },
  {
    title: '角色标识',
    field: 'roleSn',
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
  {
    fieldName: 'userNo',
    label: '人员',
    component: 'PersonalSelector',
    componentProps: {
      placeholder: '请选择人员',
    },
    labelWidth: 60,
  },
  /*{
    fieldName: 'roleSn',
    label: '角色',
    helpMessage:'组件暂未开发',
    component: 'Input',
    componentProps: {
      placeholder: '请选择角色',
    },
    colProps: {span: 6, lg:{span: 6, offset:0}, sm:{span: 10, offset: 0}, xs:{span: 16, offset: 0}},
  },*/
];
