import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import {FormValidPatternEnum} from "#/enums/commonEnum";
import { z } from '#/adapter/form';
import type {VxeGridProps} from '#/adapter/vxe-table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { OrderNoDefaultEnum, RemarkDefaultEnum } from '#/enums/commonEnum';
import { uploadApi } from '#/api/sys/upload';
// import {getAllNoticeTitle} from "#/api/portal/cms/noticeTitle";

export const columns: VxeGridProps['columns'] = [
  {
    title: '标题',
    field: 'title',
    width: 300,
    align: 'left',
  },
  {
    title: '标识',
    field: 'sn',
    width: 100,
    align: 'left',
  },
  {
    title: '短标题',
    field: 'shortTitle',
    width: 100,
    align: 'left',
  },
  {
    title: '状态',
    field: 'status',
    width: 60,
    align: 'center',
    customRender: ({ record }) => {
      const status = record.status;
      const enable = ~~status === 1;
      const color = enable ? 'green' : 'red';
      const text = enable ? '启用' : '停用';
      return h(Tag, { color: color }, () => text);
    },
  },
  // {
  //   title: '主体LOGO',
  //   field: 'logo',
  //   width: 100,
  //   align: 'center',
  //   slots: { customRender: 'logoRender' },
  // },
  {
    title: '签章图片',
    field: 'signatureImg',
    width: 100,
    align: 'center',
    // slots: { customRender: 'signatureImgRender' },
  },
  {
    title: '签发人',
    field: 'signerName',
    width: 100,
    align: 'left',
    slots: { customRender: 'signerNameRender' },
  },
  // {
  //   title: '所属单位名称',
  //   field: 'companyName',
  //   width: 100,
  //   align: 'left',
  // },
  // {
  //   title: '所属部门名称',
  //   field: 'deptName',
  //   width: 100,
  //   align: 'left',
  // },
  {
    title: '排序号',
    field: 'orderNo',
    width: 100,
    align: 'left',
  },
  {
    title: '操作',
    width: 120,
    align: 'center',
    slots: { default: 'action' },
    fixed: 'right',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    fieldName: 'keyword',
    label: '关键字',
    component: 'Input',
    componentProps: {
      placeholder: '请输入名称',
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
    fieldName: 'id',
    label: '主键',
    required: false,
    component: 'Input',
    show: false,
  },
  {
    fieldName: 'title',
    label: '名称',
    required: true,
    component: 'Input',
    show: true,
    rules: [
      {
        required: true,
        whitespace: true,
        message: '标题不能为空！',
      },
      {
        max: 260,
        message: '字符长度不能大于260！',
      },
    ],
    helpMessage: '用于生成落款',
  },
  {
    fieldName: 'shortTitle',
    label: '短标题',
    required: true,
    component: 'Input',
    show: true,
    rules: [
      {
        required: true,
        whitespace: true,
        message: '短标题不能为空！',
      },
      {
        max: 32,
        message: '字符长度不能大于32！',
      },
    ],
  },
  {
    fieldName: 'sn',
    label: '标识',
    required: true,
    component: 'Input',
    show: true,
  },
  /*  {
    fieldName: 'titleId',
    label: '公文套头',
    required: false,
    component: 'ApiSelect',
    componentProps: {
      api: getAllNoticeTitle,
      placeholder: '请选择公文套头',
      mode:"multiple",
    },
    helpMessage: '当前发文主体可使用的套头',
    show: true,
  },*/
  /*  {
    fieldName: 'usingRanges',
    label: '使用范围',
    required: true,
    component: 'OrgPersonalSelector',
    componentProps: {
      multiple: true
    },
    show: true,
  },*/
  {
    fieldName: 'pid',
    label: '父主体ID',
    required: false,
    component: 'Input',
    show: false,
  },
  // {
  //   fieldName: 'logoUploader',
  //   label: '主体LOGO',
  //   required: true,
  //   component: 'UploadFile',
  //   show: true,
  //   componentProps: {
  //     maxSize: 10,
  //     maxNumber: 1,
  //     // helpText: 'XXXXXXXXXXXXXX'
  //   },
  // },
  {
    fieldName: 'signatureImg',
    label: '签章图片',
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
  },

  /*{
    fieldName: 'companyId',
    label: '所属单位',
    required: false,
    component: 'OrgSelector',
    show: true,
    componentProps: {
      selectType: OrgSelectType.COMPANY
    }
  },*/

  {
    fieldName: 'haveSigner',
    label: '是否有签发人',
    required: false,
    component: 'Switch',
    defaultValue: false,
    show: true,
    componentProps: {
      checkedChildren: '是',
      unCheckedChildren: '否',
    },
    colProps: {
      span: 5,
    },
  },
  {
    fieldName: 'signerSelector',
    label: '签发人',
    required: true,
    component: 'PersonalSelector',
    show: ({ values }) => {
      return values.haveSigner;
    },
    dynamicRules: ({ values }) => {
      return values.haveSigner ? [{ required: true, message: '请选择签发人' }] : [];
    },
    colProps: {
      span: 10,
    },
  },
  {
    fieldName: 'status',
    label: '启用状态',
    required: true,
    component: 'Switch',
    defaultValue: true,
    show: true,
    componentProps: {
      checkedChildren: '启用',
      unCheckedChildren: '禁用',
    },
  },
  {
    fieldName: 'orderNo',
    label: '排序号',
    helpMessage: '数值越小越靠前！',
    required: false,
    component: 'InputNumber',
    show: true,
    defaultValue: OrderNoDefaultEnum.VALUE,
    componentProps: {
      min: OrderNoDefaultEnum.MIN,
      max: OrderNoDefaultEnum.MAX,
    },
  },
  {
    fieldName: 'remark',
    label: '备注',
    required: false,
    component: 'InputTextArea',
    show: true,
    rules: [
      {
        max: 512,
        message: '字符长度不能大于512！',
      },
    ],
    componentProps: {
      autoSize: {
        minRows: RemarkDefaultEnum.MIN_ROWS,
        maxRows: RemarkDefaultEnum.MAX_ROWS,
      },
    },
  },
];
