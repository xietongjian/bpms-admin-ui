import { LevelNoDefaultEnum, OrderNoDefaultEnum } from '#/enums/commonEnum';
import { uploadInstitutionFile } from '#/api/institution/institution';
import type { VxeGridProps } from '#/adapter/vxe-table';
import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import {z} from "@vben/common-ui";


export const InstitutionColumns: VxeGridProps['columns'] = [
  {
    title: '名称',
    field: 'name',
    align: 'left',
    minWidth: 300,
    resizable: true,
  },
  {
    title: '级别',
    field: 'level',
    align: 'right',
    width: 80,
    resizable: true,
  },
  {
    title: '权限范围',
    field: 'privilegeRange',
    width: 120,
    slots: {default: 'privilegeRange'},
  },
  {
    title: '部门',
    field: 'deptRangeData',
    minWidth: 300,
    slots: {default: 'deptRangeData'},
    width: 300,
  },
  {
    title: '岗位',
    field: 'positionRangeData',
    minWidth: 300,
    slots: {default: 'positionRangeData'},
    width: 300,
  },
  {
    title: '排序',
    field: 'orderNo',
    align: 'right',
    width: 80,
  },
  {
    title: '创建时间',
    field: 'createTime',
    width: 180,
  },
  {
    width: 100,
    align: 'left',
    title: '操作',
    field: 'action',
    slots: {default: 'action'},
    fixed: 'right'
  }
];

export const InstitutionSearchForm: FormSchema[] = [
  {
    fieldName: 'keyword',
    label: '关键字',
    component: 'Input',
    componentProps: {
      placeholder: '请输入名称/编码',
    },
    labelWidth: 60,
  },
  {
    fieldName: 'categoryId',
    label: '',
    component: 'Input',
    dependencies: {
      show: ()=> false,
      triggerFields: [""]
    }
  },
];

export const InstitutionModalForm: FormSchema[] = [
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
    fieldName: 'categoryId',
    label: 'categoryId',
    component: 'Input',
    dependencies: {
      show: () => false,
      triggerFields: [""]
    }
  },
  {
    fieldName: 'name',
    label: '名称',
    component: 'Input',
    rules: z
        .string({
          required_error: '名称不能为空',
        })
        .trim()
        .min(1, "名称不能为空")
        .max(100, "字符长度不能大于100！")
  },
  {
    fieldName: 'level',
    label: '级别',
    component: 'InputNumber',
    defaultValue: LevelNoDefaultEnum.VALUE,
    componentProps: {
      min: LevelNoDefaultEnum.MIN,
      max: LevelNoDefaultEnum.MAX,
    },
    rules: 'required'
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
  {
    fieldName: 'filePath',
    // slot: 'UploadFile',
    label: '制度文件',
    component: 'Upload'
    // rules: [{ required: true, trigger: 'change', message: '请选择上传文件' }],
  },
  {
    fieldName: 'privilegeRange',
    component: 'RadioGroup',
    label: '权限范围',
    rules: 'selectRequired',
    componentProps: {
      options: [
        {
          label: '公开',
          value: '1',
        },
        {
          label: '设置范围',
          value: '2',
        },
      ],
    },
  },
  {
    fieldName: 'deptRangeData',
    label: '部门',
    component: 'OrgSelector',
    componentProps: {
      multiple: true,
      selectType: '2',
      placeholder: '请选择可见部门',
    },
    dependencies: {
      show: ({ values }) => values?.['privilegeRange'] === '2',
      triggerFields: ['deptRangeData']
    },
    // componentProps: {
    //   treeNodeFilterProp: 'name',
    //   getPopupContainer: () => document.body,
    // },
    // required: true,
    rules: 'selectRequired'
  },
  {
    fieldName: 'positionRangeData',
    label: '岗位',
    component: 'PositionSelector',
    componentProps: {
      title: '选择岗位',
      multiple: true,
    },
    // componentProps: {
    //   treeNodeFilterProp: 'name',
    //   getPopupContainer: () => document.body,
    // },
    dependencies: {
      show: ({ values }) => values?.['privilegeRange'] === '2',
      triggerFields: ['positionRangeData']
    },
    rules: 'selectRequired'
  },
];
