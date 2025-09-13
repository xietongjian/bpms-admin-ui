import {initPreferences, updatePreferences, preferences} from '@vben/preferences';
import { unmountGlobalLoading, diff } from '@vben/utils';

import { overridesPreferences } from './preferences';
import {getSysConfig, getSysConfigVersion} from "#/api/sys/user";

const DRAGON_SYS_CONFIG_KEY = "DRAGON_SYS_CONFIG";

/**
 * 应用初始化完成之后再进行页面加载渲染
 */
async function initSystemConfig() {
  try {
    const {success, data, msg} = await getSysConfigVersion();
    if (success) {
      // 获取版本成功，与缓存的版本进行对比
      // 获取缓存的版本号
      // 数据结构 {version: 'xxxxxx', config: {a: 1, b: 2, c: 3}}
      const sysConfigStr = localStorage.getItem(DRAGON_SYS_CONFIG_KEY);

      // 在什么情况下加载服务器的配置
      // 哪些配置需要强制更改
      // 哪些配置可以用户自定义

      // 获取缓存的数据不为空
      if (sysConfigStr) {
        const {version, config} = JSON.parse(sysConfigStr)
        // 对比服务器配置版本与缓存是否一致 - 如果一致则不做操作
        if (version === data) {
          if (!config) {
            await loadSystemConfig(data);
          }
        } else {
          await loadSystemConfig(data, config);
        }
      } else {
        await loadSystemConfig(data);
      }

      // 如果相同则获取缓存的配置信息

      // 如果不同则从服务器获取配置信息

    } else {
      console.error(msg);
    }
  } catch (e) {
    console.error('加载失败', e);
  } finally {

  }
}

/**
 * 更新缓存
 * @param version
 */
async function loadSystemConfig(version: string, config?: any){
  console.warn('系统配置有更新...')
  // 获取最新配置
  const res = await getSysConfig();
  const dragonSysConfig = {
    version,
    config: res
  }
  const diffSysConfig = diff(config, res);
  // 重置缓存
  localStorage.setItem(DRAGON_SYS_CONFIG_KEY, JSON.stringify(dragonSysConfig));
  // 更新配置
  refreshSystemConfig(diffSysConfig);
}

/**
 * 刷新系统配置
 * @param config
 */
function refreshSystemConfig(config: any) {
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
      COM_APP_dynamicTitle_SWITCH,
      COM_APP_enablePreferences,
      COM_APP_layout,
      SYS_COM_WORKBENCH_LAYOUT,
      COM_APP_sloganImage_IMG,
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
        dynamicTitle: COM_APP_dynamicTitle_SWITCH === '1',
        enablePreferences: COM_APP_enablePreferences,
        layout: COM_APP_layout,
        enableCheckUpdates: false,
        workbenchLayout: SYS_COM_WORKBENCH_LAYOUT,
        sloganImage: COM_APP_sloganImage_IMG,
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
        enable: COM_LOGO_enable === '1',
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
    console.log('更新配置成功！');
  }
}

initSystemConfig();
