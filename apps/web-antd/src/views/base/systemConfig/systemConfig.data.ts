import { BasicColumn, FormSchema } from '@/components/Table';
import { OrderNoDefaultEnum, RemarkDefaultEnum } from '#/enums/commonEnum';

const colProps = {
  span: 24,
};
export const columns: BasicColumn[] = [
  {
    title: '名称',
    dataIndex: 'configName',
    align: 'left',
  },
  {
    title: '标识',
    dataIndex: 'configSn',
    width: 100,
    align: 'left',
  },
  {
    title: '配置Key',
    dataIndex: 'configKey',
    width: 100,
    align: 'left',
  },
  {
    title: '配置Value',
    dataIndex: 'configValue',
    align: 'left',
  },
  {
    title: '图片',
    dataIndex: 'image',
    align: 'center',
  },
  {
    title: '备注',
    dataIndex: 'remark',
    align: 'left',
  },
  {
    title: '排序',
    dataIndex: 'configOrder',
    width: 80,
    align: 'right',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 180,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'keyword',
    label: '关键字',
    component: 'Input',
    componentProps: {
      placeholder: '请输入名称/编码',
    },
    labelWidth: 60,
    colProps: {
      span: 6,
      lg: { span: 6, offset: 0 },
      sm: { span: 10, offset: 0 },
      xs: { span: 16, offset: 0 },
    },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'ID',
    component: 'Input',
    show: false,
  },
  {
    field: 'configName',
    label: '名称',
    required: true,
    component: 'Input',
    rules: z
        .string({
          required_error: '名称不能为空',
        })
        .trim()
        .min(1, "名称不能为空")
        .max(30, "字符长度不能大于30！")
    /*rules: [
      {
        required: true,
        whitespace: true,
        message: '名称不能为空！',
      },
      {
        max: 30,
        message: '字符长度不能大于30！',
      },
    ],*/
    colProps,
  },
  {
    field: 'configSn',
    label: '标识',
    required: true,
    component: 'Input',
    colProps,
  },
  {
    field: 'configKey',
    label: '配置Key',
    required: true,
    component: 'Input',
    colProps,
  },
  {
    field: 'configValue',
    label: '配置Value',
    component: 'Input',
    rules: z
        .string()
        .max(100, "字符长度不能大于100！")
        .nullable()
        .optional()
    /*rules: [
      {
        max: 100,
        message: '字符长度不能大于100！',
      },
    ],*/
    colProps,
  },
  {
    field: 'configOrder',
    label: '排序号',
    helpMessage: '数值越小越靠前！',
    required: false,
    component: 'InputNumber',
    defaultValue: OrderNoDefaultEnum.VALUE,
    componentProps: {
      min: OrderNoDefaultEnum.MIN,
      max: OrderNoDefaultEnum.MAX,
    },
  },
  {
    field: 'remark',
    label: '描述',
    required: false,
    component: 'InputTextArea',
    componentProps: {
      autoSize: {
        minRows: RemarkDefaultEnum.MIN_ROWS,
        maxRows: RemarkDefaultEnum.MAX_ROWS,
      },
    },
    rules: z
        .string()
        .max(1024, "字符长度不能大于1024！")
        .nullable()
        .optional()
    /*rules: [
      {
        max: 1024,
        message: '字符长度不能大于1024！',
      },
    ],*/
    colProps,
  },
];
