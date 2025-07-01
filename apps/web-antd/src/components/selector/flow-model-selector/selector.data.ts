import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import type {VxeGridProps} from '#/adapter/vxe-table';
import {h} from 'vue'
import {Tag, Tree, Table, Input, Checkbox, Radio} from 'ant-design-vue';


export const columns = [
  {
    title: '名称',
    dataIndex: 'name',
    align: 'left',
  },
  {
    title: '标识',
    dataIndex: 'modelKey',
    width: 120,
    align: 'left',
  },
  {
    title: '发布状态',
    dataIndex: 'statusName',
    width: 80,
    align: 'center',
    customRender: ({ record }) => {
      const { status, statusName } = record;
      let color = '';
      if (~~status === 2) {
        color = 'warning';
      } else if (~~status === 3) {
        color = 'success';
      } else if (~~status === 4) {
        color = 'error';
      } else {
        color = 'gray';
      }
      return h(Tag, { color: color }, () => statusName);
    },
  },
  {
    title: '系统',
    dataIndex: 'appName',
    width: 120,
    align: 'left',
  },
  {
    title: '预览',
    dataIndex: 'opt',
    width: 80,
    align: 'center',
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
