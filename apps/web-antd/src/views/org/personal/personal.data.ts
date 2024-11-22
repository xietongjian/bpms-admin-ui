import {useVbenVxeGrid} from '#/adapter/vxe-table';
import { Tag } from 'ant-design-vue';
import { h } from 'vue';
import { formatToDate, formatToDateTime } from '@/utils/dateUtil';
import { RemarkDefaultEnum } from '@/enums/constantEnum';

export const columns: BasicColumn[] = [
  {
    title: '姓名',
    dataIndex: 'name',
    width: 120,
    align: 'left',
  },
  {
    title: '工号',
    dataIndex: 'code',
    width: 100,
    align: 'left',
    resizable: true,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 60,
    customRender: ({ record }) => {
      const status = record.status;
      const enable = ~~status === 1;
      const color = enable ? 'green' : 'red';
      const text = enable ? '在职' : '离职';
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    width: 120,
    align: 'left',
    resizable: true,
  },
  {
    title: '手机',
    dataIndex: 'mobile',
    width: 120,
    align: 'left',
    resizable: true,
  },
  {
    title: '部门',
    dataIndex: 'deptName',
    width: 120,
    align: 'left',
    resizable: true,
  },
  {
    title: '公司',
    dataIndex: 'companyName',
    width: 120,
    align: 'left',
    resizable: true,
  },
  {
    title: '上级领导',
    dataIndex: 'leaderName',
    width: 100,
    align: 'center',
  },
  {
    title: '角色',
    dataIndex: 'roles',
    width: 120,
    align: 'left',
  },
  {
    title: '离职日期',
    dataIndex: 'leaveDate',
    width: 100,
    customRender: ({ text }) => {
      return text ? formatToDate(text) : '';
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 130,
    customRender: ({ text }) => {
      return text ? formatToDateTime(text) : '';
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'keyword',
    label: '关键字',
    component: 'Input',
    componentProps: {
      placeholder: '请输入姓名/工号/手机/邮箱',
    },
    labelWidth: 60,
    colProps: {
      span: 8,
      lg: { span: 8, offset: 0 },
      sm: { span: 14, offset: 0 },
      xs: { span: 16, offset: 0 },
    },
  },
];

export const personalFormSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'ID',
    required: false,
    component: 'Input',
    show: false,
  },
  {
    field: 'name',
    label: '姓名',
    component: 'Input',
    required: true,
    colProps: {
      span: 9,
    },
    rules: [
      {
        required: true,
        whitespace: true,
        message: '姓名不能为空！',
      },
      {
        max: 20,
        message: '字符长度不能大于20！',
      },
    ],
  },
  {
    field: 'code',
    label: '工号',
    component: 'Input',
    required: true,
    colProps: {
      span: 9,
    },
  },
  {
    field: 'headImg',
    label: '',
    component: 'Input',
    slot: 'headImg',
    colProps: {
      style: 'margin: auto;position: absolute;right: 25px; width: 150px;height: 150px;',
      span: 8,
    },
  },
  {
    field: 'sex',
    label: '性别',
    component: 'RadioButtonGroup',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: '男', value: 1 },
        { label: '女', value: 2 },
      ],
    },
    colProps: { span: 24 },
  },
  {
    field: 'jobGradeCode',
    label: '职级',
    component: 'TreeSelect',
    colProps: {
      span: 9,
    },
    componentProps: {
      treeNodeFilterProp: 'showName',
      getPopupContainer: () => document.body,
    },
  },
  {
    field: 'positionCode',
    label: '岗位',
    component: 'TreeSelect',
    colProps: {
      span: 9,
    },
    componentProps: {
      treeNodeFilterProp: 'showName',
      getPopupContainer: () => document.body,
    },
  },
  {
    field: 'companyId',
    label: '所属公司',
    component: 'TreeSelect',
    colProps: {
      span: 12,
    },
    componentProps: {
      treeNodeFilterProp: 'cname',
      getPopupContainer: () => document.body,
    },
    required: true,
  },
  {
    field: 'deptId',
    label: '所属部门',
    component: 'TreeSelect',
    colProps: {
      span: 10,
    },
    componentProps: {
      treeNodeFilterProp: 'name',
      getPopupContainer: () => document.body,
    },
    required: true,
  },
  {
    label: '手机',
    field: 'mobile',
    component: 'Input',
    required: true,
    colProps: {
      span: 9,
    },
    rules: [
      {
        required: true,
        whitespace: true,
        message: '手机不能为空！',
      },
      {
        pattern: new RegExp('^(1[0-9])\\d{9}$'),
        type: 'string',
        message: '请输入正确的手机号！',
      },
      {
        max: 11,
        message: '字符长度不能大于11！',
      },
    ],
  },
  {
    label: '邮箱',
    field: 'email',
    component: 'Input',
    colProps: {
      span: 9,
    },
    rules: [
      {
        pattern: new RegExp('^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$'),
        type: 'string',
        message: '请输入正确的邮箱地址！',
      },
      {
        max: 256,
        message: '字符长度不能大于256！',
      },
    ],
  },
  {
    field: 'status',
    label: '在职状态',
    component: 'RadioButtonGroup',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: '在职', value: 1 },
        { label: '离职', value: 0 },
      ],
    },
  },
  {
    label: '地址',
    field: 'address',
    component: 'InputTextArea',
    componentProps: {
      autoSize: {
        minRows: RemarkDefaultEnum.MIN_ROWS,
        maxRows: RemarkDefaultEnum.MAX_ROWS,
      },
    },
    rules: [
      {
        max: 400,
        message: '字符长度不能大于400！',
      },
    ],
    colProps: {
      span: 24,
    },
  },
  // status
];
