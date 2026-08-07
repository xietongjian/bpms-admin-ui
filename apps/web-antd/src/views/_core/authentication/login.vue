<script lang="ts" setup>
import type { VbenFormSchema } from '@vben/common-ui';
import type { BasicOption } from '@vben/types';

import {computed, ref} from 'vue';
import { message } from 'ant-design-vue';

import { AuthenticationLogin, z } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { useAuthStore } from '#/store';
import type { Recordable } from '@vben/types';
// @ts-ignore
import Verify from './components/Verifition/Verify.vue';

defineOptions({ name: 'Login' });

const verifyRef = ref<InstanceType<typeof Verify>>();
const formParams = ref<Recordable<any>>({});

const authStore = useAuthStore();

const MOCK_USER_OPTIONS: BasicOption[] = [
  { label: 'Super', value: 'admin' },
  { label: 'Admin', value: 'admin' },
  { label: 'User', value: 'jack' },
];

const formSchema = computed((): VbenFormSchema[] => {
  return [
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
  ];
});

async function onSubmit(params: Recordable<any>) {
  formParams.value = params;
  verifyRef.value?.show();
}

const captchaLoginFn = async (captchaData: Recordable<any>) => {
  try {
    await authStore.authLogin({
      ...formParams.value,
      ...captchaData,
    });
    verifyRef.value?.closeBox();
  } catch (e) {
    message.error(typeof e === 'string' ? e : '登录失败');
    verifyRef.value?.refresh();
  }
};
</script>

<template>
<div>
  <AuthenticationLogin class="relative"
     :showCodeLogin="true"
     :showForgetPassword="false"
     :showQrcodeLogin="true"
     :showRegister="false"
     :showThirdPartyLogin="true"
     subTitle=""
     title="飞流数智化"
     :form-schema="formSchema"
     :loading="authStore.loginLoading"
     @submit="onSubmit"
  />
  <Verify ref="verifyRef" :loginFn="captchaLoginFn" />
</div>
</template>
