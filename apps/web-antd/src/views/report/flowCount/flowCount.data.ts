import { BasicColumn, FormSchema } from '@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';

export const columns: BasicColumn[] = [
  {
    title: '公司名称',
    dataIndex: 'companyName',
    align: 'left',
  },
  {
    title: '部门名称',
    dataIndex: 'deptName',
    align: 'left',
  },
  {
    title: '人员',
    dataIndex: 'personalName',
    align: 'center',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    align: 'left',
  },
  {
    title: '流程名称',
    dataIndex: 'processName',
    align: 'left',
  },
  {
    title: '状态',
    dataIndex: 'processStatusName',
    width: 120,
    customRender: ({ record }) => {
      /*processStatus
        processStatusName*/
      const status = record.processStatus;
      const enable = ~~status === 1;
      const color = enable ? 'green' : 'red';
      const text = enable ? '办结' : '审批中';
      return h(Tag, { color: color }, () => text);
    },
  },
];

/*
* userNo
deptId
companyId
startDate
endDate
* */
export const searchFormSchema: FormSchema[] = [
  {
    field: 'userNo',
    label: '提交人',
    component: 'PersonalSelector',
    componentProps: {
      placeholder: '请选择提交人',
    },
    labelWidth: 80,
    colProps: {
      span: 6,
      lg: { span: 6, offset: 0 },
      sm: { span: 6, offset: 0 },
      xs: { span: 16, offset: 0 },
    },
  },

  {
    field: 'deptId',
    label: '部门名称',
    component: 'OrgSelector',
    componentProps: {
      placeholder: '请选择提交部门',
      selectType: '2',
      multiple: false,
    },
    colProps: {
      span: 8,
      lg: { span: 8, offset: 0 },
      sm: { span: 6, offset: 0 },
      xs: { span: 16, offset: 0 },
    },
  },
  {
    field: 'companyId',
    label: '提交单位',
    component: 'OrgSelector',
    componentProps: {
      placeholder: '请选择提交单位',
      selectType: '1',
      multiple: false,
    },
    colProps: {
      span: 8,
      lg: { span: 8, offset: 0 },
      sm: { span: 6, offset: 0 },
      xs: { span: 16, offset: 0 },
    },
  },
  {
    field: 'dateRange',
    label: '时间范围',
    component: 'RangePicker',
    colProps: {
      span: 8,
      lg: { span: 8, offset: 0 },
      sm: { span: 8, offset: 0 },
      xs: { span: 16, offset: 0 },
    },
  },
];
