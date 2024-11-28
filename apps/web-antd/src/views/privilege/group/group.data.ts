// import { BasicColumn, FormSchema } from '@/components/Table';
// import Icon from '@/components/Icon/Icon.vue';
import { type FormSchema, z } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { h } from 'vue';
import { RemarkDefaultEnum } from '#/enums/constantEnum';

export const columns: VxeGridProps['columns'] = [
  {
    title: '名称',
    field: 'name',
    align: 'left',
  },
  {
    title: '标识',
    field: 'sn',
    width: 180,
    align: 'left',
  },
  {
    title: '用户',
    field: 'users',
    align: 'left',
    slots: {default: 'users'},
  },
  {
    title: '备注',
    field: 'note',
    align: 'left',
  },
  {
    field: 'action',
    fixed: 'right',
    slots: {default: 'action'},
    title: '操作',
    width: 120,
  },
];

// 权限设置
export const aclColumns: VxeGridProps['columns'] = [
  {
    title: '菜单名称',
    field: 'name',
    align: 'left',
    width: 250,
    /*customRender: ({ record }) => {
      return h('span', { title: record.name + '[' + record.sn + ']' }, [
        h(Icon, { icon: record.image }),
        h('span', record.name),
      ]);
    },*/
  },
  {
    field: 'pvs',
    align: 'left',
    /*customRender: ({ record }) => {
      const pvs = record.pvs;
      const color = 'green';
      const result = pvs.map(item=>{
        return h(Checkbox, { color: color, style: {marginRight:'5px'} }, () => item.name);
      });
      result.length>0&&result.unshift(h(Checkbox, { color: color, style: {marginRight:'5px'} }, () => "全选"));
      return result;
    },*/
  },
];

export const searchFormSchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'keyword',
    label: '关键字',
    componentProps: {
      placeholder: '请输入关键字',
      allowClear: true,
    }
  }
/*    labelWidth: 60,
    colProps: {
      span: 6,
      lg: { span: 6, offset: 0 },
      sm: { span: 10, offset: 0 },
      xs: { span: 16, offset: 0 },
    },*/
];

export const formSchema: FormSchemaGetter = () => [
  {
    fieldName: 'id',
    label: 'ID',
    component: 'Input',
    dependencies: {
      show: () => false,
      triggerFields: [""]
    }
  },
  {
    fieldName: 'name',
    label: '名称',
    required: true,
    component: 'Input',
    /*rules: [
      {
        required: true,
        whitespace: true,
        message: '名称不能为空！',
      },
      {
        max: 64,
        message: '字符长度不能大于64！',
      },
    ],*/
  },
  {
    fieldName: 'sn',
    label: '标识',
    required: true,
    component: 'Input',
  },
  {
    label: '备注',
    fieldName: 'note',
    component: 'Textarea',
    componentProps: {
      autoSize: {
        minRows: RemarkDefaultEnum.MIN_ROWS,
        maxRows: RemarkDefaultEnum.MAX_ROWS,
      },
    },
    /*rules: [
      {
        max: 1024,
        message: '字符长度不能大于1024！',
      },
    ],*/
  },
];

export const setAccountFormSchema: FormSchemaGetter = () => [
  {
    label: 'ID',
    fieldName: 'id',
    component: 'Input',
    show: false,
  },
  {
    label: '选择用户',
    fieldName: 'users',
    component: 'Select',
    labelWidth: 65,
  },
];
