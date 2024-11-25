import type { Recordable, UserInfo } from '@vben/types';

import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { useAccessStore, useUserStore } from '@vben/stores';

import { defineStore } from 'pinia';

import { getByCodes } from '#/api/org/personal';

export const usePersonalStore = defineStore('personal', () => {
  const accessStore = useAccessStore();
  const personalStore = useUserStore();

  const loginLoading = ref(false);


  async function fetchPersonalInfo(personalNo: string) {
    let userInfo: null | UserInfo = null;
    userInfo = await getByCodes([personalNo]);
    personalStore.setUserInfo(userInfo);
    return userInfo;
  }

  function $reset() {
    loginLoading.value = false;
  }

  return {
    $reset,
    personalStore,
    fetchPersonalInfo,
    loginLoading,
  };
});
