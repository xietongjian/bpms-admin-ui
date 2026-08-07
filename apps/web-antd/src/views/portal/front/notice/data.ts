import type { VxeTableGridOptions } from '#/adapter/vxe-table';

export const columns: VxeTableGridOptions['columns'] = [
  {
    title: '标题',
    field: 'title',
    align: 'left',
    slots: { default: 'title' },
    minWidth: 200,
  },
  {
    title: '发布时间',
    field: 'publishTime',
    width: 180,
    formatter: 'formatTime',
  },
];
