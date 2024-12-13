import { BasicColumn, FormSchema } from '@/components/Table';
import { RemarkDefaultEnum } from '@/enums/constantEnum';
import { uploadApi } from '#/api/sys/upload';

const colProps = {
  span: 24,
};
/**
 * name
 * url
 * imgUrl
 * description
 */
export const columns: BasicColumn[] = [
  {
    title: '名称',
    dataIndex: 'name',
    align: 'left',
    width: 300,
    resizable: true,
  },
  {
    title: '跳转路径',
    dataIndex: 'url',
    width: 180,
    align: 'left',
  },
  {
    title: '系统描述',
    dataIndex: 'description',
    align: 'left',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '关键字',
    component: 'Input',
    componentProps: {
      placeholder: '请输入关键字',
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
    field: 'name',
    label: '名称',
    required: true,
    component: 'Input',
    compnentProps: {
      placeholder: '请输入名称',
    },
    rules: [
      {
        required: true,
        whitespace: true,
        message: '名称不能为空！',
      },
      {
        max: 64,
        message: '字符长度不能大于64！',
      },
    ],
    colProps,
  },
  {
    field: 'url',
    label: '跳转地址',
    required: true,
    component: 'Input',
    componentProps: {
      placeholder: '请输入跳转地址',
    },
    rules: [
      {
        required: true,
        whitespace: true,
        message: '跳转地址不能为空！',
      },
      {
        max: 64,
        message: '字符长度不能大于64！',
      },
    ],
    colProps,
  },
  {
    field: 'imgUrl',
    label: '图标',
    required: false,
    component: 'ImageUpload',
    show: true,
    componentProps: {
      api: uploadApi,
      name: 'file',
      maxCount: 1,
      listType: 'picture-card',
      maxSize: 1,
      maxNumber: 1,
      multiple: false,
      helpText: '(仅支持gif,png)大小不超过1M，建议上传尺寸(像素)：200px*200px',
      accept: ['gif', 'png'],
    },
    colProps: {
      span: 12,
    },
  },
  {
    label: '系统描述',
    field: 'description',
    component: 'InputTextArea',
    componentProps: {
      placeholder: '请输入系统描述',
      autoSize: {
        minRows: RemarkDefaultEnum.MIN_ROWS,
        maxRows: RemarkDefaultEnum.MAX_ROWS,
      },
    },
    rules: [
      {
        max: 1024,
        message: '字符长度不能大于1024！',
      },
    ],
    colProps,
  },
];
