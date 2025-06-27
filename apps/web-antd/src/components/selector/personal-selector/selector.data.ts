import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import {h} from 'vue'
import {Tag, Tree, Table, Input, Checkbox, Radio} from 'ant-design-vue';


export const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    width: 100,
    align: 'left',
  },
  {
    title: '工号',
    dataIndex: 'code',
    width: 100,
    align: 'left',
  },
  {
    title: '性别',
    dataIndex: 'sex',
    width: 50,
    slots: {default: 'sex'},
    customRender: ({ record }) => {
      const status = record.sex;
      const enable = ~~status === 1;
      const color = enable ? 'green' : 'red';
      const text = enable ? '男' : '女';
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: '公司',
    dataIndex: 'companyName',
    align: 'left',
    ellipsis: true,
  },
  {
    title: '部门',
    dataIndex: 'deptName',
    align: 'left',
    ellipsis: true,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    fieldName: 'keyword',
    label: '关键字',
    component: 'Input',
    labelWidth: 60,
    componentProps: {},
  },
];
