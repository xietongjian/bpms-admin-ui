import { reactive } from 'vue';

import { defineStore } from 'pinia';
import {
  StorageManager,
  isBoolean,
  isFunction
} from '@vben/utils';
import { PROCESS_SETTING_KEY } from '#/enums/cacheEnum';

// import { setItem, getItem } from '@vben-core/shared/cache';


// import { createLocalStorage } from '#/utils/cache';
// import { PROCESS_SETTING_CACHE_TIME } from '#/settings/encryptionSetting';
import { toRaw } from 'vue';

// const localMemory = createLocalStorage({ timeout: PROCESS_SETTING_CACHE_TIME }); //new Memory(PROCESS_SETTING_CACHE_TIME);
const storageManager = new StorageManager({
  prefix: PROCESS_SETTING_KEY,
});
interface ProcessSettingState {
  /**
   * 表单/流程设计步骤条状态缓存
   */
  designerStepObj: {};
}
interface ProcessState {
  setting: ProcessSettingState;
}

/**
 * @zh_CN 流程设计相关
 */
export const useProcessSettingStore = defineStore("processSetting",{
  actions: {
    getDesignerStepObj() {
      return this.setting.designerStepObj;
    },
    getDesignerCurrentStepValue(modelId: string) {
      return this.setting?.designerStepObj &&
      this.setting?.designerStepObj[`modelId_${modelId}`]
          ? this.setting?.designerStepObj[`modelId_${modelId}`]
          : 0;
    },
    setProcessSetting(setting: Object) {
      this.setting = Object.assign({}, this.setting, setting);
      storageManager.setItem(PROCESS_SETTING_KEY, toRaw(this.setting));
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
    }
  },
  state: (): ProcessState => ({
    setting: storageManager.getItem(PROCESS_SETTING_KEY),
  })
});
