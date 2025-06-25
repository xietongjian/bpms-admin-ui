import {initPreferences, updatePreferences} from '@vben/preferences';
import { unmountGlobalLoading } from '@vben/utils';

import { overridesPreferences } from './preferences';
import {getSysConfig, getSysConfigVersion} from "#/api/sys/user";

const DRAGON_SYS_CONFIG_KEY = "DRAGON_SYS_CONFIG";

async function getSystemConfig() {
  const res = await getSysConfig();
  debugger;
  return res;
}
/**
 * 应用初始化完成之后再进行页面加载渲染
 */
async function initSystemConfig() {
  console.log('==================初始化系统配置========================');

  const {success, data, msg} = await getSysConfigVersion();
  if(success){
    // 获取版本成功，与缓存的版本进行对比
    // 获取缓存的版本号
    // 数据结构 {version: 'xxxxxx', config: {a: 1, b: 2, c: 3}}
    const sysConfigStr = localStorage.getItem(DRAGON_SYS_CONFIG_KEY);

    if(sysConfigStr){
      const {version, config} = JSON.parse(sysConfigStr)
      // 获取缓存的数据不为空
      if (version === data && config) {
        loadSystemConfig(config);
      } else {
        console.warn('系统配置有更新...')
        const res = await getSystemConfig();
        const dragonSysConfig = {
          version: data,
          config: res
        }
        localStorage.setItem(DRAGON_SYS_CONFIG_KEY, JSON.stringify(dragonSysConfig));
        loadSystemConfig(res);
      }
    } else {
      console.warn('初次进入系统...')
      const res = await getSystemConfig();
      const dragonSysConfig = {
        version: data,
        config: res
      }

      localStorage.setItem(DRAGON_SYS_CONFIG_KEY, JSON.stringify(dragonSysConfig));
      loadSystemConfig(res);
    }

    // 如果相同则获取缓存的配置信息

    // 如果不同则从服务器获取配置信息

  } else {
    console.error(msg);
  }
}


function loadSystemConfig(config: any) {
  console.log(config);
  if(config){
    const {
      SYS_FAVICON_IMG,
      SYS_LOGIN_BG_IMG,
      SYS_BEI_AN_NO,
      SYS_WATERMARK_RULE,
      SYS_WATERMARK_SWITCH,
      SYS_BPMN_DESIGNER_AUTO_SAVE_SWITCH,
      SYS_APP_NAME,
      SYS_LOGO_IMG,
      SYS_COMPANY_SITE_LINK,
      SYS_BEI_AN_LINK,

      COM_THME_builtinType,
      COM_THME_colorDestructive,
      COM_THME_colorPrimary,
      COM_THME_colorSuccess,
      COM_THME_colorWarning,
      COM_THME_mode,
      COM_THME_radius,
      COM_THME_semiDarkHeader,
      COM_THME_semiDarkSidebar,
      COM_LOGO_enable,
      COM_LOGO_fit,
      COM_APP_authPageLayout,
      COM_APP_compact,
      COM_APP_contentCompact,
      COM_APP_contentCompactWidth,
      COM_APP_contentPadding,
      COM_APP_contentPaddingBottom,
      COM_APP_contentPaddingLeft,
      COM_APP_contentPaddingRight,
      COM_APP_contentPaddingTop,
      COM_APP_defaultAvatar,
      COM_APP_defaultHomePath,
      COM_APP_dynamicTitle,
      COM_APP_enablePreferences,
      COM_APP_layout,
    } = config;

    if(SYS_FAVICON_IMG){
      const link = window.document.querySelector("link[rel*='icon']") || window.document.createElement('link');
      link.type = 'image/x-icon';
      link.rel = 'icon';
      link.href = SYS_FAVICON_IMG;
    }

    updatePreferences({
      app: {
        name: SYS_APP_NAME,
        watermark: SYS_WATERMARK_SWITCH === '1',
        authPageLayout: COM_APP_authPageLayout,
        compact: COM_APP_compact,
        contentCompact: COM_APP_contentCompact,
        contentCompactWidth: COM_APP_contentCompactWidth,
        contentPadding: COM_APP_contentPadding,
        contentPaddingBottom: COM_APP_contentPaddingBottom,
        contentPaddingLeft: COM_APP_contentPaddingLeft,
        contentPaddingRight: COM_APP_contentPaddingRight,
        contentPaddingTop: COM_APP_contentPaddingTop,
        defaultAvatar: COM_APP_defaultAvatar,
        defaultHomePath: COM_APP_defaultHomePath,
        dynamicTitle: COM_APP_dynamicTitle,
        enablePreferences: COM_APP_enablePreferences,
        layout: COM_APP_layout,
      },
      theme: {
        builtinType: COM_THME_builtinType,
        colorDestructive: COM_THME_colorDestructive,
        colorPrimary: COM_THME_colorPrimary,
        colorSuccess: COM_THME_colorSuccess,
        colorWarning: COM_THME_colorWarning,
        mode: COM_THME_mode,
        radius: COM_THME_radius,
        semiDarkHeader: COM_THME_semiDarkHeader,
        semiDarkSidebar: COM_THME_semiDarkSidebar,
      },
      copyright: {
        companyName: SYS_APP_NAME,
        companySiteLink: SYS_COMPANY_SITE_LINK,
        date: '',
        icp: SYS_BEI_AN_NO,
        icpLink: SYS_BEI_AN_LINK,
      },
      logo: {
        source: SYS_LOGO_IMG,
        enable: COM_LOGO_enable,
        fit: COM_LOGO_fit,
      },
      breadcrumb: {},
      footer: {},
      header: {},
      navigation: {},
      shortcutKeys: {},
      sidebar: {},
      tabbar: {},
      transition: {},
      widget: {},
    });
  }
}

initSystemConfig();
