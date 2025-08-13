import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import {FormValidPatternEnum} from "#/enums/commonEnum";
import { z } from '#/adapter/form';
import type {VxeGridProps} from '#/adapter/vxe-table';
import { h } from 'vue';
import { getAllNoticeTitle, getCustomNoticeTitle } from '#/api/portal/cms/noticeTitle';
// import { Tinymce } from '#/components/Tinymce';
// import {getAllNoticeCategory} from "#/api/portal/cms/noticeCategory";
import { getAllNoticeSubject } from '#/api/portal/cms/noticeSubject';
// import {baseColumns} from "#/utils";
import { getAllBoard } from '#/api/portal/cms/board';

export const columns: VxeGridProps['columns'] = [
  {
    title: '标题',
    field: 'title',
    minWidth: 200,
    width: 400,
    align: 'left',
    resizable: true,
  },
  {
    title: '类型',
    field: 'categoryName',
    width: 100,
    align: 'left',
  },
  {
    title: '发布状态',
    field: 'publishStatusName',
    width: 100,
    align: 'center',
    // slots: { customRender: 'publishStatusRender' },
  },
  {
    title: '发文编号',
    field: 'noticeNo',
    width: 100,
    align: 'left',
    resizable: true,
  },
  {
    title: '发文主体',
    field: 'subjectName',
    width: 100,
    align: 'left',
    resizable: true,
  },

  {
    title: '发布时间',
    field: 'publishTime',
    width: 150,
    align: 'left',
  },
  {
    title: '发布版块',
    field: 'publishBoard',
    width: 120,
    align: 'left',
  },
  // {
  //   title: '发布单位',
  //   field: 'companyName',
  //   width: 100,
  //   align: 'left',
  // },
  // {
  //   title: '发布部门',
  //   field: 'deptName',
  //   width: 100,
  //   align: 'left',
  // },
  {
    title: '签发人',
    field: 'signerName',
    width: 100,
    align: 'center',
    // slots: { customRender: 'signerNameRender' },
  },
  {
    title: '浏览量',
    field: 'visitCount',
    width: 100,
    align: 'right',
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
      placeholder: '请输入关键字',
    },
    labelWidth: 70,
    colProps: {
      span: 6,
      lg: { span: 6, offset: 0 },
      sm: { span: 10, offset: 0 },
      xs: { span: 16, offset: 0 },
    },
  },
  // {
  //   fieldName: 'categoryId',
  //   label: '类别',
  //   component: 'ApiTreeSelect',
  //   componentProps: {
  //     api: getAllNoticeCategory,
  //     placeholder: '请选择类别',
  //   },
  //   labelWidth: 70,
  //   colProps: {span: 6, lg:{span: 6, offset:0}, sm:{span: 10, offset: 0}, xs:{span: 16, offset: 0}},
  // },
  {
    fieldName: 'subjectId',
    label: '发文主体',
    component: 'ApiTreeSelect',
    componentProps: {
      api: getAllNoticeSubject,
      placeholder: '请选择发文主体',
      params: { status: 1 },
    },
    labelWidth: 70,
    colProps: {
      span: 6,
      lg: { span: 6, offset: 0 },
      sm: { span: 10, offset: 0 },
      xs: { span: 16, offset: 0 },
    },
  },
  {
    fieldName: 'publishStatus',
    label: '发布状态',
    component: 'Select',
    componentProps: {
      placeholder: '请选择发布状态',
    },
    labelWidth: 70,
    colProps: {
      span: 6,
      lg: { span: 6, offset: 0 },
      sm: { span: 10, offset: 0 },
      xs: { span: 16, offset: 0 },
    },
  },
  /*{
    fieldName: 'publishBoard',
    label: '发布版块',
    component: 'ApiSelect',
    componentProps: {
      api: getAllBoard,
      params: {type: 1},
      placeholder: '请选择发布状态',
    },
    labelWidth: 70,
    colProps: {span: 6, lg:{span: 6, offset:0}, sm:{span: 10, offset: 0}, xs:{span: 16, offset: 0}},
  },*/
];

export const baseFormSchema: FormSchema[] = [
  /*  {
    fieldName: 'publishBoard',
    label: '发布版块',
    component: 'CheckboxGroup',
    show: true,
    required: true,
    colProps: {
      span: 24,
    }
  },*/
  {
    fieldName: 'title',
    label: '标题',
    required: true,
    component: 'Input',
    show: true,
    colProps: {
      span: 20,
    },
    componentProps: {
      maxlength: 256,
      autocomplete: 'off',
    },
  },
  {
    fieldName: 'noticeNo',
    label: '发文编号',
    required: false,
    component: 'Input',
    show: false,
  },
  {
    fieldName: 'categoryId',
    label: '公文类型',
    required: true,
    component: 'ApiTreeSelect',
    show: true,
    colProps: {
      span: 8,
    },
  },
  {
    fieldName: 'categoryName',
    label: '公文类型名称',
    component: 'Input',
    show: false,
  },
  {
    fieldName: 'subjectId',
    label: '发文主体',
    required: true,
    component: 'ApiTreeSelect',
    show: true,
    colProps: {
      span: 8,
    },
  },
  {
    fieldName: 'subjectName',
    label: '发文主体名称',
    component: 'Input',
    show: false,
  },
  {
    fieldName: 'signerNo',
    label: '签发人',
    required: false,
    component: 'Input',
    show: false,
  },
  {
    fieldName: 'signerName',
    label: '签发人',
    required: false,
    component: 'Input',
    ifShow: ({ values }) => {
      return !!values.signerNo;
    },
    componentProps: {
      disabled: true,
    },
    colProps: {
      pull: 0,
      span: 4,
    },
  },
  {
    fieldName: 'titleId',
    label: '公文套头',
    required: false,
    component: 'ApiSelect',
    componentProps: {
      api: getAllNoticeTitle,
    },
    show: true,
    colProps: {
      span: 10,
    },
  },
  {
    fieldName: 'publishRanges',
    label: '发布范围',
    required: true,
    component: 'OrgPersonalSelector',
    componentProps: {
      multiple: true,
    },
    span: 24,
    show: true,
    colProps: {
      span: 16,
    },
  },
  {
    fieldName: 'publishTime',
    label: '发布时间',
    required: false,
    component: 'DatePicker',
    show: true,
    componentProps: {
      width: '100%',
    },
    colProps: {
      span: 4,
    },
  },
  {
    fieldName: 'content',
    component: 'Input',
    label: '内容',
    defaultValue: '',
    // rules: [{ required: true }],
    colProps: {
      span: 24,
    },
    /*render: ({ model, field }) => {
      return h(Tinymce, {
        value: model[field],
        showImageUpload: false,
        onChange: (value: string) => {
          model[field] = value;
        },
      });
    },*/
  },
];
