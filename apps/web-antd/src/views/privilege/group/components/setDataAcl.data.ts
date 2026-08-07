import { h } from 'vue';
import { Tag } from 'ant-design-vue';

export const appSelectorColumns = [
  {
    title: '应用名称',
    dataIndex: 'name',
    align: 'left',
  },
  {
    title: '应用编码',
    dataIndex: 'sn',
    align: 'left',
  },
];

export const companySelectorColumns = [
  {
    title: '公司名称',
    dataIndex: 'name',
    align: 'left',
  },
  {
    title: '公司简称',
    dataIndex: 'shortName',
    align: 'center',
  },
  {
    title: '公司编码',
    dataIndex: 'code',
    align: 'center',
  },
];

export const departmentSelectorColumns = [
  {
    title: '部门名称',
    dataIndex: 'name',
    align: 'left',
  },
  {
    title: '部门简称',
    dataIndex: 'shortName',
    align: 'left',
  },
  {
    title: '类型',
    dataIndex: 'sourceType',
    align: 'center',
    width: 150,
    customRender: ({ record }: any) => {
      return h(
        Tag,
        { color: record.sourceType == 1 ? 'purple' : 'cyan' },
        () => (record.sourceType == 1 ? '公司' : '部门'),
      );
    },
  },
  {
    title: '部门编码',
    dataIndex: 'code',
    align: 'center',
  },
];

export const userSelectorColumns = [
  {
    title: '姓名',
    dataIndex: 'name',
    align: 'left',
    width: 200,
  },
  {
    title: '手机号',
    dataIndex: 'mobile',
    align: 'center',
  },
  {
    title: '工号',
    dataIndex: 'code',
    align: 'center',
  },
];

export const dataReportSelectorColumns = [
  {
    title: '报表名称',
    dataIndex: 'name',
    align: 'left',
  },
];
