import type {VbenFormSchema as FormSchema} from '@vben/common-ui';
import {z} from "@vben/common-ui";
import {FormValidPatternEnum} from "#/enums/commonEnum";


export const listColumns = [
    {title: '序号', type: 'seq', width: 50},
    {
        field: 'image',
        align: 'center',
        title: '图标',
        slots: {default: 'image'}
    },

    {field: 'name', align: 'left', title: '名称', showOverflow: true},
    {field: 'sn', align: 'left', title: '标识', showOverflow: true},
    {field: 'url', align: 'left', title: 'URL'},
    {field: 'indexUrl', align: 'left', title: '首页地址', showHeaderOverflow: true},
    {field: 'status', title: '状态', slots: {default: 'status'}, width: 100},

    {field: 'platformEnabled', title: '开启平台推送', slots: {default: 'platformEnabled'}, width: 100, showHeaderOverflow: true},
    {field: 'orderNo', align: 'right', title: '排序', width: 100},
    {field: 'note', align: 'left', title: '备注'},
    {
        field: 'action',
        fixed: 'right',
        slots: {default: 'action'},
        title: '操作',
        width: 120,
    },
];

/*
export const columns: BasicColumn[] = [
  {
    title: '图标',
    dataIndex: 'image',
    width: 60,
    customRender: ({ record }) => {
      return h(Icon, { icon: record.image });
    },
  },
  {
    title: '名称',
    width: 200,
    dataIndex: 'name',
    align: 'left',
    resizable: true,
  },
  {
    title: '标识',
    dataIndex: 'sn',
    width: 150,
    align: 'left',
  },
  {
    title: 'URL',
    dataIndex: 'url',
    align: 'left',
  },
  {
    title: '首页',
    dataIndex: 'indexUrl',
    width: 100,
    align: 'left',
  },
  {
    title: '状态',
    dataIndex: 'status',
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
    title: '推送状态',
    dataIndex: 'platformEnabled',
    width: 100,
    customRender: ({ record }) => {
      const platformEnabled = record.platformEnabled;
      const enable = ~~platformEnabled === 0;
      const color = enable ? 'green' : 'blue';
      const text = enable ? '不推送' : '推送';
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: '排序',
    dataIndex: 'orderNo',
    width: 80,
    align: 'right',
  },
  {
    title: '备注',
    dataIndex: 'note',
    align: 'left',
  },
];
*/

export const searchFormSchema: FormSchema[] = [
    {
        component: 'Input',
        fieldName: 'keyword',
        label: '关键字',
        componentProps: {
            placeholder: '请输入关键字',
            allowClear: true,
        }
    },
];

export const formSchema: FormSchema[] = [
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
        label: '名称',
        component: 'Input',
        componentProps: {
            placeholder: '请输入用户名',
        },
        rules: z
            .string()
            .trim()
            .min(0, "名称不能为空")
            .min(1, "名称不能为空")
            .max(64, "系统名称不能大于64个字符")
        /*rules: [
          {
            required: true,
            whitespace: true,
            message: '名称不能为空！',
          },
          {
            max: 32,
            message: '字符长度不能大于32！',
          },
        ],*/
    },
    {
        fieldName: 'sn',
        label: '标识',
        rules: 'required',
        component: 'Input',
    },
    {
        fieldName: 'url',
        label: '系统URL',
        rules: 'required',
        component: 'Input',
        /*rules: [
          {
            required: true,
            whitespace: true,
            message: '系统URL不能为空！',
          },
          {
            pattern: new RegExp('[a-zA-z]+://[^\\s]*'),
            type: 'string',
            message: '请输入正确的URL地址！',
          },
          {
            max: 40,
            message: '字符长度不能大于40！',
          },
        ],*/
    },
    {
        fieldName: 'indexUrl',
        label: '首页URL',
        component: 'Input',
        required: false,
        rules: z
            .string()
            .regex(new RegExp('^\\/(\\w+\\/?)+(\\.?\\w+)?$'), "URL格式不正确！"),
        /*rules: [
          {
            required: true,
            whitespace: true,
            message: '首页URL不能为空！',
          },
          {
            pattern: new RegExp('^\\/(\\w+\\/?)+(\\.?\\w+)?$'),
            type: 'string',
            message: '请输入正确的URL地址！！',
          },
          {
            max: 128,
            message: '字符长度不能大于128！',
          },
        ],*/
    },
    {
        fieldName: 'orderNo',
        label: '排序号',
        help: '数值越小越靠前！',
        component: 'InputNumber',
        defaultValue: 100,
        componentProps: {
            min: 0,
            max: 999999,
            class: 'w-1/2'
        },

    },
    {
        fieldName: 'status',
        label: '状态',
        component: 'Switch',
        defaultValue: 1,
        componentProps: {
            checkedValue: 1,
            unCheckedValue: 0,
            checkedChildren: '启用',
            unCheckedChildren: '禁用',
        },
    },
    {
        fieldName: 'platformEnabled',
        label: '是否推送',
        help: '是否推送消息至第三方平台！',
        component: 'Switch',
        defaultValue: 0,
        componentProps: {
            checkedValue: 1,
            unCheckedValue: 0,
            checkedChildren: '推送',
            unCheckedChildren: '不推送',
        },
    },
    {
        label: '备注',
        fieldName: 'note',
        component: 'Textarea',
        componentProps: {
            // autosize: true,
            autoSize: {
                minRows: 4,
                maxRows: 8,
            },
            rows: 4
        },
        rules: z.string().max(500, "字符长度不能大于500！"),
    },
];

export const secretKeyFormSchema: FormSchema[] = [
    {
        field: 'id',
        label: 'ID',
        component: 'Input',
        show: false,
    },
    {
        field: 'sn',
        label: '标识（appKey）',
        // component: 'Input',
        slot: 'snSlot',
    },
    {
        label: '密钥（appSecretKey）',
        field: 'secretKey',
        // component: 'InputTextArea',
        slot: 'secretKeySlot',
    },
];
