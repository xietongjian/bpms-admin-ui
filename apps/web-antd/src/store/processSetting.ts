import { reactive } from 'vue';

import { defineStore } from 'pinia';

import { PROCESS_SETTING_KEY } from '#/enums/cacheEnum';
// import { createLocalStorage } from '#/utils/cache';
// import { PROCESS_SETTING_CACHE_TIME } from '#/settings/encryptionSetting';
import { toRaw } from 'vue';

// const localMemory = createLocalStorage({ timeout: PROCESS_SETTING_CACHE_TIME }); //new Memory(PROCESS_SETTING_CACHE_TIME);

interface ProcessSettingState {
  setting: {
    // 表单/流程设计步骤条状态缓存
    designerStepObj: {};
  };
}

export const useProcessSettingStore = defineStore({
  id: 'process-setting',
  state: (): ProcessSettingState => {
    return {
      setting: {} //localMemory.get(PROCESS_SETTING_KEY),
    };
  },
  getters: {
    getProcessSetting(state) {
      return state.setting;
    },
    getDesignerStepObj(state) {
      return state.setting.designerStepObj;
    },
    getDesignerCurrentStepValue(state) {
      return (modelId: string) => {
        return state.setting?.designerStepObj &&
          state.setting?.designerStepObj[`modelId_${modelId}`]
          ? state.setting?.designerStepObj[`modelId_${modelId}`]
          : 0;
      };
    },
  },
  actions: {
    setProcessSetting(setting: Object) {
      this.setting = Object.assign({}, this.setting, setting);
      localMemory.set(PROCESS_SETTING_KEY, toRaw(this.setting));
    },
    setDesignerStepObj(currentStepValueObj: Object) {
      this.setProcessSetting(
        Object.assign({}, this.setting, {
          designerStepObj: {
            ...this.setting?.designerStepObj,
            ...currentStepValueObj,
          },
        }),
      );
    },
  },
});
