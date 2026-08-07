import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { VbenFormProps } from '@vben/common-ui';
import { z } from '#/adapter/form';

export const externalAiNodeSearchFormSchema: VbenFormProps['schema'] = [
  { component: 'Input', fieldName: 'keyword', label: '关键字', componentProps: { placeholder: '请输入关键字', allowClear: true } },
];

export const externalAiNodeColumns: VxeTableGridOptions['columns'] = [
  { type: 'seq', width: 60, align: 'center' },
  { field: 'name', title: '节点名称', align: 'left', minWidth: 150 },
  { field: 'code', title: '节点编码', align: 'left', minWidth: 150 },
  { field: 'typeName', title: '节点类型', align: 'left', minWidth: 120 },
  { field: 'orderNo', title: '排序号', align: 'center', width: 100 },
  { field: 'createTime', title: '创建时间', width: 180, align: 'center' },
  { cellRender: { name: 'VbenTableAction' }, field: 'action', fixed: 'right', title: '操作', width: 140 },
];

export const externalAiNodeFormSchema = [
  { component: 'Input', fieldName: 'id', label: 'ID', componentProps: { hidden: true } },
  { component: 'Input', fieldName: 'name', label: '节点名称', rules: z.string().min(1, '节点名称不能为空').max(255) },
  { component: 'Input', fieldName: 'code', label: '节点编码', rules: z.string().min(1, '节点编码不能为空').max(64) },
  {
    component: 'Select', fieldName: 'typeId', label: '节点类型', rules: z.string().min(1, '请选择节点类型'),
    componentProps: {
      placeholder: '请选择节点类型',
      options: async () => {
        const { list } = await (await import('#/api/flow/externalAi')).pageListFlowNodeType({ pageSize: 9999, pageNum: 1 });
        return (list || []).map((item: any) => ({ label: item.name, value: item.id }));
      },
    },
  },
  { component: 'InputNumber', fieldName: 'orderNo', label: '排序号', defaultValue: 1, componentProps: { min: 0, max: 9999, style: { width: '100%' } } },
];
