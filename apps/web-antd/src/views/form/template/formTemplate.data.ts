import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import {FormValidPatternEnum} from "#/enums/commonEnum";
import { z } from '#/adapter/form';
import type {VxeGridProps} from '#/adapter/vxe-table';

// import { h } from 'vue';
// import { Switch } from 'ant-design-vue';
// import { useMessage } from '@/hooks/web/useMessage';
// import { updateStatusById } from '#/api/form/formTemplate';
import {OrderNoDefaultEnum} from "#/enums/commonEnum";
import {getIconCategoryTreeData} from "#/api/base/iconInfo";
import {getFormCategoryListData} from "#/api/form/formTemplate";

export const columns: VxeGridProps['columns'] = [
  {
    title: '名称',
    field: 'name',
    align: 'left',
    minWidth: 200,
  },
  {
    title: '分类名称',
    field: 'categoryCode',
    width: 120,
    align: 'left',
    resizable: true,
    slots: {default: 'categoryCode'}
  },
  {
    title: '状态',
    field: 'status',
    width: 120,
    align: 'center',
    /*customRender: ({ record }) => {
      if (!Reflect.has(record, 'pendingStatus')) {
        record.pendingStatus = false;
      }
      return h(Switch, {
        checked: parseInt(record.status) === 1,
        checkedChildren: '已生效',
        unCheckedChildren: '未生效',
        loading: record.pendingStatus,
        onChange(checked: boolean) {
          record.pendingStatus = true;
          const newStatus = checked ? 1 : 0;
          const { createMessage } = useMessage();
          updateStatusById(record.id, newStatus)
            .then(() => {
              record.status = newStatus;
              createMessage.success(`修改状态成功`);
            })
            .catch(() => {
              createMessage.error('修改状态失败');
            })
            .finally(() => {
              record.pendingStatus = false;
            });
        },
      });
    },*/
  },
  {
    title: '创建时间',
    field: 'createTime',
    width: 200,
    align: 'center',
  },
  {
    field: 'action',
    fixed: 'right',
    slots: {default: 'action'},
    title: '操作',
    width: 120,
  },
];

export const formCategoryFormSchema: FormSchema[] = [
  {
    fieldName: 'id',
    label: 'ID',
    component: 'Input',
    dependencies: {
      show: false,
      triggerFields: ['id']
    }
  },
  {
    fieldName: 'pid',
    label: '父级分类',
    component: 'TreeSelect',
    dependencies: {
      show: (values) => !!values.pid && !values.id,
      triggerFields: ['pid']
    },
    componentProps: {
      fieldNames: {
        label: 'name',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
  },
  {
    fieldName: 'name',
    label: '分类名称',
    component: 'Input',
    rules: z
        .string({
          required_error: '名称不能为空',
        })
        .trim()
        .min(1, "名称不能为空")
        .max(200, "字符长度不能大于200！")
    /*rules: [
      {
        required: true,
        whitespace: true,
        message: '分类名称不能为空！',
      },
      {
        max: 255,
        message: '分类名称长度不能大于255！',
      },
    ],*/
  },
  {
    fieldName: 'code',
    label: '标识',
    // required: true,
    component: 'Input',
  },
  {
    fieldName: 'orderNo',
    label: '排序号',
    help: '数值越小越靠前！',
    component: 'InputNumber',
    defaultValue: OrderNoDefaultEnum.VALUE,
    componentProps: {
      min: OrderNoDefaultEnum.MIN,
      max: OrderNoDefaultEnum.MAX,
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    fieldName: 'keyword',
    label: '关键字',
    component: 'Input',
    componentProps: {
      placeholder: '请输入名称',
      allowClear: true,
    },
    labelWidth: 60,
  },
];

export const formSchema: FormSchema[] = [
  {
    fieldName: 'id',
    label: 'id',
    component: 'Input',
    dependencies: {
      show: false,
      triggerFields: ['id']
    }
  },
  {
    fieldName: 'categoryCode',
    label: '分类',
    rules: "selectRequired",
    component: 'ApiTreeSelect',
    formItemClass: 'grid-cols-2 pb-0 [&_div_p]:z-10 [&_div_p]:border [&_div_p]:rounded [&_div_p]:border-destructive [&_div_p]:px-2 [&_div_p]:bg-card [&_div_p]:bottom-[-26px] [&_div_p]:leading-8',
    componentProps: {
      blockNode: true,
      api: getFormCategoryListData,
      treeDataSimpleMode: { id: "id", pId: "pid", rootPId: null },
      // 菜单接口转options格式
      labelField: 'name',
      valueField: 'code',
      numberToString: true,
      fieldNames: { title: 'name', key: 'code', children: 'children' }
      // afterFetch: (dt) => {
      //   return dt.map(item => {
      //     return {label: item.name, value: item.code, pid: item.pid}
      //   });
      // },
    },
  },
  {
    fieldName: 'name',
    label: '名称',
    component: 'Input',
    componentProps: {
      placeholder: '请输入名称',
    },
    formItemClass: 'col-span-2 col-start-2 pb-0 [&_div_p]:z-10 [&_div_p]:border [&_div_p]:rounded [&_div_p]:border-destructive [&_div_p]:px-2 [&_div_p]:bg-card [&_div_p]:bottom-[-33px] [&_div_p]:leading-8',
    rules: z
        .string({
          required_error: '名称不能为空',
        })
        .trim()
        .min(1, "名称不能为空")
        .max(32, "字符长度不能大于32！")
    /*rules: [
      {
        whitespace: true,
        required: true,
        message: '名称不能为空！',
      },
      {
        pattern: new RegExp('^.{1,32}$'),
        type: 'string',
        message: '字符长度不能大于32！',
      },
    ],*/
  },
  /*{
    fieldName: 'status',
    label: '状态',
    component: 'RadioButtonGroup',
    defaultValue: 0,
    componentProps: {
      options: [
        { label: '未生效', value: 0 },
        { label: '已生效', value: 1 },
      ],
    },
  },*/
];
