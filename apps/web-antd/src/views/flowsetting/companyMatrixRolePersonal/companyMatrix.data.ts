import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import type {VxeGridProps} from '#/adapter/vxe-table';

export const baseColumns: VxeGridProps['columns'] = [
  {
    title: '名称',
    field: 'name',
    align: 'left',
    width: 200,
    resizable: true,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    fieldName: 'keyword',
    label: '公司名/编码',
    component: 'Input',
    componentProps: {
      placeholder: '请输入名称/标识',
    },
    labelWidth: 90,
  },
  {
    fieldName: 'roleKeyword',
    label: '角色名',
    component: 'Input',
    componentProps: {
      placeholder: '请输入名称',
    },
    labelWidth: 90,
  },
];
