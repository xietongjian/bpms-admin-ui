import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import { checkEntityExist } from '#/api/org/personal';

import type {VxeGridProps} from '#/adapter/vxe-table';

import { RemarkDefaultEnum,FormValidPatternEnum } from '#/enums/commonEnum';
import {z} from "@vben/common-ui";
import {getCompanies, getCompaniesListData} from "#/api/org/company";
import {getDeptListData, getDepts} from "#/api/org/dept";
import {getJobGradeTree} from "#/api/org/jobGrade";
import {getPositionInfoTree} from "#/api/org/positionInfo";

export const columns: VxeGridProps['columns'] = [
  {
    title: '姓名',
    field: 'name',
    width: 120,
    align: 'left',
    slots: {default: 'name'}
  },
  {
    title: '工号',
    field: 'code',
    width: 100,
    align: 'left',
    resizable: true,
  },
  {
    title: '状态',
    field: 'status',
    width: 60,
    slots: {default: 'status'}
  },
  {
    title: '邮箱',
    field: 'email',
    width: 120,
    align: 'left',
    resizable: true,
  },
  {
    title: '手机',
    field: 'mobile',
    width: 120,
    align: 'left',
    resizable: true,
  },
  {
    title: '部门',
    field: 'deptName',
    minWidth: 120,
    align: 'left',
    resizable: true,
  },
  {
    title: '公司',
    field: 'companyName',
    minWidth: 120,
    align: 'left',
    resizable: true,
  },
  {
    title: '上级领导',
    field: 'leaderName',
    width: 100,
    align: 'center',
    slots: {default: 'leaderName'},
  },
  {
    title: '角色',
    field: 'roles',
    minWidth: 120,
    align: 'left',
    slots: {default: 'roles'},
  },
  {
    title: '离职日期',
    field: 'leaveDate',
    width: 100,
    /*customRender: ({ text }) => {
      return text ? formatToDate(text) : '';
    },*/
  },
  {
    title: '创建时间',
    field: 'createTime',
    width: 130,
    /*customRender: ({ text }) => {
      return text ? formatToDateTime(text) : '';
    },*/
  },
  {
    field: 'action',
    fixed: 'right',
    slots: {default: 'action'},
    title: '操作',
    width: 120,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    fieldName: 'keyword',
    label: '关键字',
    component: 'Input',
    componentProps: {
      placeholder: '请输入姓名/工号/手机/邮箱',
      allowClear: true,
    },
    labelWidth: 60,
  },
];

