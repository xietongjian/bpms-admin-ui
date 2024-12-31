import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import {FormValidPatternEnum} from "#/enums/commonEnum";
// import { z } from '#/adapter/form';
import type {VxeGridProps} from '#/adapter/vxe-table';


export const columns: VxeGridProps['columns'] = [
  {
    title: '姓名',
    field: 'name',
    width: 80,
    align: 'left',
  },
  {
    title: '工号',
    field: 'code',
    width: 80,
    align: 'left',
  },
  {
    title: '性别',
    field: 'sex',
    width: 50,
    /*customRender: ({ record }) => {
      const status = record.sex;
      const enable = ~~status === 1;
      const color = enable ? 'green' : 'red';
      const text = enable ? '男' : '女';
      return h(Tag, { color: color }, () => text);
    },*/
  },
  {
    title: '公司',
    field: 'companyName',
    width: 120,
    align: 'left',
  },
  {
    title: '部门',
    field: 'deptName',
    width: 120,
    align: 'left',
  },
];

export const positionColumns: VxeGridProps['columns'] = [
  {
    title: '名称',
    field: 'name',
    align: 'left',
  },
  {
    title: '编码',
    field: 'code',
    width: 120,
    align: 'left',
  },
  {
    title: '所属序列',
    field: 'positionSeqName',
    align: 'left',
  },
];


export const searchFormSchema: FormSchema[] = [
  {
    fieldName: 'keyword',
    label: '关键字',
    component: 'Input',
    labelWidth: 60,
    componentProps: {},
  },
];
