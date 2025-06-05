<script lang="ts" setup>
import type { VbenFormSchema } from '@vben/common-ui';
import type { BasicOption } from '@vben/types';
import { getVerifyCode } from '#/api/core/auth';

import {computed, h, ref, nextTick, markRaw, useTemplateRef} from 'vue';
import { message } from 'ant-design-vue';

import { AuthenticationLogin, SliderCaptcha, z } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { useAuthStore } from '#/store';
import type { Recordable } from '@vben/types';

defineOptions({ name: 'Login' });

const verifyCodeImgRef = ref();
const loginRef =
    useTemplateRef<InstanceType<typeof AuthenticationLogin>>('loginRef');
const reloadVerifyCode = () => {
  getVerifyCode().then(res => {
    verifyCodeImgRef.value.src=res;
  });
};

nextTick(() => {
  reloadVerifyCode();
});

const authStore = useAuthStore();

const MOCK_USER_OPTIONS: BasicOption[] = [
  {
    label: 'Super',
    value: 'admin',
  },
  {
    label: 'Admin',
    value: 'admin',
  },
  {
    label: 'User',
    value: 'jack',
  },
];

const formSchema = computed((): VbenFormSchema[] => {
  return [
    /*{
      component: 'VbenSelect',
      componentProps: {
        options: MOCK_USER_OPTIONS,
        placeholder: $t('authentication.selectAccount'),
      },
      fieldName: 'selectAccount',
      label: $t('authentication.selectAccount'),
      rules: z
        .string()
        .min(1, { message: $t('authentication.selectAccount') })
        .optional()
        .default('admin'),
    },*/
    {
      component: 'VbenInput',
      componentProps: {
        placeholder: $t('authentication.usernameTip'),
      },
      dependencies: {
        trigger(values, form) {
          if (values.selectAccount) {
            const findUser = MOCK_USER_OPTIONS.find(
              (item) => item.value === values.selectAccount,
            );
            if (findUser) {
              form.setValues({
                password: 'flowableplus',
                username: findUser.value,
              });
            }
          }
        },
        triggerFields: ['selectAccount'],
      },
      fieldName: 'username',
      label: $t('authentication.username'),
      rules: z.string().min(1, { message: $t('authentication.usernameTip') }),
    },
    {
      component: 'VbenInputPassword',
      componentProps: {
        placeholder: $t('authentication.password'),
      },
      fieldName: 'password',
      label: $t('authentication.password'),
      rules: z.string().min(1, { message: $t('authentication.passwordTip') }),
    },
    /*{
      component: markRaw(SliderCaptcha),
      fieldName: 'captcha',
      rules: z.boolean().refine((value) => value, {
        message: $t('authentication.verifyRequiredTip'),
      }),
    },*/
    {
      component: 'VbenInput',
      fieldName: 'verifyCode',
      rules: z.string().refine((value) => value, {
        message: $t('authentication.verifyRequiredTip'),
      }),
      controlClass: 'flex-1',
      componentProps: {
        placeholder: '请输入验证码',
      },
      suffix: () => {
        return h('img', {
          onClick: reloadVerifyCode,
          ref: verifyCodeImgRef,
          class: 'w-[140px] h-[40px] text-red-600 cursor-pointer', src: '', title: '点击刷新', alt: '验证码'
        })
      },
    },
  ];
});

async function onSubmit(params: Recordable<any>) {
  authStore.authLogin(params).catch((e) => {
    // 登陆失败，刷新验证码的演示
    message.error(e);
    reloadVerifyCode();

    // 使用表单API获取验证码组件实例，并调用其resume方法来重置验证码
    // loginRef.value
    //     ?.getFormApi()
    //     ?.getFieldComponentRef<InstanceType<typeof SliderCaptcha>>('captcha')
    //     ?.resume();
  });
}
</script>

<template>
  <AuthenticationLogin
      ref="loginRef"
      :showCodeLogin="false"
      :showForgetPassword="false"
      :showQrcodeLogin="false"
      :showRegister="false"
      :showThirdPartyLogin="false"
      subTitle=""
      title="飞流数智化"
    :form-schema="formSchema"
    :loading="authStore.loginLoading"
    @submit="onSubmit"
  >
  </AuthenticationLogin>
</template>