export const personalFormSchema: FormSchema[] = [
  {
    fieldName: 'id',
    label: 'ID',
    component: 'Input',
    dependencies: {
      show: false,
      triggerFields: ["id"]
    }
  },
  {
    fieldName: 'name',
    label: '姓名',
    component: 'Input',
    formItemClass: 'col-span-2 items-baseline',
    rules: z
        .string({
          required_error: '姓名不能为空',
        })
        .trim()
        .min(1, "名称不能为空")
        .max(20, "字符长度不能大于20"),
  },
  {
    fieldName: 'code',
    label: '工号',
    component: 'Input',
    formItemClass: 'col-span-2 items-baseline',
    componentProps: {
      class: 'w-full'
    },
    dependencies: {
      rules(values) {
        const { id, code } = values;
        return z
            .string({
              required_error: "工号不能为空"
            })
            .min(1, "工号不能为空")
            .max(100, '最多输入100个字符')
            .regex(new RegExp(FormValidPatternEnum.CODE), '请输入英文或数字')
            .refine(
                async (e) => {
                  let result = false;
                  try {
                    result = await checkEntityExist({
                      id: id,
                      field: 'code',
                      fieldValue: code || '',
                      fieldName: '人员工号',
                    });
                  } catch (e) {
                    console.error(e);
                  }
                  return result;
                },
                {
                  message: '工号已存在',
                },
            );
      },
      triggerFields: ['code'],
    },
  },
  {
    fieldName: 'headImg',
    label: '',
    component: 'Input',
    hideLabel: true,
    wrapperClass: 'absolute [&_.ant-upload-wrapper]:flex [&_.ant-upload-wrapper]:flex [&_.ant-upload-wrapper]:justify-center',
    formItemClass: 'col-span-1 [&_>div]:relative [&_>div]:overflow-visible ',
  },
  {
    fieldName: 'sex',
    label: '性别',
    component: 'RadioGroup',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: '男', value: 1 },
        { label: '女', value: 2 },
      ],
    },
    formItemClass: 'col-span-4 items-baseline',
  },
  {
    fieldName: 'companyId',
    label: '所属公司',
    component: 'ApiTreeSelect',
    componentProps: {
      class: 'w-full',
      api: getCompanies,
      childrenField: 'children',
      treeDataSimpleMode: { id: "id", pId: "pid", rootPId: null },
      labelField: 'cname',
      valueField: 'id',
      allowClear: true,
      getPopupContainer: () => document.body,
    },
    rules: 'selectRequired',
    formItemClass: 'col-span-2 items-baseline',
  },
  {
    fieldName: 'deptId',
    label: '所属部门',
    component: 'ApiTreeSelect',
    dependencies: {
      triggerFields: ['companyId'],
      componentProps: (values, schema) => {
        if(values.companyId){
          return {
            immediate: true,
            params: {companyId: values.companyId}
          }
        } else {
          return {
            immediate: false,
          }
        }
      },
    },
    componentProps: {
      class: 'w-full',
      api: getDepts,
      childrenField: 'children',
      treeDataSimpleMode: { id: "id", pId: "pid", rootPId: null },
      labelField: 'title',
      valueField: 'id',
      allowClear: true,
      getPopupContainer: () => document.body,
    },
    rules: 'selectRequired',
    formItemClass: 'col-span-2 items-baseline',
  },
  {
    fieldName: 'jobGradeCode',
    label: '职级',
    component: 'ApiTreeSelect',
    componentProps: {
      class: 'w-full',
      api: getJobGradeTree,
      childrenField: 'children',
      treeDataSimpleMode: { id: "id", pId: "pid", rootPId: null },
      labelField: 'title',
      valueField: 'id',
      allowClear: true,
      getPopupContainer: () => document.body,
    },
    formItemClass: 'col-span-2 items-baseline',
  },
  {
    fieldName: 'positionCode',
    label: '岗位',
    component: 'ApiTreeSelect',
    componentProps: {
      class: 'w-full',
      api: getPositionInfoTree,
      childrenField: 'children',
      treeDataSimpleMode: { id: "id", pId: "pid", rootPId: null },
      labelField: 'title',
      valueField: 'id',
      allowClear: true,
      getPopupContainer: () => document.body,
    },
    formItemClass: 'col-span-2 items-baseline',
  },
  {
    label: '手机',
    fieldName: 'mobile',
    component: 'Input',
    formItemClass: 'col-span-2 items-baseline',
    rules: z
        .string({
          required_error: '手机号不能为空',
          invalid_type_error: '格式不正确',
        })
        .max(11, "字符长度不能大于11")
        .regex(new RegExp('^(1[0-9])\\d{9}$'), "请输入正确的手机号"),
  },
  {
    label: '邮箱',
    fieldName: 'email',
    component: 'Input',
    formItemClass: 'col-span-2 items-baseline',
    rules: z
        .string({
          required_error: '邮箱不能为空',
          invalid_type_error: '格式不正确',
        })
        .max(256, "字符长度不能大于256")
        .regex(new RegExp('^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$'), "请输入正确的邮箱地址"),
  },
  {
    fieldName: 'status',
    label: '在职状态',
    component: 'RadioGroup',
    defaultValue: 1,
    formItemClass: 'col-span-4 items-baseline',
    componentProps: {
      options: [
        { label: '在职', value: 1 },
        { label: '离职', value: 0 },
      ],
    },
  },
  {
    label: '地址',
    fieldName: 'address',
    component: 'Textarea',
    formItemClass: 'col-span-5 items-baseline',
    componentProps: {
      autoSize: {
        minRows: RemarkDefaultEnum.MIN_ROWS,
        maxRows: RemarkDefaultEnum.MAX_ROWS,
      },
    },
    rules: z
        .string()
        .max(500, "字符长度不能大于500！")
        .nullish()
        .optional(),
  },
];
