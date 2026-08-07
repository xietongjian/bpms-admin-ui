import type { VxeGridProps } from '#/adapter/vxe-table';
import type { VbenFormProps } from '@vben/common-ui';

export const columns: VxeGridProps['columns'] = [
  { type: 'seq', title: '序号', width: 60, align: 'center' },
  { field: 'dataType', title: '业务类型', width: 100, align: 'center' },
  { field: 'fileName', title: '文件名称', minWidth: 180, align: 'left' },
  { field: 'fileType', title: '文件类型', width: 100, align: 'center' },
  { field: 'filePath', title: '文件路径', minWidth: 200, align: 'left' },
  { field: 'dataId', title: '业务单据', width: 160, align: 'left' },
  { field: 'fileSize', title: '文件大小', width: 100, align: 'right' },
  { field: 'createUserName', title: '上传用户', width: 120, align: 'center' },
  { field: 'createTime', title: '上传时间', width: 170, align: 'center' },
  {
    field: 'fileStatus',
    title: '文件状态',
    width: 100,
    align: 'center',
    slots: { default: 'fileStatus' },
  },
  {
    cellRender: { name: 'VbenTableAction' },
    field: 'action',
    fixed: 'right',
    title: '操作',
    width: 'auto',
  },
];

export const searchFormSchema: VbenFormProps['schema'] = [
  {
    component: 'Input',
    fieldName: 'keyword',
    label: '关键字',
    componentProps: {
      placeholder: '请输入关键字',
      allowClear: true,
    },
  },
  {
    component: 'Select',
    fieldName: 'dataType',
    label: '业务类型',
    componentProps: {
      placeholder: '请选择业务类型',
      allowClear: true,
      options: [
        { label: '表单', value: 'form' },
        { label: '审批意见', value: 'approval' },
      ],
    },
  },
  {
    component: 'Input',
    fieldName: 'dataId',
    label: '业务单据',
    componentProps: {
      placeholder: '请输入业务单据',
      allowClear: true,
    },
  },
  {
    component: 'ApiSelect',
    fieldName: 'appSn',
    label: '应用',
    componentProps: {
      placeholder: '请选择应用',
      allowClear: true,
      api: () => import('#/api/base/app').then((m) => m.getAll()),
      resultField: '',
      labelField: 'name',
      valueField: 'sn',
    },
  },
  {
    component: 'Select',
    fieldName: 'status',
    label: '状态',
    componentProps: {
      placeholder: '请选择状态',
      allowClear: true,
      options: [
        { label: '正常', value: '0' },
        { label: '删除', value: '1' },
      ],
    },
  },
  {
    component: 'DateRangePicker',
    fieldName: 'uploadTime',
    label: '上传时间',
    componentProps: {
      placeholder: ['开始时间', '结束时间'],
      allowClear: true,
      style: { width: '100%' },
    },
  },
];
