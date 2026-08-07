import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { z } from '@vben/common-ui';
import { z as zod } from 'zod';

export const columns: VxeTableGridOptions['columns'] = [
  {
    title: '用户名【工号】',
    field: 'username',
    width: 120,
    align: 'left',
  },
  {
    title: '姓名',
    field: 'name',
    width: 120,
    align: 'left',
    slots: { default: 'name' },
  },
  {
    title: '手机',
    field: 'mobile',
    width: 120,
    align: 'left',
  },
  {
    title: '启用状态',
    field: 'enabled',
    width: 80,
    align: 'center',
    slots: { default: 'enabled' },
  },
  {
    title: '过期状态',
    field: 'accountNonExpired',
    width: 100,
    align: 'center',
    slots: { default: 'accountNonExpired' },
  },
  {
    title: '锁定状态',
    field: 'accountNonLocked',
    width: 100,
    align: 'center',
    slots: { default: 'accountNonLocked' },
  },
  {
    title: '证书（密码）过期状态',
    field: 'credentialsNonExpired',
    width: 120,
    align: 'center',
    slots: { default: 'credentialsNonExpired' },
  },
  {
    title: '操作',
    field: 'action',
    width: 180,
    align: 'center',
    fixed: 'right',
    slots: { default: 'action' },
  },
];

export const searchFormSchema = z.object({
  keyword: z.string().optional(),
});

export const accountFormSchema = z.object({
  id: z.string().optional(),
  username: z.string().min(1, '用户名不能为空'),
  name: z.string().min(1, '姓名不能为空').max(20, '字符长度不能大于20'),
  mobile: z.string().optional(),
  enabled: z.boolean().default(true),
  accountNonLocked: z.boolean().default(true),
});

export const passwordFormSchema = z.object({
  id: z.string().optional(),
  password: z
    .string()
    .min(6, '长度必需在6-32之间')
    .max(32, '长度必需在6-32之间')
    .regex(/^[^\u4e00-\u9fa5]+$/, '密码不能输入汉字'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: '两次输入的密码不一致',
  path: ['confirmPassword'],
});
