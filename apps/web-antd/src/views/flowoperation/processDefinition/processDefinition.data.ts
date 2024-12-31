import { BasicColumn, FormSchema } from '@/components/Table';
import { Tag } from 'ant-design-vue';
import { h } from 'vue';

export const columns: BasicColumn[] = [
  {
    title: '名称',
    dataIndex: 'name',
    align: 'left',
  },
  {
    title: 'KEY',
    dataIndex: 'modelKey',
    width: 150,
    align: 'left',
  },
  {
    title: '分类名称',
    dataIndex: 'categoryName',
    width: 150,
    align: 'left',
  },
  {
    title: '系统',
    dataIndex: 'appName',
    width: 100,
    align: 'left',
  },
  {
    title: '状态',
    dataIndex: 'statusName',
    width: 70,
    align: 'center',
    customRender: ({ record }) => {
      const { status, statusName } = record;
      let color = '';
      if (~~status === 2) {
        color = '#2db7f5';
      } else if (~~status === 3) {
        color = '#87d068';
      } else if (~~status === 4) {
        color = '#f50';
      } else {
        color = 'gray';
      }
      return h(Tag, { color: color }, () => statusName);
    },
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    width: 120,
    align: 'left',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'keyword',
    label: '流程标题',
    component: 'Input',
    componentProps: {
      placeholder: '请输入流程标题',
    },
    labelWidth: 60,
    colProps: {
      span: 6,
      lg: { span: 6, offset: 0 },
      sm: { span: 10, offset: 0 },
      xs: { span: 16, offset: 0 },
    },
  },
  {
    field: 'appSn',
    label: '系统',
    component: 'Select',
    labelWidth: 60,
    colProps: {
      span: 6,
      lg: { span: 6, offset: 0 },
      sm: { span: 10, offset: 0 },
      xs: { span: 16, offset: 0 },
    },
  },
];

export const hisDefinitionColumns: BasicColumn[] = [
  {
    title: '操作',
    dataIndex: 'action',
    width: 120,
    align: 'center',
  },
  {
    title: '名称',
    dataIndex: 'name',
    align: 'left',
  },
  {
    title: 'KEY',
    dataIndex: 'key',
    align: 'left',
  },
  {
    title: '版本',
    dataIndex: 'version',
    width: 100,
    align: 'center',
  },
  {
    title: '状态',
    dataIndex: 'statusName',
    width: 70,
    align: 'center',
    customRender: ({ record }) => {
      const { suspensionState } = record;
      let statusName = '未知';
      let color = '';
      if (~~suspensionState === 2) {
        color = 'red';
        statusName = '挂起';
      } else if (~~suspensionState === 1) {
        color = 'green';
        statusName = '激活';
      } else {
        color = 'gray';
      }
      return h(Tag, { color: color }, () => statusName);
    },
  },
];

export const modelInfoFormSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'ID',
    required: false,
    component: 'Input',
    show: false,
  },
  {
    field: 'categoryCode',
    label: 'ID',
    required: false,
    component: 'Input',
    show: false,
  },
  {
    field: 'name',
    label: '名称',
    component: 'Input',
    required: true,
    rules: [
      {
        required: true,
        whitespace: true,
        message: '名称不能为空！',
      },
      {
        max: 200,
        message: '字符长度不能大于200！',
      },
    ],
  },
  {
    field: 'modelKey',
    label: '标识',
    component: 'Input',
    required: true,
  },
  {
    field: 'appSn',
    label: '所属系统',
    component: 'Select',
    componentProps: {
      getPopupContainer: () => document.body,
    },
    required: true,
  },
];
