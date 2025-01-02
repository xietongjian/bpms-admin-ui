import { h } from 'vue';
import { DescItem } from '@/components/Description';
import { EmpInfo } from '#/views/components/EmpInfo';
import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import {FormValidPatternEnum} from "#/enums/commonEnum";
import { z } from '#/adapter/form';
import type {VxeGridProps} from '#/adapter/vxe-table';

export const formBaseDataSchema: DescItem[] = [
  {
    field: 'personalName',
    label: '发起人',
    render: (value, row: any) => {
      return h(EmpInfo, { no: row.personalCode, name: row.personalName });
    },
  },
  {
    field: 'companyName',
    label: '发起单位',
  },
  {
    field: 'deptName',
    label: '发起部门',
  },
  {
    field: 'phoneNumber',
    label: '联系电话',
  },
  {
    field: 'launchTime',
    label: '发起时间',
  },
];
