import { reactive } from 'vue';

import { defineStore } from 'pinia';

export const usePersonalStore = defineStore('personal', () => {

  const personalMap = reactive(new Map<string, any>());

  const personalRequestCache = reactive(
      new Map<string, Promise<any | void>>(),
  );

  function getPersonalInfo(personalCode: string): any {
    debugger;
    if (!personalCode) return null;
    // 这里拿到的就不可能为空了
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return personalMap.get(personalCode)!;
  }

  function resetCache() {
    personalMap.clear();
  }

  function setPersonalInfo(personalCode: string, personal: any) {
    if (personalMap.has(personalCode)) {
      personalMap.get(personalCode);
    } else {
      personalMap.set(personalCode, personal);
    }
  }

  function $reset() {
    /**
     * doNothing
     */
  }

  return {
    $reset,
    personalMap,
    personalRequestCache,
    resetCache,
    getPersonalInfo,
    setPersonalInfo,
  };
});
