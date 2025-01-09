import { z } from '#/adapter/form';
import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import type { VxeGridProps } from '#/adapter/vxe-table';
import { RemarkDefaultEnum,FormValidPatternEnum } from '#/enums/commonEnum';
import { checkEntityExist } from '#/api/privilege/group';

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
    width: 140,
  },
];

// 权限设置
export const aclColumns: VxeGridProps['columns'] = [
  {
    title: '菜单名称',
    field: 'name',
    align: 'left',
    treeNode: true,
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
    slots: {default: 'pvs', header: 'pvsHeader'}
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

export const searchFormSchema: FormSchema[] = [
  {
    component: 'Input',
    fieldName: 'keyword',
    label: '关键字',
    componentProps: {
      placeholder: '请输入关键字',
      allowClear: true,
    }
  }
];

export const formSchema: FormSchema[] = [
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
    component: 'Input',
    rules: z
        .string({
          required_error: '名称不能为空',
        })
        .trim()
        .min(1, "名称不能为空")
        .max(64, "字符长度不能大于64")
  },
  {
    fieldName: 'sn',
    label: '标识',
    component: 'Input',
    dependencies: {
      rules(values) {
        const { id, sn } = values;
        return z
            .string({
              required_error: "用户组标识不能为空"
            })
            .min(1, "用户组标识不能为空")
            .max(100, '最多输入100个字符')
            .regex(new RegExp(FormValidPatternEnum.SN), '请输入英文或数字')
            .refine(
                async (e) => {
                  let result = false;
                  try {
                    result = await checkEntityExist({
                      id: id,
                      field: 'sn',
                      fieldValue: sn || '',
                      fieldName: '用户组标识',
                    });
                  } catch (e) {
                    console.error(e);
                  }
                  return result;
                },
                {
                  message: '用户组标识已存在',
                },
            );
      },
      triggerFields: ['sn'],
    },

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
  },
];

export const setAccountFormSchema: FormSchema[] = [
  {
    label: 'ID',
    fieldName: 'id',
    component: 'Input',
    dependencies: {
      show: () => false,
      triggerFields: [""]
    }
  },
  {
    label: '选择用户',
    fieldName: 'users',
    component: 'Select',
    labelWidth: 65,
    componentProps: {
      mode: 'multiple',
      placeholder: '请选择用户',
      class: 'w-full',
    },
  },
];
