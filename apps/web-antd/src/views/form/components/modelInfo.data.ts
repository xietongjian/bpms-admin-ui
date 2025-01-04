import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import {FormValidPatternEnum} from "#/enums/commonEnum";
import { z } from '#/adapter/form';
import type {VxeGridProps} from '#/adapter/vxe-table';
import { Tag } from 'ant-design-vue';
import { checkEntityExist } from '#/api/form/bizForm';

import { h } from 'vue';
import { OrderNoDefaultEnum } from '#/enums/commonEnum';
import { uploadApi } from '#/api/sys/upload';
import {getFlowCategories, getFlowCategoryTreeData} from "#/api/base/category";

const colProps = {
  span: 24,
};
export const columns: VxeGridProps['columns'] = [
  {
    title: '名称',
    field: 'name',
    align: 'left',
  },
  {
    title: 'KEY',
    field: 'modelKey',
    width: 100,
    align: 'left',
  },
  {
    title: '分类名称',
    field: 'categoryName',
    width: 100,
    align: 'left',
  },
  {
    title: '系统',
    field: 'appName',
    width: 100,
    align: 'left',
  },
  {
    title: '应用范围',
    field: 'appliedRangeName',
    width: 100,
    align: 'left',
  },
  {
    title: '状态',
    field: 'statusName',
    width: 70,
    align: 'center',
    customRender: ({ record }) => {
      const { status, statusName } = record;
      let color = '';
      if (~~status === 2) {
        color = 'yellow';
      } else if (~~status === 3) {
        color = 'green';
      } else if (~~status === 4) {
        color = 'red';
      } else {
        color = 'gray';
      }
      return h(Tag, { color: color }, () => statusName);
    },
  },
  {
    title: '更新时间',
    field: 'updateTime',
    width: 120,
    align: 'left',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    fieldName: 'keyword',
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
  {
    fieldName: 'appSn',
    label: '系统',
    component: 'Select',
    labelWidth: 60,
    colProps: {
      span: 6,
      lg: { span: 6, offset: 0 },
      sm: { span: 10, offset: 0 },
      xs: { span: 16, offset: 0 },
    },
  },
];

export const modelInfoSettingFormSchema: FormSchema[] = [
  {
    fieldName: 'id',
    label: 'ID',
    component: 'Input',
    dependencies: {
      show: false,
      triggerFields: ['id'],
    }
  },
  {
    fieldName: 'version',
    label: 'version',
    component: 'Input',
    dependencies: {
      show: false,
      triggerFields: ['id'],
    }
  },
  {
    fieldName: 'formType',
    label: 'formType',
    component: 'Input',
    dependencies: {
      show: false,
      triggerFields: ['id'],
    }
  },
  {
    fieldName: 'basicTitle',
    hideLabel: true,
    slot: 'basicTitle',
    formItemClass: 'm-0 p-0',
  },
  {
    fieldName: 'showName',
    label: '名称/编号',
    slot: 'showTitle',
    colProps,
    show: ({ values }) => {
      return values.formType === 0;
    },
  },
  {
    fieldName: 'name',
    label: '流程名称',
    required: true,
    component: 'Input',
    colProps: {
      span: 12,
    },
    dependencies: {
      show(values) {
        return values.formType !== 0;
      },
      triggerFields: [''],
    }
  },
  {
    fieldName: 'modelKey',
    label: '流程编码',
    required: true,
    component: 'Input',
    colProps: {
      span: 12,
    },
    dependencies: {
      show(values) {
        return values.formType !== 0;
      },
      disabled(values){
        return !!values.id;
      } ,
      triggerFields: [''],
    }
  },
  {
    fieldName: 'appSn',
    label: '所属系统',
    required: true,
    component: 'Select',
    componentProps: {
      treeNodeFilterProp: 'name',
      getPopupContainer: () => document.body,
    },
    dependencies: {
      show(values) {
        return values.formType !== 0;
      },
      disabled(values){
        return values.version > 0;
      } ,
      triggerFields: [''],
    },
    colProps: {
      span: 12,
    },
  },
  {
    fieldName: 'categoryCode',
    label: '所属分类',
    required: true,
    component: 'TreeSelect',
    componentProps: {
      treeNodeFilterProp: 'name',
      getPopupContainer: () => document.body,
    },
    colProps: {
      span: 12,
    },
  },
  {
    fieldName: 'flowOwnerNo',
    label: '流程Owner',
    component: 'PersonalSelector',
    required: true,
    componentProps: {
      multiple: false,
      placeholder: '请选择人员',
      onChange: (data) => {
        debugger;
      },
    },
    colProps: {
      span: 12,
    },
  },
  {
    fieldName: 'ownDeptId',
    label: '归属部门',
    component: 'OrgSelector',
    required: true,
    componentProps: {
      multiple: false,
      selectType: '2',
      placeholder: '请选择流程归属部门',
    },
    colProps: {
      span: 12,
    },
  },
  {
    fieldName: 'processDockingNo',
    label: '流程BP',
    help: '流程对接人',
    component: 'PersonalSelector',
    required: true,
    componentProps: {
      labelInValue: true,
      multiple: false,
      placeholder: '请选择人员',
    },
    colProps: {
      span: 12,
    },
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
    colProps: {
      span: 12,
    },
  },
  /*{
    fieldName: 'modelIcon',
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
  },*/
  {
    fieldName: 'modelIcon',
    label: '图标',
    component: 'SysIconPicker',
    componentProps: {
      mode: 'svg',
    },
    colProps: {
      span: 12,
    },
  },
  {
    fieldName: 'privilegeTitle',
    slot: 'privilegeTitle',
    colProps,
  },

  {
    fieldName: 'appliedRange',
    label: '使用范围',
    component: 'Select',
    componentProps: {
      getPopupContainer: () => document.body,
    },
    required: true,
    colProps: { span: 12 },
  },

  {
    fieldName: 'applyCompanies',
    label: '适用单位',
    component: 'OrgSelector',
    required: true,
    componentProps: {
      labelInValue: true,
      multiple: true,
      selectType: '1',
      placeholder: '请选择单位',
    },
  },
  {
    fieldName: 'authPointList',
    label: '授权功能',
    component: 'CheckboxGroup',
    required: true,
  },

  {
    fieldName: 'superuser',
    label: '授权管理人员',
    component: 'PersonalSelector',
    componentProps: {
      multiple: true,
      placeholder: '请选择人员',
    },
  },
  {
    fieldName: 'skipSet',
    label: '跳过方式',
    help: '相同节点是否跳过',
    component: 'RadioGroup',
    defaultValue: 1,
    componentProps: {},
  },
  {
    fieldName: 'backFlag',
    label: '驳回跳转方式',
    help: '驳回自动回原节点',
    component: 'RadioGroup',
    defaultValue: 0,
    componentProps: {
      options: [
        {
          label: '自动回原节点',
          value: 1,
        },
        {
          label: '不回原节点',
          value: 0,
        },
      ],
    },
  },
  {
    fieldName: 'showStatus',
    label: '适用平台',
    help: '该流程表单适用的平台',
    component: 'CheckboxGroup',
    defaultValue: [],
    componentProps: {
      options: [
        {
          label: 'PC',
          value: 'pc',
        },
        {
          label: 'Pad',
          value: 'ipad',
        },
        {
          label: '手机',
          value: 'mobile',
        },
      ],
    },
    colProps: { span: 24 },
  },
];

export const copyModelInfoFormSchema: FormSchema[] = [
  {
    fieldName: 'fromModelKey',
    label: '来源ModelKey',
    component: 'Input',
    dependencies: {
      show: false,
      triggerFields: ['fromModelKey'],
    }
  },
  {
    fieldName: 'newModelName',
    label: '新表单名称',
    component: 'Input',
    rules: z
        .string({
          required_error: '名称不能为空',
        })
        .trim()
        .min(1, "名称不能为空")
        .max(60, "字符长度不能大于60！")
  },
  {
    fieldName: 'newCategoryCode',
    label: '新分类',
    rules: 'selectRequired',
    component: 'ApiTreeSelect',
    componentProps: {
      api: getFlowCategories,
      class: 'w-full',
      treeDataSimpleMode: {id: 'id', pId: 'pid'},
      treeNodeFilterProp: 'name',
      labelField: 'name',
      valueField: 'code',
      getPopupContainer: () => document.body,
    },
  },
];

export const copyBizModelInfoFormSchema: FormSchema[] = [
  {
    fieldName: 'fromModelKey',
    label: '来源ModelKey',
    component: 'Input',
    dependencies: {
      show: false,
      triggerFields: ['fromModelKey'],
    }
  },
  {
    fieldName: 'newModelName',
    label: '新表单名称',
    component: 'Input',
    rules: z
        .string({
          required_error: '名称不能为空',
        })
        .trim()
        .min(1, "名称不能为空")
        .max(60, "字符长度不能大于60！")
  },
  {
    fieldName: 'newModelKey',
    label: '新表单Key',
    component: 'Input',
    rules: z
        .string({
          required_error: 'Key不能为空！',
        })
        .trim()
        .min(1, "Key不能为空！")
        .max(60, "字符长度不能大于60！")
        .regex(new RegExp('^[a-zA-Z_]{1,}[0-9a-zA-Z_]{1,}$'),'请输入英文或数字且以英文或下划线开头！'),
  },
  {
    fieldName: 'newCategoryCode',
    label: '新分类',
    rules: 'selectRequired',
    component: 'TreeSelect',
    componentProps: {
      treeNodeFilterProp: 'name',
      replaceFields: {
        title: 'name',
        key: 'code',
        value: 'code',
      },
      getPopupContainer: () => document.body,
    },
  },
];

export const vxeFlowVariableTableColumns = [
  {
    title: '序号',
    type: 'seq',
    fixed: 'left',
    width: '50',
    align: 'center',
  },
  {
    title: '变量名称',
    width: 200,
    field: 'value',
    align: 'left',
    editRender: {
      name: 'AInput',
      placeholder: '请点击输入',
    },
  },
  {
    title: '变量标识',
    field: 'key',
    align: 'left',
    editRender: {
      name: 'AInput',
      placeholder: '请点击输入',
    },
  },
  /*  {
    title: '变量类型',
    field: 'variableType',
    align: 'center',
  },*/
  {
    title: '内置变量',
    field: 'innerVariable',
    align: 'center',
    slots: { default: 'innerVariableRender' },
  },
  {
    width: 160,
    title: '操作',
    align: 'center',
    slots: { default: 'action' },
    fixed: 'center',
  },
];
export const flowVariableTableColumns: VxeGridProps['columns'] = [
  {
    title: '变量名',
    width: 200,
    field: 'name',
    align: 'left',
    resizable: true,
  },
  {
    title: '变量标识',
    field: 'sn',
    width: 150,
    align: 'left',
  },
  {
    title: '变量类型',
    field: 'url',
    align: 'left',
  },
  {
    title: '内置变量',
    field: 'status',
    width: 80,
    customRender: ({ record }) => {
      const status = record.status;
      const enable = ~~status === 1;
      const color = enable ? 'green' : 'red';
      const text = enable ? '启用' : '停用';
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: '备注',
    field: 'note',
    align: 'left',
  },
];

export const uploadVariableFileFormSchema: FormSchema[] = [
  {
    fieldName: 'filePath',
    slot: 'UploadFile',
    label: '变量配置文件',
    colProps: {
      span: 24,
    },
  },
];
