import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { VbenFormProps } from '@vben/common-ui';
import { z } from '#/adapter/form';

export const externalAiDescSearchFormSchema: VbenFormProps['schema'] = [
  { component: 'Input', fieldName: 'keyword', label: '关键字', componentProps: { placeholder: '请输入关键字', allowClear: true } },
];

export const externalAiDescColumns: VxeTableGridOptions['columns'] = [
  { type: 'seq', width: 60, align: 'center' },
  { field: 'name', title: '描述名称', align: 'left', minWidth: 150 },
  { field: 'code', title: '描述编码', align: 'left', minWidth: 150 },
  { field: 'nodeName', title: '所属节点', align: 'left', minWidth: 150 },
  { field: 'orderNo', title: '排序号', align: 'center', width: 100 },
  { field: 'createTime', title: '创建时间', width: 180, align: 'center' },
  { cellRender: { name: 'VbenTableAction' }, field: 'action', fixed: 'right', title: '操作', width: 140 },
];

export const externalAiDescFormSchema = [
  { component: 'Input', fieldName: 'id', label: 'ID', componentProps: { hidden: true } },
  { component: 'Input', fieldName: 'typeId', label: 'typeId', componentProps: { hidden: true } },
  { component: 'Input', fieldName: 'name', label: '描述名称', rules: z.string().min(1, '描述名称不能为空').max(255) },
  { component: 'Input', fieldName: 'code', label: '描述编码', rules: z.string().min(1, '描述编码不能为空').max(64) },
  {
    component: 'TreeSelect', fieldName: 'nodeId', label: '所属节点', rules: z.any(),
    componentProps: {
      placeholder: '请选择所属节点',
      options: async () => {
        const { flowNodeTree } = await import('#/api/flow/externalAi');
        return await flowNodeTree();
      },
      fieldNames: { label: 'name', value: 'id', children: 'children' },
      getPopupContainer: () => document.body,
    },
  },
  { component: 'InputNumber', fieldName: 'orderNo', label: '排序号', defaultValue: 1, componentProps: { min: 0, max: 9999, style: { width: '100%' } } },
];
