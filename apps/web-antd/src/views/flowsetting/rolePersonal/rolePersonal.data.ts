import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import {FormValidPatternEnum} from "#/enums/commonEnum";
import { z } from '#/adapter/form';
import type {VxeGridProps} from '#/adapter/vxe-table';

export const columns: VxeGridProps['columns'] = [
  {
    title: '名称',
    field: 'name',
    align: 'left',
    width: 300,
    resizable: true,
  },
  {
    title: '编码',
    field: 'sn',
    width: 120,
    align: 'left',
    resizable: true,
  },
  /*{
    title: '所属公司',
    field: 'companyName',
    width: 120,
    align: 'left',
  },*/
  {
    title: '创建时间',
    field: 'createTime',
    width: 180,
  },
];

export const personalColumns: VxeGridProps['columns'] = [
  {
    title: '操作',
    field: 'action',
    width: 50,
  },
  {
    title: '姓名',
    field: 'personalName',
    align: 'left',
    width: 200,
  },
  {
    title: '所属公司',
    field: 'companyName',
    align: 'left',
    // width: 200,
  },
  {
    title: '所属部门',
    field: 'deptName',
    align: 'left',
    // width: 200,
  },
  /*{
    title: '配置管辖范围',
    field: 'setManagerRange',
    align: 'center',
    slots: { align:'right',customRender: 'setManagerRange' },
  },*/
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
    // colProps: {
    //   span: 6,
    //   lg: { span: 8, offset: 0 },
    //   sm: { span: 14, offset: 0 },
    //   xs: { span: 16, offset: 0 },
    // },
  },
];

export const companyRoleFormSchema: FormSchema[] = [
  {
    fieldName: 'id',
    label: 'ID',
    // required: false,
    component: 'Input',
    dependencies: {
      show: false,
      triggerFields: ['id']
    }
  },
];
