import type { VxeGridProps } from '#/adapter/vxe-table';
import type { VbenFormProps } from '@vben/common-ui';
import { JsonPreview } from '#/components/CodeEditor';
import { Popover } from 'ant-design-vue';
import { h } from 'vue';

// 列表搜索Schema
export const searchFormSchema: VbenFormProps['schema'] = [
  {
    component: 'Input',
    fieldName: 'keyword',
    label: '流程名称',
    componentProps: {
      placeholder: '请输入流程名称',
      allowClear: true,
    },
  },
  {
    component: 'Input',
    fieldName: 'modelKey',
    label: '流程图Key',
    componentProps: {
      placeholder: '请输入流程Key',
      allowClear: true,
    },
  },
  {
    component: 'DateRangePicker',
    fieldName: '_dateRange',
    label: '日期范围',
    componentProps: {
      format: 'YYYY-MM-DD',
      valueFormat: 'YYYY-MM-DD',
      placeholder: ['开始日期', '结束日期'],
      allowClear: true,
    },
  },
];

// 列表Schema
export const columns: VxeGridProps['columns'] = [
  {
    field: 'processName',
    title: '流程名称',
    minWidth: 180,
    align: 'left',
  },
  {
    field: 'modelKey',
    title: '流程KEY',
    width: 200,
    align: 'left',
  },
  {
    field: 'nodeName',
    title: '节点名称',
    minWidth: 200,
    align: 'left',
    slots: { default: 'nodeName' },
  },
  {
    field: 'requestInfo',
    title: '请求信息',
    minWidth: 200,
    align: 'left',
    slots: { default: 'requestInfo' },
  },
  {
    field: 'errorInfo',
    title: '错误信息',
    minWidth: 220,
    align: 'left',
    slots: { default: 'errorInfo' },
  },
  {
    field: 'processInstanceId',
    title: '流程实例ID',
    width: 200,
    align: 'center',
  },
  {
    field: 'createTime',
    title: '创建时间',
    width: 160,
    align: 'center',
  },
  {
    cellRender: { name: 'VbenTableAction' },
    field: 'action',
    fixed: 'right',
    title: '操作',
    width: 'auto',
  },
];

// 错误详情Schema
export const errorLogSchema = [
  {
    label: '流程名称',
    key: 'processName',
  },
  {
    label: '流程KEY',
    key: 'modelKey',
  },
  {
    label: '节点名称',
    key: 'nodeName',
  },
  {
    label: '请求信息',
    key: 'requestInfo',
  },
  {
    label: '错误信息',
    key: 'errorInfo',
  },
  {
    label: '流程实例ID',
    key: 'processInstanceId',
  },
  {
    label: '创建时间',
    key: 'createTime',
  },
];

// 渲染JsonPreview的Popover辅助函数
export function renderPopoverCell(record: any, field: string) {
  const jsonField = `${field}Json`;
  const hasJson = record[jsonField];
  return h(
    Popover,
    {
      trigger: 'hover',
      placement: 'top',
      overlayStyle: { width: '500px' },
    },
    {
      default: () =>
        h('div', {
          style: {
            maxWidth: '100%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          },
        }, record[field]),
      content: () =>
        hasJson
          ? h(JsonPreview, { data: record[jsonField] })
          : h('div', null, record[field]),
    },
  );
}
